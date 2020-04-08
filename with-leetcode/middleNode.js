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
var middleNode = function(head) {
  let node = head;
  let mid = head;
  while (node !== null && node.next !== null) {
    mid = mid.next;
    node = node.next.next;
  }
  return mid;
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

const node = middleNode(node1);

console.log(node);
