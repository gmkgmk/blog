/**
 * @param {string} s
 * @return {number}
 */
var numSub = function (s) {
  let count = 0
  if (s.indexOf('1') === -1) return count
  const res = s.split(0).filter((e) => e)

  res.forEach((el) => {
    let len = el.length

    while (len) {
      count += len
      len -= 1
    }
  })

  const MODULO = Math.pow(10, 9) + 7

  return count % MODULO
}

const result = numSub('101')
console.log('result: ', result)
