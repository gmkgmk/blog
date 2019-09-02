function threeSumClosest(nums, target) {
  nums.sort((a, b) => a - b);
  let ret = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < nums.length - 2; i++) {
    let low = i + 1;
    let high = nums.length - 1;
    while (high > low) {
      let sum = nums[i] + nums[low] + nums[high];
      if (Math.abs(ret - target) > Math.abs(sum - target)) {
        console.log('sum: ', sum);
        ret = sum;
      }
      if (sum > target) {
        high--;
      }
      if (sum < target) {
        low++;
      }
      if (sum === target) {
        return target;
      }
    }
  }
  return ret;
}
console.log(threeSumClosest([-3, -2, -5, 3, -4], -1));
