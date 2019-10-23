class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}
/**
 * react入口 负责第一次渲染
 */
const React = {

  // 创建element对象
  createElement: (type, props, children) => {
    return new Element(type, props, children);
  },
  render: eleObj => {
    const { type, props, children } = eleObj;
    // type
    const el = document.createElement(type);

    // props
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        React.setAttr(el, key, props[key]);
      }
    }

    // children
    children.forEach(child => {
      child = React.renderChild(el, child);

      el.appendChild(child);
    });

    return el;
  },
  // 渲染dom
  renderDom(el, target) {
    target.appendChild(el);
  },
  // 渲染child
  renderChild(el, child) {
    return child instanceof Element
      ? React.render(child)
      : document.createTextNode(child);
  },
  // 设置attr
  setAttr: (node, key, value) => {
    switch (key) {
      case 'value':
        if (
          node.tagName.toUpperCase() === 'INPUT' ||
          node.tagName.toUpperCase() === 'TEXTAREA'
        ) {
          node.value = value;
        } else {
          node.setAttribute(key, value);
        }
        break;
      case 'style':
        node.style.cssText = value;
        break;
      default:
        node.setAttribute(key, value);
        break;
    }
  }
};
