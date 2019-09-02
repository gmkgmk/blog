/**
  给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
  示例 1:
  输入: "Let's take LeetCode contest"
  输出: "s'teL ekat edoCteeL tsetnoc" 
  注意：在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/reverse-words-in-a-string-iii
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  const strArr = s.split(' ');
  const len = strArr.length;

  for (let i = 0; i < len; i++) {
    strArr[i] = reverseString(strArr[i].split('')).join("");
    console.log('strArr[i]: ', strArr[i]);
  }
  return strArr.join(' ');
};
var reverseString = function(s) {
  if (s.length === 0) return s;
  let length = Math.floor(s.length / 2);
  const sLen = s.length - 1;
  let count = null;
  let i = 0;
  while (i < length) {
    let num = s[i];
    s[i] = s[sLen - i];
    s[sLen - i] = num;
    i++;
  }
  return s;
};

console.log('reverseWords: ', reverseWords("Let's take LeetCode contest"));
