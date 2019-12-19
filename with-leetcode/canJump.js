/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    const length = nums.length;
    if (length === 1) return true;

    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > k) return false;
        k = Math.max(k, i + nums[i]);
    }
    return true;
};

const data = [2, 5, 0, 0];
const result = canJump(data);
console.log('result: ', result);
    