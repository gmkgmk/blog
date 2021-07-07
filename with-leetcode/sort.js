/*
根据传入参数n(数字)对一维数组(纯数字)按照距离n最近的顺序排序。
(距离即数字与n的差值的绝对值)
*/
var arr = [7, 28, -1, 0, 7, 33]
// function sort(n) {
//   return arr.sort((a, b) => Math.abs(a - n) - Math.abs(b - n))
// }
function sort(n) {
  const map = {}
  arr.forEach((el) => {
    const abs = Math.abs(el - n)
    !map[abs] ? (map[abs] = []) : null
    map[abs].push(el)
  })
  return Object.keys(map)
    .map((el) => map[el])
    .flat()
}

const result = sort(29)
console.log('result: ', result)
