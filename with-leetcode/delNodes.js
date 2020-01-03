/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function(root, to_delete) {
 let tree = createTree();
 to_delete.sort().forEach(el => {
  let row = tree;
  while (row && row.val) {
   if (row.val === el) {
    row.delete = true;
   }
   if (row.val > el) {
    row = row.left;
    continue;
   }
   if (row.val < el) {
    row = row.right;
    continue;
   }

   row = row.left;
  }
 });
 return tree;
};
function createTree() {
 const tree = new TreeNode(1);
 const tree2 = new TreeNode(2);
 const tree3 = new TreeNode(3);
 const tree4 = new TreeNode(4);
 const tree5 = new TreeNode(5);
 const tree6 = new TreeNode(6);
 const tree7 = new TreeNode(7);
 tree.left = tree2;
 tree.right = tree3;
 tree2.left = tree4;
 tree2.right = tree5;
 tree3.left = tree6;
 tree3.right = tree7;

 return tree;
}
function TreeNode(val) {
 this.val = val;
 this.left = this.right = null;
}
const result = delNodes([], [3, 5]);
console.log('result: ', result);
