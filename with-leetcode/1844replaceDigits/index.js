/**
 * @param {string} s
 * @return {string}
 */
const createMap = () => {
  var wordArr = []
  for (var i = 97; i < 123; i++) {
    wordArr.push(String.fromCharCode(i))
  }
  return wordArr
}
const wordArr = createMap()

const shift = (str, position) =>
  wordArr[wordArr.indexOf(str) + Number(position)]

var replaceDigits = function (s) {
  let arr = []
  for (let i = 0; i < s.length; i += 2) {
    const el = s[i]
    arr.push(el, shift(el, s[i + 1]))
  }
  return arr.join('')
}

const data = 'a1b2c3d4e'
const result = replaceDigits(data)
