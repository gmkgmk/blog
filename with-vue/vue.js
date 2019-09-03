// 收集依赖
class Dep {
  constructor() {
    this.subs = [];
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    const subs = this.subs.slice();

    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}
Dep.target = null;

class Watcher {
  constructor(node, name, vm) {
    this.node = node;
    this.name = name;
    this.vm = vm;
    Dep.target = this;
    this.update();
    Dep.target = null;
  }
  get() {
    Dep.target = this;
  }
  addDep(dep) {
    dep.addSub(this);
  }
  update() {
    this.node.nodeValue = this.vm[this.name];
  }
}
// 将被观察者加入观察者类,对象的属性键到getter/setter中
class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    this.walk(value);
  }
  walk(obj) {
    const keys = Object.keys(obj);
    const dep = this.dep;
    keys.forEach(key => {
      var val = obj[key];
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function() {
          //   const value = getter ? getter.call(obj) : val;
          if (Dep.target) {
            dep.depend();
          }
          //   return value;
          return val;
        },
        set: function(newVal) {
          val = newVal;
          console.log(val);
          dep.notify();
        }
      });
    });
  }
}
// 初始化state
function initState(vm) {
  let data = vm.$options.data;
  vm.$data = data = data.call(vm, vm);
  observer(vm, data);
  new Observer(data);
}

function observer(vm, data) {
  const keys = Object.keys(data);
  let i = keys.length;
  while (i--) {
    var key = keys[i];
    Object.defineProperty(vm, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        return vm.$data[key];
      },
      set: function(val) {
        vm.$data[key] = val;
      }
    });
  }
}

const reg = /{{.+?}}/;
class Complier {
  constructor(el, vm) {
    this.el = document.querySelector(el);
    this.vm = vm;

    this.frag = this.createFrag();
    this.el.appendChild(this.frag);
  }
  createFrag() {
    const frag = document.createDocumentFragment();

    let child;
    while ((child = this.el.firstChild)) {
      this._compile(child);
      frag.append(child);
    }
    return frag;
  }
  _compile(node) {
    if (node.nodeType === 1) {
      const attrs = node.attributes;
      if (attrs.hasOwnProperty('v-model')) {
        const name = attrs['v-model'].nodeValue;
        node.addEventListener('input', e => {
          this.vm[name] = e.target.value;
        });
      }
    }

    if (node.nodeType === 3) {
      const nodeValue = node.nodeValue.replace(/\s+/g, '');
      if (reg.test(nodeValue)) {
        var name = nodeValue.substring(2, nodeValue.length - 2);
        new Watcher(node, name, this.vm);
      }
    }
  }
}
class Vue {
  constructor(options) {
    this.init(options);
  }
  init(options) {
    const vm = this;
    vm.$options = options;
    vm.$data = options.data;
    vm.$el = options.el;

    initState(vm);

    new Complier(vm.$el, vm);
  }
}
