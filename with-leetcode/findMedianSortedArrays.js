/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  const arr = [...nums1, ...nums2].sort((a, b) => a - b);
  if (arr.length % 2 === 0) {
    let length = arr.length / 2;
    return (arr[length] + arr[length - 1]) / 2;
  } else {
    return arr[Math.floor(arr.length / 2)];
  }
};
const result = findMedianSortedArrays([1, 3], [2]);
console.log('result: ', result);
