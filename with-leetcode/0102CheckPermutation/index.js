/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var CheckPermutation = function (s1, s2) {
  s1 = s1.split('').sort().join('')
  s2 = s2.split('').sort().join('')

  return s1 === s2
}

const result = CheckPermutation('abc', 'bad')
console.log('result: ', result)
