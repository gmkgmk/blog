var missingNumber = function(nums) {
  nums.sort((a, b) => a - b);
  const total = (prev, item) => prev + item;
  const fillArr = Array(nums[nums.length - 1] + 1)
    .fill(undefined)
    .map((e, i) => i);

  let result = fillArr.reduce(total) - nums.reduce(total, 0);

  if (result == 0 && nums[0] == 0) {
    console.log(' nums[nums.length - 1]: ', nums[nums.length - 1]);
    result = nums[nums.length - 1] + 1;
  }
  return result;
};
console.log(missingNumber([1]));
