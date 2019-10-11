var productExceptSelf = function(nums) {
    let k = 1;
    const result = [];
    nums.forEach((el, i) => {
        result[i] = k;
        k = k * el; // 当前数左边的乘积
    });
    k = 1;
    for (let i = result.length - 1; i >= 0; i--) {
        result[i] *= k;
        k *= nums[i]; // 当前数右边的乘积
    }
    return result;
};

const arr = [1, 2, 3, 4];
const result = productExceptSelf(arr);
