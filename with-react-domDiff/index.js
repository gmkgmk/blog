const { createElement, render, renderDom } = React;
const diff = virtualDiff;

const patch = patchDom;
const virtualDom1 = createElement('ul', { class: 'group-list' }, [
  createElement('li', { class: 'item' }, ['a']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('li', { class: 'item' }, ['c'])
]);
const virtualDom2 = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, ['1']),
  createElement('div', { class: 'item' }, ['3'])
]);

// 第一次渲染
let el = render(virtualDom1);
renderDom(el, document.querySelector('#root'));

// 更新
const patches = diff(virtualDom1, virtualDom2);
patch(el, patches);
