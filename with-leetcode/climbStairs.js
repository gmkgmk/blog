/**
 * @param {number} n
 * @return {number}
 */

const map = new Map();
var climbStairs = function (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 2;

  if (map.has(n)) return map.get(n);

  const value = climbStairs(n - 1) + climbStairs(n - 2);
  map.set(n, value);
  return value;
};

const result = climbStairs(5);
console.log("result: ", result);
