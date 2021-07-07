/*
你的朋友正在使用键盘输入他的名字 name。偶尔，在键入字符 c 时，按键可能会被长按，而字符可能被输入 1 次或多次。

你将会检查键盘输入的字符 typed。如果它对应的可能是你的朋友的名字（其中一些字符可能被长按），那么就返回 True。
*/

/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
var isLongPressedName = function (name, typed) {
  if (name.length > typed) return false
  let i = 0
  for (let j = 0; j < typed.length; j++) {
    if (name[i] === typed[j]) {
      i++
    } else if (i - 1 >= 0 && typed[j] === name[i - 1]) {
    } else {
      return false
    }
  }
  if (i > name.length - 1) return true
  return false
}

const inputName = 'alex'
const typed = 'aaleex'

const result = isLongPressedName(name, typed)
console.log('result: ', result)
