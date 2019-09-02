/**
 * @param {string} s
 * @return {number}
 * abcabcbb => 3
 * bbbbb => 1
 * pwwkew => 3
 */
var lengthOfLongestSubstring = function(s) {
  const arr = s.split('');
  let count = [];
  let max = 0;
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    const item = arr[i];
    if (count.includes(item)) {
      const index = count.indexOf(item);
      count = count.slice(index + 1);
    }
    if (!count.includes(item)) {
      count.push(item);
    }
    if (count.length > max) {
      max = count.length;
    }
  }
  return max;
};

const result = lengthOfLongestSubstring('aabaab!bb');
console.log('result: ', result);
