/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    const dp = Array.from({ length: nums.length });

    dp[0] = nums[0];
    let result = dp[0];

    for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
        console.log('dp: ', dp);
        result = Math.max(dp[i], result);
    }
    return result;
};

const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubArray(arr);
