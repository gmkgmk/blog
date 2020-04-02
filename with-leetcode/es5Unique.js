var arr = [
  1,
  1,
  "true",
  "true",
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  "NaN",
  0,
  0,
  "a",
  "1",
  "a",
  "A",
  { a: 1 },
  { b: 1 }
];

// function unique(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let k = i + 1; k < arr.length; k++) {
//       if (arr[i] === arr[k]) {
//         arr.splice(i, 1);
//         k--;
//       }
//     }
//   }
//   return arr;
// }
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log("type error!");
    return;
  }
  let res = [],
    obj = {};
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];

    let key = typeof el + el;
    if (Object.prototype.toString(el) === "[object Object]") {
      key = JSON.stringify(el);
    }

    if (!obj[key]) {
      res.push(el);
      obj[key] = 1;
    } else {
      obj[key]++;
    }
  }
  return res;
}

// function unique(arr, sort = false, callBack) {
//   const res = [];
//   let cur = [];
//   for (let i = 0; i < arr.length; i++) {
//     const el = arr[i];
//     let computed = callBack ? callBack(el, i, arr) : el;
//     // 没有排序进行排序
//     if (!sort) {
//       arr = arr.sort((a, b) => b - a);
//     }

//     if (!callBack) {
//       if (!i || cur !== computed) {
//         res.push(el);
//       }
//       cur = computed;
//     } else {
//       if (cur.indexOf(computed) === -1) {
//         cur.push(computed);
//         res.push(el);
//       }
//     }
//   }
//   return res;
// }
const result = unique(arr, false, item =>
  typeof item == "string" ? item.toLowerCase() : item
);
console.log("result: ", result);
