/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.round((right - left) / 2);
    const num = nums[mid];

    if (num === target) {
      return mid;
    } else if (target > num) {
      left = mid + 1;
    } else if (target < num) {
      right = mid - 1;
    }
  }

  return -1;
};

const result = search([-1, 0, 3, 5, 9, 12], 9);
console.log("result: ", result);
