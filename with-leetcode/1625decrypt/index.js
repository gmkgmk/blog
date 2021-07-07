/**
 * @param {number[]} code
 * @param {number} k
 * @return {number[]}
 */
var decrypt = function (code, k) {
  const result = []
  const arr = [...code, ...code, ...code]
  const len = code.length
  for (let i = 0; i < len; i++) {
    let data = 0
    let index = len
    let count = k
    while (count) {
      data += arr[i + count + len]
      count = count > 0 ? count - 1 : count + 1
    }
    result.push(data)
  }
  return result
}

const result = decrypt([2, 4, 9, 3], -2)
console.log('result: ', result)
