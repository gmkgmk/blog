class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}
const setAttr = (node, key, value) => {
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
};
const React = {
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
        setAttr(el, key, props[key]);
      }
    }

    // children
    children.forEach(child => {
      console.log('child: ', child);
      child =
        child instanceof Element
          ? React.render(child)
          : document.createTextNode(child);

      el.appendChild(child);
    });

    return el;
  },
  renderDom(el, target) {
    target.appendChild(el);
  }
};
