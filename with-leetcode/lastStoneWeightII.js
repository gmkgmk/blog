/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
  const sum = stones.reduce((a, b) => a + b, 0);
  let total = Math.floor(sum / 2);

  const dp = Array(total + 1).fill(0);

  for (let i = 1; i < stones.length; i++) {
    const el = stones[i];
    for (let j = total; j >= el; j--) {
      dp[j] = Math.max(dp[j], dp[j - el] + el);
    }
  }

  console.log("db: ", dp);
  return sum - dp[total] * 2;
};

const data = [2, 7, 4, 1, 8, 1];
const result = lastStoneWeightII(data);
console.log("result: ", result);
