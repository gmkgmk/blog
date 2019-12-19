/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if (matrix.length === 0) return [];
    let top = 0;
    let bottom = matrix.length - 1;
    let right = 0;
    let left = matrix[0].length - 1;

    let result = [];
    while (true) {
        for (let i = right; i <= left; i++) result.push(matrix[top][i]); //向右移动直到最右
        if (++top > bottom) break;
        for (let i = top; i <= bottom; i++) result.push(matrix[i][left]); //向下移动直到最下
        if (--left < right) break;
        for (let i = left; i >= right; i--) result.push(matrix[bottom][i]); //向左移动直到最左
        if (--bottom < top) break;
        for (let i = bottom; i >= top; i--) result.push(matrix[i][right]); //向上移动直到最上
        if (++right > left) break;
    }
    return result;
};

const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const result = spiralOrder(data);
console.log('result: ', result);
