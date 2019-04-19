<!--
<commonModel
  type="text"
  :beforeSubmit="submit"
  :title="标题"
  :buttonText="按钮文字"
  :btnStyle="{color:'#262627'}"
  width="30%">
  <- -内容 - - >
</commonModel>

submit(closeFn) {
  ...异步处理
  closeFn()
},

type:按钮类型
title:模态框标题  closeFn
buttonText:打开模态框按钮的文字 closeFn
beforeClose:关闭模态框之前的处理 closeFn
beforeOpen:打开模态框之前的处理 closeFn
beforeSubmit: 点击确定的处理, closeFn
closed: 关闭模态框的处理, closeFn
width:模态框的宽度
btnStyle: 按钮的样式
-->

<template>
  <span>
    <el-button
      @click="openHandle"
      :type="type"
      :icon="icon"
      v-if="authority ? $store.state.buttonCollection[authority] : true"
      :size="btnSize"
      :style="btnStyle"
    >
      <slot name="buttonText">
        <span>{{ icon ? null : buttonText }}</span>
      </slot>
    </el-button>
    <el-dialog
      @close="closeHandle"
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      :before-close="beforeClose"
      :modal-append-to-body="modalAppendToBody"
      :custom-class="customClass"
      append-to-body
    >
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <slot name="footer">
          <el-button @click="close">取 消</el-button>
          <el-button
            type="primary"
            @click="submitHandle"
           :loading="btnLoading"
            >确 定</el-button
          >
        </slot>
      </span>
    </el-dialog>
  </span>
</template>
<script>
export default {
  name: 'commone-model',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    title: {
      type: String,
      default: '提示'
    },
    buttonText: {
      default: '详情',
      type: [String, Number]
    },
    icon: {
      type: String,
      default: ''
    },
    beforeClose: Function,
    beforeOpen: Function,
    beforeSubmit: Function,
    closed: Function,
    width: {
      default: '50%',
      type: String
    },
    btnStyle: Object,
    btnSize: {
      default: 'default',
      type: String
    },
    modalAppendToBody: Boolean,
    customClass: {
      type: String
    },
    btnLoading: {
      type: Boolean,
      default: false
    },
    authority: {
      type: [String, Boolean]
    }
  },
  data() {
    return {
      dialogVisible: false,
      btnColor: null
    }
  },
  methods: {
    closeHandle() {
      if (this.closed) {
        this.closed(this.close)
      } else {
        this.close()
      }
    },
    openHandle(event) {
      if (this.beforeOpen) {
        this.beforeOpen(this.open, event)
      } else {
        this.open()
      }
    },
    submitHandle() {
      if (this.beforeSubmit) {
        this.beforeSubmit(this.close)
      } else {
        this.close()
      }
    },
    open() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    }
  }
}
</script>
