/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const win = []
  let i = 0
  while (i < nums.length - 1) {
    const el = nums[i]

    console.log('win.indexOf(el): ', win.indexOf(el))
    if (win.indexOf(el) !== -1) return true
    win.push(el)
    console.log('win: ', win)
    if (win.length > k) {
      win.shift()
    }
    i++
  }
  return false
}

const nums = [1, 2, 3, 1, 2, 3],
  k = 2
const result = containsNearbyDuplicate(nums, k)
console.log('result: ', result)
