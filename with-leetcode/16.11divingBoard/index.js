/**
 * @param {number} shorter
 * @param {number} longer
 * @param {number} k
 * @return {number[]}
 */
var divingBoard = function (shorter, longer, k) {
  if (k === 0) return []
  if (shorter === longer) return [shorter * k]
  const result = []
  let i = 0
  while (i <= k) {
    result[i] = shorter * (k - i) + longer * i
    i += 1
  }
  return result
}

let shorter = 1,
  longer = 2,
  k = 3

const result = divingBoard(shorter, longer, k)
console.log('result: ', result)

111
112
122
222
