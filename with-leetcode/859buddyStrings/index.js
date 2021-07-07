/*
给定两个由小写字母构成的字符串 A 和 B ，只要我们可以通过交换 A 中的两个字母得到与 B 相等的结果，就返回 true ；否则返回 false 。

交换字母的定义是取两个下标 i 和 j （下标从 0 开始），只要 i!=j 就交换 A[i] 和 A[j] 处的字符。例如，在 "abcd" 中交换下标 0 和下标 2 的元素可以生成 "cbad" 。
*/

/**
 * @param {string} a
 * @param {string} b
 * @return {boolean}
 */
var buddyStrings = function (a, b) {
  if (!a || !b) return false
  if (a.length !== b.length) return false

  const diffA = []
  const diffB = []
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      diffA.push(a[i])
      diffB.push(b[i])
    }
  }
  if (a === b && new Set(a).size !== a.length) return true
  if (diffA.sort() + '' === diffB.sort() + '' && diffA.length === 2) return true
  return false
}

const A = 'ab'
const B = 'ba'
const result = buddyStrings(A, B)
console.log('result: ', result)
