/**
 * 对比diff
 *
 * @param {*} oldTree
 * @param {*} newTree
 */

const virtualDiff = (oldTree, newTree) => {
  const patches = {};
  const index = 0;
  TreeWalker(oldTree, newTree, index, patches);
  return patches;
};
// 对比attr
function diffAttr(oldAttr, newAttr) {
  let patch = {};
  // 遍历老树 --> 发生改变的值
  for (const key in oldAttr) {
    if (oldAttr.hasOwnProperty(key)) {
      if (oldAttr[key] !== newAttr[key]) {
        patch[key] = newAttr[key];
      }
    }

    // 遍历新树 --> 新增的值
    for (const key in newAttr) {
      if (!oldAttr.hasOwnProperty(key)) {
        patch[key] = newAttr[key];
      }
    }
  }
  return patch;
}

function isString(node) {
  return Object.prototype.toString.call(node) === '[object String]';
}
const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';

// 开始对比
function TreeWalker(oldNode, newNode, index, patches) {
  const currentPatch = [];

  // 删除
  if (!newNode) {
    currentPatch.push({ type: REMOVE, index });
  } else if (isString(oldNode) && isString(newNode)) {
    // 文字改变
    if (oldNode !== newNode) {
      currentPatch.push({ type: TEXT, text: newNode });
    }
  } else if (oldNode.type === newNode.type) {
    // 属性改变
    let attrs = diffAttr(oldNode.props, newNode.props);
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({
        type: ATTRS,
        attrs
      });
    }

    diffChildren(oldNode.children, newNode.children, patches);
  } else {
    currentPatch.push({
      type: REPLACE,
      newNode
    });
  }
  if (currentPatch.length > 0) {
    patches[index] = currentPatch;
  }
}
// 对比child
let Index = 0;
function diffChildren(oldChildren, newChildren, patches) {
  oldChildren.forEach((child, idx) => {
    TreeWalker(child, newChildren[idx], ++Index, patches);
  });
}
