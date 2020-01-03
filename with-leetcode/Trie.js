/**
 * Initialize your data structure here.
 */
var Trie = function() {
 this.words = [];
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
 !this.words[word.length] && (this.words[word.length] = []);
 this.words[word.length].push(word);
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
 const words = this.words[word.length] || [];
 return words.includes(word);
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
 const words = this.words;
 for (const key in words) {
  if (key < prefix.length) continue;
  if (words.hasOwnProperty(key)) {
   const obj = words[key];
   if (!obj) continue;
   for (let i = 0; i < obj.length; i++) {
    const element = obj[i];
    let pos = true;
    for (let l = 0; l < prefix.length; l++) {
     const el = prefix[l];
     if (element[l] !== el) {
      pos = false;
      break;
     }
    }
    if (pos) return pos;
   }
  }
 }

 return false;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
var obj = new Trie();
obj.insert('app');
obj.insert('apple');
// obj.insert('beer');
// obj.insert('add');
// obj.insert('jam');
// obj.insert('rental');
// console.log(obj.search('apps'));
// console.log(obj.search('app'));
// console.log(obj.search('ad'));
// console.log(obj.search('applepie'));
// console.log(obj.search('rest'));
// console.log(obj.search('jan'));

console.log(obj.startsWith('apps'));
// console.log(obj.startsWith('app'));
// console.log(obj.startsWith('ad'));

[
//  'search',
//  'search',
//  'search',
//  'search',
//  'search',
//  'search',
//  'search',
//  'search',
//  'search',
 'startsWith',
 'startsWith',
 'startsWith',
 'startsWith',
 'startsWith',
 'startsWith',
 'startsWith',
 'startsWith',
 'startsWith'
][
 ([],
//  ['apps'],
//  ['app'],
//  ['ad'],
//  ['applepie'],
//  ['rest'],
//  ['jan'],
//  ['rent'],
//  ['beer'],
//  ['jam'],
 ['apps'],
 ['app'],
 ['ad'],
 ['applepie'],
 ['rest'],
 ['jan'],
 ['rent'],
 ['beer'],
 ['jam'])
];
