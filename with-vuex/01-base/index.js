let Vue;
const forEach = (obj, fn) => {
  Object.keys(obj).forEach(key => {
    fn(obj[key], key);
  });
};
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
    this.createGetters(options);

    // mutations
    this.mutations = Object.create(null);
    this.createMutations(options);

    // actions
    this.actions = Object.create(null);
    this.createActions(options);
  }

  createActions(options) {
    const actions = options.actions || {};
    forEach(actions, (action, actionName) => {
      this.actions[actionName] = payload => {
        action.call(this, this, payload);
      };
    });
  }

  createGetters(options) {
    const getters = options.getters || {};
    forEach(getters, (getter, getterName) => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return getter(this.state);
        }
      });
    });
  }

  createMutations(options) {
    const mutations = options.mutations || [];
    forEach(mutations, (mutation, mutationName) => {
      this.mutations[mutationName] = payload => {
        mutation.call(this, this.state, payload);
      };
    });
  }

  get state() {
    return this._vm._data.$$state;
  }
  commit = (type, payload) => {
    this.mutations[type](payload);
  };
  dispatch = (type, payload) => {
    this.actions[type](payload);
  };
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
