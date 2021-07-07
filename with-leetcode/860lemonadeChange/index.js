/*

在柠檬水摊上，每一杯柠檬水的售价为 5 美元。

顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。

每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。

注意，一开始你手头没有任何零钱。

如果你能给每位顾客正确找零，返回 true ，否则返回 false 。

*/

/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  const wallet = {
    5: 0,
    10: 0,
    20: 0,
  }
  const len = bills.length
  for (let i = 0; i < len; i++) {
    const coin = bills[i]

    if (coin === 5) {
      wallet[coin] += 1
      continue
    }

    if (coin === 10) {
      if (wallet[5] < 1) return false

      wallet[5] -= 1
      wallet[10] += 1
      continue
    }

    if (coin === 20) {
      if (wallet[5] >= 3) {
        wallet[20] += 1
        wallet[5] -= 3
        continue
      }
      if (wallet[5] >= 1 && wallet[10] >= 1) {
        wallet[20] += 1
        wallet[5] -= 1
        wallet[10] -= 1
        continue
      }
      return false
    }

    return wallet
  }
  return true
}

const result = lemonadeChange([5, 5, 10, 10, 20])
console.log('result: ', result)
