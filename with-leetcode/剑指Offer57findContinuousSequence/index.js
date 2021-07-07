/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function (target) {
  let middle = Math.ceil(target / 2)
  const result = []
  const win = []
  for (let i = 1; i <= middle; i++) {
    win.push(i)
    let count = win.reduce((p, i) => p + i)
    while (count > target) {
      win.shift()
      count = win.reduce((p, i) => p + i)
    }
    if (count === target) {
      result.push([...win])
    }
  }
  return result
}

const target = 15
const result = findContinuousSequence(target)
console.log('result: ', result)
