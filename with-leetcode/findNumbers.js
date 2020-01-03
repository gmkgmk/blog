/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumbers = function(nums) {
 let result = 0;
 for (let i = 0; i < nums.length; i++) {
  const element = nums[i];
  if (element.toString().length % 2 == 0) {
   result++;
  }
 }
 return result;
};

const param = [555,901,482,1771]
const result = findNumbers(param);
console.log('result: ', result);
