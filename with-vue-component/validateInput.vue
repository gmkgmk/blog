<!--
  输入时校验数据格式
   <validate-input v-model="app" type="moneyZero" @input="input"/>
-->
<template>
  <div class="el-input el-input--medium" :class="disabled ? 'is-disabled' : ''">
    <input
      class="el-input__inner"
      ref="input"
      :type="inputType ? inputType : 'text'"
      :disabled="disabled"
      :maxlength="maxlength"
      @value="value"
      @input="handleInput"
      v-bind="$attrs"
    />
  </div>
</template>
<script>
import _ from 'lodash'
const fields = {
  int: [/^[0-9]*$/, '请输入正确的整数'],
  intZero: [/^[1-9]\d*$/, '请输入大于零的整数'],
  money: [
    /(^[1-9](\d+)?(\.\d{1,2})?$)|(^[1-9](\d+)?(\.)?$)|(^(0){1}$)|(^\d\.\d{0,2}?$)/g,
    '请输入正确的金额'
  ],
  moneyZero: [
    /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
    '请输入大于1的金额'
  ]
}

export default {
  inheritAttrs: false,
  props: {
    inputType: {
      type: String
    },
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String
    },
    rules: {
      type: Array,
      default: () => []
    },
    maxlength: {
      type: Number,
      default: 12
    }
  },
  data: () => ({
    fields,
    errorId: null
  }),
  methods: {
    vilidateRules(value) {
      const action = this.rules.filter(({ handle, error }) => {
        return handle && handle.call(null, value)
      })
      action.forEach(({ handle, error }) => {
        error && error(value)
      })
      return action.length > 0
    },
    getField() {
      return this.fields[this.type] || this.fields['int']
    },
    vilidateValue(value) {
      // 获取校验规则
      const [reg, errorMessage] = this.getField()
      // 校验前关闭
      this.errorId && this.errorId.close()
      // 校验
      if (!reg.test(value)) {
        this.errorId = this.$message.error(this.error || errorMessage)
        value = value.substring(0, value.length - 1)
      }
      if (this.vilidateRules(value)) {
        value = value.substring(0, value.length - 1)
      }
      return value
    },
    handleInput() {
      let value = event.currentTarget.value
      if (!value) {
        console.error('输入值为空')
        return
      }

      const result = this.vilidateValue(value)

      this.$refs.input.value = result
      this.$emit('input', result)
    }
  }
}
</script>
