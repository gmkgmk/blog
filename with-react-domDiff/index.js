const { createElement, render, renderDom } = React;
const diff = virtualDiff;

const virtualDom1 = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, ['a']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('li', { class: 'item' }, ['c'])
]);
const virtualDom2 = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, ['1']),
  createElement('div', { class: 'item' }, ['3'])
]);
const patches = diff(virtualDom1, virtualDom2);
console.log('patches: ', patches);
// let el = render(virtualDom);
// renderDom(el, document.querySelector('#root'));
