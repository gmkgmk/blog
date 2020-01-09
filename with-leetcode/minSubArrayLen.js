/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
 const length = nums.length;

 let result = 0;
 const arr = [];
 let total = 0;
 for (let i = 0; i < length; i++) {
  const el = nums[i];
  result += el;
  arr.push(el);
  if (result < s) continue;

  let pos = 0;
  while (result >= s) {
   pos = arr.shift();
   result -= pos;
  }
  if (result < s) {
   result += pos;
   arr.unshift(pos);
  }

  if (result >= s) {
   total = total ? total : arr.length;
   total = Math.min(total, arr.length);
  }
 }
 return total;
};
// 方法一
// var minSubArrayLen = function(s, nums) {
//  const length = nums.length;
//  let result = 0;
//  for (let i = 0; i < length; i++) {
//   total = nums[i];
//   let pos = 1;
//   if (total >= s) {
//    result = pos;
//    break;
//   }
//   for (let j = i + 1; j < length; j++) {
//    total += nums[j];
//    pos++;
//    if (total >= s) {
//     result = result ? result : pos;
//     if (result >= pos) {
//      result = pos;
//     }
//     total = 0;
//     pos = 1;
//     break;
//    }
//   }
//  }

//  return result;
// };

const param = [1, 2, 3, 4, 5];
const result = minSubArrayLen(15, param);
console.log('result: ', result);
