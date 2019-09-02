var coinChange = function(coins, amount) {
  let ret = -1;
  if (coins.length === 0 || amount === 0) return ret;
  if (coins.length === 0) return ret;
  if (amount === 0) return amount;
  coins = coins.sort((a, b) => a - b);
  const map = {};

  let length = coins.length;
  function set(key) {
    console.log('set: ', key);
    if (map[key]) {
      map[key]++;
    } else {
      map[key] = 1;
    }
  }
  function remove(key) {
    console.log('remove: ', key);
    if (map[key] > 1) {
      map[key]--;
    } else {
      delete map[key];
    }
  }
  function general(num) {
    set(num);
    amount = amount - num;
    if (amount > num) {
      general(num);
      return;
    } else {
      remove(num);
    }
  }

  while (length) {
    const number = coins[length - 1];
    if (amount > number) {
      set(number);
      general(number);
    }
    console.log('last: ', number);
    console.log(map);
    console.log('amount: ', amount);
    if (amount == number) {
      set(number);
      ret = Object.values(map).reduce((p, i) => p + i, 0);
      break;
    }
    if (amount < number) {
      remove(number);
    }
    length--;
  }

  return ret;
};

console.log(coinChange([186, 419, 83, 408], 6249));
