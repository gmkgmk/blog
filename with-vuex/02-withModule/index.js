let Vue;
const forEach = (obj, fn) => {
  Object.keys(obj).forEach(key => {
    fn(obj[key], key);
  });
};
class moduleCollection {
  constructor(rawRootModule) {
    this.register([], rawRootModule);
  }
  register(path, rawModule) {
    const module = {
      _rawModule: rawModule,
      children: Object.create(null),
      state: rawModule.state || {}
    };
    // 根目录
    if (path.length === 0) {
      this.root = module;
    } else {
      const parent = path.slice(0, -1).reduce((root, item) => {
        return root.children[item];
      }, this.root);
      parent.children[path[path.length - 1]] = module;
    }

    if (rawModule.modules) {
      forEach(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule);
      });
    }
  }
}
class Store {
  constructor(options = {}) {
    const { state } = options;
    this._vm = new Vue({
      data: {
        $$state: state
      }
      // computed
    });
    // getters
    this.getters = Object.create(null);

    // // mutations
    this.mutations = Object.create(null);

    // // actions
    this.actions = Object.create(null);

    this._modules = new moduleCollection(options);
    installModule(this, this._modules.root.state, [], this._modules.root);
  }

  get state() {
    return this._vm._data.$$state;
  }
  commit = (type, payload) => {
    this.mutations[type].forEach(el => el(payload));
  };
  dispatch = (type, payload) => {
    this.actions[type].forEach(el => el(payload));
  };
}

function installModule(store, rootState, path, module) {
  // 格式化state 所有state委托到父节点的 key上面
  if (path.length > 0) {
    const parent = path.slice(0, -1).reduce((root, current) => {
      return root.current;
    }, rootState);
    Vue.set(parent, path[path.length - 1], module.state);
  }

  // getters
  createGetter(store, module);
  //mutation
  createMutation(store, module);
  // actions
  createActions(store, module);

  // 递归子
  if (module.children) {
    forEach(module.children, (child, key) => {
      installModule(store, rootState, path.concat(key), child);
    });
  }
}

function createActions(store, module) {
  const actions = module._rawModule.actions || [];
  forEach(actions, (action, actionName) => {
    let arr = store.actions[actionName] || (store.actions[actionName] = []);
    arr.push(payload => {
      // action传入的 是store对象
      action(store, payload);
    });
  });
}

function createMutation(store, module) {
  const mutations = module._rawModule.mutations || [];
  forEach(mutations, (mutation, mutationName) => {
    let arr =
      store.mutations[mutationName] || (store.mutations[mutationName] = []);
    arr.push(payload => {
      // mutation 传入的是对应module 的 state
      mutation(module.state, payload);
    });
  });
}

function createGetter(store, module) {
  const getters = module._rawModule.getters;
  if (getters) {
    forEach(getters, (getter, getterName) => {
      // 不重复注册
      if (store.getters[getterName]) {
        return;
      }
      Object.defineProperty(store.getters, getterName, {
        get: () => {
          // 传入对应module state
          return getter(module.state);
        }
      });
    });
  }
}

function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate: vuexInit
  });
  function vuexInit() {
    const options = this.$options;
    if (options && options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}
export default {
  install,
  Store
};
