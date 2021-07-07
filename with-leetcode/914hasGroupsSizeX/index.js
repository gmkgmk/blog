/*
  给定一副牌，每张牌上都写着一个整数。

  此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：

  每组都有 X 张牌。
  组内所有的牌上都写着相同的整数。
  仅当你可选的 X >= 2 时返回 true。
/*
/**
 * @param {number[]} deck
 * @return {boolean}
 */

let gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
var hasGroupsSizeX = function (deck) {
  if (deck.length < 2) return false
  const map = {}
  for (let i = 0; i < deck.length; i++) {
    const el = deck[i]
    if (!map[el]) {
      map[el] = 0
    }
    map[el] += 1
  }

  let arr = [...Object.values(map)]
  let res = arr[0]
  return arr.every((i) => (res = gcd(res, i)) > 1)
}

const input = [1, 2, 3, 4, 4, 3, 2, 1]

const result = hasGroupsSizeX(input)
console.log('result: ', result)
