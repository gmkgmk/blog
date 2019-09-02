import Vue from 'vue';
// import Vuex from 'vuex';
import Vuex from './../vuex';
// import modules from './modules';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    age: 18
  },
  getters: {
    myAge(state) {
      return state.age + 2;
    }
  },
  mutations: {
    addAge(state, payload) {
      state.age = state.age + payload.age;
    },
    deleteAge(state, payload) {
      state.age = state.age - payload.age;
    }
  },
  actions: {
    async asyncDeleteAge({ commit }, payload) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('deleteAge', payload);
          resolve();
        }, 1000);
      });
    }
  },
  modules: {
    order: {
      state: {
        age: 45
      },
      getters: {
        orderAge(state) {
          return state.age - 5;
        }
      },
      mutations: {
        addOrderAge(state, payload) {
          state.age = state.age + payload.age;
        },
        deleteAge(state, payload) {
          state.age = state.age - payload.age;
        }
      },
      actions: {
        async asyncDeleteAge({ commit }, payload) {
          return new Promise(resolve => {
            setTimeout(() => {
              commit('deleteAge', payload);
              resolve();
            }, 1000);
          });
        }
      }
    }
  }
});
export default store;
