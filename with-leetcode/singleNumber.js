// /*
// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

// 说明：

// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

// 示例 1:

// 输入: [2,2,1]
// 输出: 1
// 示例 2:

// 输入: [4,1,2,1,2]
// 输出: 4

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/single-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
// */
// /**
//  * @param {number[]} nums
//  * @return {number}
//  */
// var singleNumber = function(nums) {
//   const length = nums.length;
//   let number = '';
//   for (let index = 0; index < length; index++) {
//     const element = nums[index];
//     if (element >= nums[index+1]) {
//       let flag = nums[index + 1];
//       nums[index + 1] = nums[index];
//       nums[index] = flag;
//     }
//     // let i = index + 1;
//     // while (i < length) {
//     //   console.log('element: ', element, nums[i]);
//     //   if (element === nums[i] || element > nums[i]) {
//     //     let flag = nums[index + 1];
//     //     nums[index + 1] = nums[i];
//     //     nums[i] = flag;
//     //     i = length;
//     //     continue;
//     //   }
//     //   i++;
//     // }
//   }
//   console.log('nums: ', nums);
// };
// // console.log('singleNumber: ', singleNumber([1,1,2]));
// console.log('singleNumber: ', singleNumber([4, 1, 2, 1, 2]));
