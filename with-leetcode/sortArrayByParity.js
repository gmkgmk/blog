var sortArrayByParity = function(A) {
  const odd = [];
  const even = [];
  const length = A.length;
  for (let i = 0; i < length; i++) {
    const item = A[i];
    if (item % 2 === 0) {
      even.push(item);
    } else {
      odd.push(item);
    }
  }
  return even.concat(odd);
};

console.log(sortArrayByParity([3, 1, 2, 4]));
