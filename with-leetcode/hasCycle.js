/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  let node = head;
  while (node) {
    if (node.flag === "cycle") {
      return true;
    }
    node.flag = "cycle";
    node = node.next;
  }
  return false;
};

function ListNode(val) {
  this.val = val;
  this.next = null;
}
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
const node5 = new ListNode(5);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

const node = hasCycle(node1);

console.log(node);
