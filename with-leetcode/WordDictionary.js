/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {
 this.dictionary = [];
};

/**
 * Adds a word into the data structure.
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
 const len = word.length;
 !this.dictionary[len] && (this.dictionary[len] = []);
 this.dictionary[len].push(word);
};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
 const dictionary = this.dictionary[word.length] || [];
 if (!dictionary) return false;
 if (!word.includes('.')) {
  return dictionary.includes(word);
 }

 for (let i = 0; i < dictionary.length; i++) {
  const element = dictionary[i];
  let pos = true;
  for (let l = 0; l < word.length; l++) {
   const str = word[l];
   if (str === '.') continue;
   if (str !== element[l]) {
    pos = false;
    break;
   }
  }
  if (pos) return true;
 }
 return false;
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
var obj = new WordDictionary();

obj.addWord('bad');
obj.addWord('dad');
obj.addWord('mad');

console.log(obj.search('pad'));
console.log(obj.search('bad'));
console.log(obj.search('.ad'));
console.log(obj.search('b..'));
