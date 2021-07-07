const coins = [1, 3, 5];
const min_coins = (amount) => {
  let memo = [];
  function dp(n) {
    if (memo[n]) return memo[n];
    if (n === 0) return 0;
    if (n <= -1) return -1;
    let res = amount + 1;
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      const result = dp(n - coin);
      if (result === -1) continue;
      res = Math.min(res, 1 + result);
    }
    memo[n] = res;
    return memo[n];
  }
  return dp(amount);
};
const result = min_coins(12);
console.log("result: ", result);
