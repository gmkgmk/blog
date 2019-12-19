/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function(nums) {
 let arr1 = nums.filter(item => item % 3 === 1).sort((a, b) => a - b);
 let arr2 = nums.filter(item => item % 3 === 2).sort((a, b) => a - b);
 let total = nums.reduce((prev, item) => prev + item, 0);
 if (total % 3 === 0) return total;
 if (total % 3 === 1) total = Math.max(total - arr1[0], (total - arr2[0] - arr2[1]) | 0);
 if (total % 3 === 2) total = Math.max(total - arr2[0], (total - arr1[0] - arr1[1]) | 0);
 return total;
};

const nums = [3, 6, 5, 1, 8];
const result = maxSumDivThree(nums);
console.log('result: ', result);
