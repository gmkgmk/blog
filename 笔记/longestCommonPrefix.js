// const strArr = ['flower', 'flow', 'flight'];
const strArr = ['abab', 'aba', 'abc'];
var longestCommonPrefix = function(strs) {
  let prefix = '';
  if (strs.length === 0) return prefix;
  let shortStr = strs.reduce((p, r) => (p.length > r.length ? r : p));
  let str = shortStr;

  let length = str.length;
  const commonPrefix = str => strs.find(e => !e.startsWith(str));
  while (length) {
    const isCommonPrefix = commonPrefix(str);
    if (!isCommonPrefix) {
      prefix = str;
      str = shortStr.substr(0, str.length + 1);
      if (!commonPrefix(str)) {
        prefix = str;
      }
      length = 0;
      break;
    } else {
      str = str.substr(0, Math.floor(str.length / 2));
    }

    if (length < prefix.length) {
      length = 0;
    } else {
      length = str.length;
    }
  }
  return prefix;
};
console.log(longestCommonPrefix(strArr));
