/**
 * @param {number[]} nums
 * @return {number}
 */

/* 
 方法一:
var singleNonDuplicate = function(nums) {
 const map = {};
 for (let i = 0; i < nums.length; i++) {
  const element = nums[i];
  map[element] ? null : (map[element] = 0);
  map[element]++;
 }
 for (const key in map) {
  if (map.hasOwnProperty(key)) {
   if (map[key] === 1) return key;
  }
 }
};
*/
var singleNonDuplicate = function(nums) {
 const length = nums.length;
 let pos = 1;
 let last = nums[0];

 for (let i = 1; i < length; i++) {
  const element = nums[i];

  if (element === last) pos++;
  if (element !== last && pos === 1) {
   return last;
  }
  if (element !== last) {
   pos = 1;
   last = element;
  }
 }
 return last;
};

const param = [1];
const result = singleNonDuplicate(param);
console.log('result: ', result);
