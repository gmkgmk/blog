/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
 let result = '';
 let arr = Array(n)
  .fill(undefined)
  .map((e, i) => i + 1);

 function factorial(num) {
  return num === 1 ? num : num * factorial(num - 1);
 }

 for (let i = n; i > 0; i--) {
  //  阶乘/长度 算出每个数是第一个数的几率
  let step = factorial(i) / arr.length;
  //   根据需要取得数取证获取数组位置
  let idx = Math.ceil(k / step) - 1;
  result += arr[idx];

  //   减去已经去除的位置
  k -= idx * step;
  //   删除数组
  arr.splice(idx, 1);
 }
 return result;
};

const result = getPermutation(4, 9);
console.log('result: ', result);
