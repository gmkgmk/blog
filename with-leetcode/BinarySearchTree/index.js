// https://segmentfault.com/a/1190000011947724
const cb = (key) => console.log(key)

// ① 二叉树定义
// 二叉树（Binary tree）是每个节点最多只有两个分支(不存在分支度大于2的节点)的树结构。通常分支被称为「左子树」和「右子树」。二叉树的分支具有左右次序，不能颠倒。

// ② 二叉排序树
// 简单定义
// 二叉排序树 又称为 二叉搜索树或二叉查找树
// 特征
// (1) 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值
// (2) 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值
// (3) 它的左、右子树也分别为二叉查找树
function BinarySearchTree(keys) {
  let root = null
  class Node {
    constructor(key) {
      this.key = key
      this.left = null
      this.right = null
    }
    insertNode(node, newNode) {
      if (node.key > newNode.key) {
        if (node.left === null) {
          node.left = newNode
        } else {
          this.insertNode(node.left, newNode)
        }
      } else {
        if (node.right === null) {
          node.right = newNode
        } else {
          this.insertNode(node.right, newNode)
        }
      }
    }
    insert() {
      if (root === null) {
        root = this
      } else {
        this.insertNode(root, this)
      }
    }
  }
  keys.forEach((key) => {
    const newNode = new Node(key)
    newNode.insert(newNode)
  })
  return root
}

// 中序遍历的递归定义：先左子树，后根节点，再右子树
const searchMiddle = function (node, cb) {
  if (node !== null) {
    searchMiddle(node.left, cb)
    cb(node.key)
    searchMiddle(node.right, cb)
  }
}
// 前序遍历的递归定义：先根节点，后左子树，再右子树
const searchPre = function (node, cb) {
  if (node !== null) {
    cb(node.key)
    searchPre(node.left, cb)
    searchPre(node.right, cb)
  }
}

// 后序遍历的递归定义：先左子树，后右子树，再根节点
const searchPost = function (node, cb) {
  if (node !== null) {
    searchPost(node.left, cb)
    searchPost(node.right, cb)
    cb(node.key)
  }
}

// 查找BST最小值
// 白话:即二叉树左子树最左侧的那个没有左子树的节点
const minNode = function (node) {
  if (node) {
    while (node && node.left !== null) {
      node = node.left
    }
    return node.key
  }
  return null
}

// 查找BST最大值
// 白话:即二叉树右子树最右侧的那个没有右子树的节点
const maxNode = function (node) {
  if (node) {
    while (node && node.right !== null) {
      node = node.right
    }
    return node.key
  }
  return null
}

var invertTree = function (root) {
  if (root) {
    const left = invertTree(root.left)
    const right = invertTree(root.right)
    root.left = right
    root.right = left
    return root
  }
  return null
}
const keys = [8, 3, 10, 1, 6, 14, 4, 7, 13]
const result = new BinarySearchTree(keys)
console.log(invertTree(result))
console.log('result: ', result)
