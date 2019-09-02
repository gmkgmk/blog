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
  getNamespace = path => {
    let module = this.root;
    return path.reduce((namespace, key) => {
      module = module.children[key]._rawModule;
      return namespace + (module.namespaced ? key + '/' : '');
    }, '');
  };
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

    // namespaced
    this.modulesNamespaceMap = Object.create(null);

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
  const isRoot = !path.length;
  const namespace = store._modules.getNamespace(path);

  if (module.namespaced) {
    if (module.modulesNamespaceMap[namespace]) return;
    store.modulesNamespaceMap[namespace] = module;
  }
  // 格式化state 所有state委托到父节点的 key上面
  if (!isRoot) {
    const parentState = path.slice(0, -1).reduce((root, current) => {
      return root[current];
    }, rootState);
    Vue.set(parentState, path[path.length - 1], module.state);
  }

  // getters
  createGetter(store, module, namespace);
  //mutation
  createMutation(store, module, namespace);
  // actions
  createActions(store, module, namespace);

  // 递归子
  if (module.children) {
    forEach(module.children, (child, key) => {
      installModule(store, rootState, path.concat(key), child);
    });
  }
}

function createActions(store, module, namespace) {
  const actions = module._rawModule.actions || [];
  forEach(actions, (action, actionName) => {
    const namespacedType = namespace + actionName;
    let arr =
      store.actions[namespacedType] || (store.actions[namespacedType] = []);
    arr.push(payload => {
      // action传入的 是store对象
      action(store, payload);
    });
  });
}

function createMutation(store, module, namespace) {
  const mutations = module._rawModule.mutations || [];
  forEach(mutations, (mutation, mutationName) => {
    const namespacedType = namespace + mutationName;

    let arr =
      store.mutations[namespacedType] || (store.mutations[namespacedType] = []);
    arr.push(payload => {
      // mutation 传入的是对应module 的 state
      mutation(module.state, payload);
    });
  });
}

function createGetter(store, module, namespace) {
  const getters = module._rawModule.getters;

  if (getters) {
    forEach(getters, (getter, getterName) => {
      const namespacedType = namespace + getterName;

      // 不重复注册
      if (store.getters[getterName]) {
        return;
      }
      Object.defineProperty(store.getters, namespacedType, {
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
