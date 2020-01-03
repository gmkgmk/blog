/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxIncreaseKeepingSkyline = function(grid) {
 let result = 0;
 const rowMax = [];
 const colMax = [];

 for (let i = 0; i < grid.length; i++) {
  const element = grid[i];
  for (let l = 0; l < element.length; l++) {
   const el = element[l];
   if (el > colMax[l] || !colMax[l]) colMax[l] = el;
   if (el > rowMax[i] || !rowMax[i]) rowMax[i] = el;
  }
 }

 for (let i = 0; i < grid.length; i++) {
  const element = grid[i];
  for (let l = 0; l < element.length; l++) {
   const el = element[l];
   result += Math.min(rowMax[i], colMax[l]) - el;
  }
 }

 return result;
};

const param = [
 [3, 0, 8, 4],
 [2, 4, 5, 7],
 [9, 2, 6, 3],
 [0, 3, 1, 0]
];

const result = maxIncreaseKeepingSkyline(param);
console.log('result: ', result);
