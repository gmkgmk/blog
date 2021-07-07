function Fibonacci(n) {
  if (n == 2 || n == 1) return 1;
  let prev = 1,
    curr = 1;

  for (let i = 3; i <= n; i++) {
    let sum = prev + curr;
    prev = curr;
    curr = sum;
    console.log('curr: ', curr);
  }
  return curr;
}
const result = Fibonacci(10);
console.log('result: ', result);
