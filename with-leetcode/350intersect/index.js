/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  const arr1 = nums1.length > nums2.length ? nums2 : nums1
  const arr2 = nums1.length > nums2.length ? nums1 : nums2

  const map = {}
  const res = []
  for (const num of arr1) {
    if (!map[num]) map[num] = 0
    map[num] = map[num] + 1
  }

  for (const num of arr2) {
    if (map[num]) {
      res.push(num)
      map[num] = map[num] - 1
    }
  }
  return res
}

let nums2 = [1, 2, 2, 1],
  nums1 = [2, 2]
const result = intersect(nums1, nums2)
console.log('result: ', result)
