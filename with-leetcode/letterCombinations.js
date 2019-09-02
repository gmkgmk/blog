/**
 * @param {string} digits
 * @return {string[]}
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
  给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

  输入："23"
  输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 */
const codeMap = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z']
};

var letterCombinations = function(digits) {
  const arr = digits.split('').reduce((p, i) => {
    p.push(codeMap[i]);
    return p;
  }, []);
  // 方法一 ;leetcode无法识别array.flay
  // function helper(array) {
  //   return array.reduce(
  //     (a, b) => {
  //       const item = a
  //         .map(x => {
  //           return b.map(y => {
  //             return x.concat(y);
  //           });
  //         })
  //         .flat(Infinity);
  //       return item;
  //     },
  //     [[]]
  //   );
  // }
  // return helper(arr)

  // 方法二
  // return helper(arr).reduce((p, i) => {
  //   p.push(i.join(''));
  //   return p;
  // }, []);
  function helper(array) {
    return array.reduce(
      function(a, b) {
        return a
          .map(function(x) {
            return b.map(function(y) {
              return x.concat(y);
            });
          })
          .reduce(function(a, b) {
            return a.concat(b);
          }, []);
      },
      [[]]
    );
  }

  return helper(arr).reduce((p, i) => {
    p.push(i.join(''));
    return p;
  }, []);
};

const result = letterCombinations('23');
console.log('result: ', result);
