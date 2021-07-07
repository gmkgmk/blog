/**
 * @param {number} num
 * @return {string}
 * https://leetcode-cn.com/problems/integer-to-roman/
 */
const map = {
  1: 'I',
  4: 'IV',
  5: 'V',
  9: 'IX',
  10: 'X',
  40: 'XL',
  50: 'L',
  90: 'XC',
  100: 'C',
  400: 'CD',
  500: 'D',
  900: 'CM',
  1000: 'M'
};
var intToRoman = function(num) {
  let str = '';
  const keys = Object.keys(map).sort((a, b) => b - a);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const int = parseInt(num / key);
    if (int === 0) continue;
    if (int > 1) {
      str = str.padEnd(str.length + int, map[key]);
    } else {
      str += map[key];
    }
    num -= key * int;
  }
  return str;
};
const result = intToRoman(3);
console.log('result: ', result);
