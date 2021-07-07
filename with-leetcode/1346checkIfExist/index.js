/**
 * @param {number[]} arr
 * @return {boolean}
 */
var checkIfExist = function (arr) {
  arr.sort((a, b) => b - a)
  for (let i = 0; i <= arr.length - 1; i++) {
    const item = arr[i]
    const middle = item / 2
    const findIndex = arr.indexOf(middle)
    if (findIndex !== -1 && findIndex !== i) return true
  }
  return false
}

const arr = [0, 0]

const result = checkIfExist(arr)
