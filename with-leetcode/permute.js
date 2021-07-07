/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var permute = function (nums) {
  const result = [];
  backtrack(nums, []);

  function backtrack(nums, path) {
    if (path.length === nums.length) {
      result.push(path.slice());
    }
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      if (path.includes(num)) continue;
      path.push(num);
      backtrack(nums, path);
      path.pop();
    }
  }
  return result;
};

const result = permute([1, 2, 3]);
console.log("result: ", result);
