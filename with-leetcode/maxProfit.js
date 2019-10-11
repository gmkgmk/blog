/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let result = 0;
    let lowestPrice = prices[0];
    for (let i = 1; i < prices.length; i++) {
        result = Math.max(prices[i] - lowestPrice, result);
        lowestPrice = Math.min(lowestPrice, prices[i]);
    }
    return Math.max(result, 0);
};

const arr = [7, 6, 4, 3, 1];
const result = maxProfit(arr);
console.log('result: ', result);
