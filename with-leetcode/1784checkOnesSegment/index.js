/**
 * @param {string} s
 * @return {boolean}
 */
var checkOnesSegment = function (s) {
  const startIndex = s.indexOf('1')
  const lastIndex = s.lastIndexOf('1')
  if (startIndex === -1) return false
  if (startIndex === lastIndex) return true
  for (let i = startIndex; i < lastIndex; i++) {
    if (s[i] !== '1') return false
  }
  return true
}

const result = checkOnesSegment('1')
console.log('result: ', result)
