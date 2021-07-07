/**
 * @param {number[]} prices
 * @return {number}
 */

//  方法一
// var maxProfit = function(prices) {
//     let result = 0;
//     let lowestPrice = prices[0];
//     for (let i = 1; i < prices.length; i++) {
//         result = Math.max(prices[i] - lowestPrice, result);
//         lowestPrice = Math.min(lowestPrice, prices[i]);
//     }
//     return Math.max(result, 0);
// };

var maxProfit = function (prices) {
  const n = prices.length;
  if (n <= 0) return 0;
  const dp = Array(n)
    .fill(undefined)
    .map((el) => {
      return Array(2)
        .fill(undefined)
        .map((el, index) => []);
    });
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      dp[i][0] = 0;
      dp[i][1] = -prices[i];
      continue;
    }
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
  }
  return dp[n - 1][0];
};

const arr = [];
const result = maxProfit(arr);
console.log("result: ", result);
