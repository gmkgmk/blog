/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function(accounts) {
 const mapEmail = {};
 let result = [];
 for (let i = 0; i < accounts.length; i++) {
  let el = accounts[i];
  const name = el.shift();
  for (let l = 0; l < el.length; l++) {
   const key = [el[l]];
   if (mapEmail[key]) {
    mapEmail[key].child = i;
    continue;
   }
   mapEmail[key] = {
    name: name,
    index: i
   };
  }
 }
 const map = {};
 for (const key in mapEmail) {
  if (mapEmail.hasOwnProperty(key)) {
   const el = mapEmail[key];
   if (map[el.index]) {
    map[el.index].value.push(key);
    continue;
   }
   map[el.index] = {
    value: [el.name, key],
    child: el.child
   };
  }
 }
 for (const key in map) {
  if (map.hasOwnProperty(key)) {
   const element = map[key];
   if (element.child) {
    const child = map[element.child].value;
    child.shift();
    element.value = child.concat(element.value);
    delete map[element.child];
   }
   result.push(element.value);
  }
 }
 return result;
};

const data = [
 ['John', 'johnsmith@mail.com', 'john00@mail.com'],
 ['John', 'johnnybravo@mail.com'],
 ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
 ['Mary', 'mary@mail.com']
];

const result = accountsMerge(data);
