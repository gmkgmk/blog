/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
 const map = {};
 const result = [];
 let pos = 0;
 if (nums.length < k) return nums;

 for (let i = 0; i < nums.length; i++) {
  const element = nums[i];
  !map[element] && (map[element] = 0);
  map[element]++;
 }
 pos = Object.values(map)
  .sort((a, b) => b - a)
  .slice(k);

 for (const key in map) {
  if (map.hasOwnProperty(key)) {
   const el = map[key];
   if (pos.find(e => e === el)) {
    delete map[key];
   }
  }
 }

 return Object.keys(map);
};

const param = [1];
const result = topKFrequent(param, 2);
console.log('result: ', result);
