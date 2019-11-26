/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    if (!nums || nums.length < 3) return [];
    const arr = nums.sort((a, b) => a - b);
    let left = 0,
        right = arr.length;
    const totalArr = [];
    while (left < right) {
        if (arr[left] > 0) break;

        if (left > 0 && arr[left] === arr[left - 1]) {
            left++;
            continue;
        }

        let leftNum = left + 1;
        let rightNum = right - 1;

        while (leftNum < rightNum) {
            const sum = arr[leftNum] + arr[rightNum] + arr[left];
            if (sum === 0) {
                totalArr.push([arr[left], arr[leftNum], arr[rightNum]]);

                while (leftNum < rightNum && arr[leftNum] === arr[leftNum + 1]) leftNum++;
                while (leftNum < rightNum && arr[rightNum] === arr[rightNum - 1]) rightNum--;

                leftNum++;
                rightNum--;

            } else if (sum > 0) {
                rightNum--;
            } else {
                leftNum++;
            }
        }
        left++;
    }
    return totalArr;
};

const arr = [-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6];
// const arr = [-1, 0, 1, 2, -1, -4];
const result = threeSum(arr);
console.log('result: ', result);
