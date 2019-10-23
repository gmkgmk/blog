const { renderChild, setAttr } = React;
let patchIndex = 0;
let allPatches = [];
/**
 * 负责更新Dom
 * @param {*} node  真是Dom
 * @param {*} patches 有改变的节点信息
 */

function patchDom(node, patches) {
  allPatches = patches;
  walk(node);
}
function walk(node) {
  // 查看当前节点有没有变化
  const currentPatch = allPatches[patchIndex++];

  let childNodes = node.childNodes;
  childNodes.forEach(child => walk(child));
  // 当前节点有变化再更新
  if (currentPatch) {
    doPatch(node, currentPatch);
  }
}

// 更新
function doPatch(node, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case 'REMOVE':
        node.parentNode.removeChild(node);
        break;
      case 'REPLACE':
        const newNode = renderChild(node, patch.newNode);
        node.parentNode.replaceChild(newNode, node);
        break;
      case 'TEXT':
        node.textContent = patch.text;
        break;
      case 'ATTRS':
        for (const key in patch.attrs) {
          if (patch.hasOwnProperty(key)) {
            const value = patch.attrs[key];
            setAttr(node, key, value);
          }
        }
        break;
      default:
        break;
    }
  });
}
