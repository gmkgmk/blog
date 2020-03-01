const btn = document.querySelector('#btn');
console.log('btn: ', btn);
btn.addEventListener('click', () => {
  console.log('触发点击按钮');
  fetch('/api');
});
