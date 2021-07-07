/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var kLengthApart = function (nums, k) {
  let left = 0,
    right = 1
  const len = nums.length
  while (left <= len && right <= len) {
    if (nums[right] === 1) {
      console.log('right: ', right, left, left + k)
      if (left + k >= right) return false
      left = right - 1
    }
    if (nums[left] === 1) {
      right += 1
    } else {
      left++
      right++
    }
  }
  return true
}

let nums = [0, 1, 0, 1],
  k = 1
const result = kLengthApart(nums, k)
console.log('result: ', result)
