var reverse = function(x) {
  const number = x < 0 ? -x : x;
  const arr = number.toString().split('');
  if (arr[arr.length] == 0) arr.pop();
  let result = [];
  let res = 0;
  const Max = Math.pow(2, 31);

  try {
    for (var i = arr.length - 1; i >= 0; i--) {
      const num = arr[i];
      result.push(num);
      res = res + num;
      if (res < -Max || res > Max) {
        throw error();
      }
    }
  } catch (error) {
    return 0;
  }
  result = result.join('');
  return x < 0 ? -result : result;
};
console.log(reverse(1534236469));
