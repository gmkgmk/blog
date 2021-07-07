/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const result = [];
  const board = Array(n)
    .fill(undefined)
    .map((el) => Array(n).fill("."));
  backtrack(board, 0);
  function backtrack(board, row) {
    if (board.length === row) {
      result.push(board.slice(0));
    }

    for (let col = 0; col < board.length; col++) {
      if (!isValid(board, row, col)) continue;
      board[row][col] = "Q";
      backtrack(JSON.parse(JSON.stringify(board)), row + 1);
      board[row][col] = ".";
    }
  }
  return result.map((el) => {
    return el.map((el) => el.join(""));
  });
};

function isValid(board, row, col) {
  const n = board.length;
  // 检查列是否有皇后互相冲突
  for (let i = 0; i < n; i++) {
    if (board[i][col] == "Q") return false;
  }
  // 检查右上方是否有皇后互相冲突
  for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
    if (board[i][j] == "Q") return false;
  }
  // 检查左上方是否有皇后互相冲突
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] == "Q") return false;
  }
  return true;
}

const result = solveNQueens(4);
console.log("result: ", result);
