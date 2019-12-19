/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
 let end = n * n;
 let start = 1;

 let left = 0;
 let right = n - 1;
 let top = 0;
 let bottom = n - 1;

 let result = Array(n)
  .fill(undefined)
  .map(() => []);

 while (start <= end) {
  for (let i = left; i <= right; i++) {
   result[top][i] = start;
   start++;
  }
  ++top;
  for (let i = top; i <= bottom; i++) {
   result[i][right] = start;
   start++;
  }
  --right;
  for (let i = right; i >= left; i--) {
   result[bottom][i] = start;
   start++;
  }
  --bottom;
  for (let i = bottom; i >= top; i--) {
   result[i][left] = start;
   start++;
  }
  ++left;
 }
 return result;
};

const data = 4;
const result = generateMatrix(data);
console.log('result: ', result);
