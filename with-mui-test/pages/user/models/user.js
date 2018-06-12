export default {
  namespace: "user",
  state: {
    page:20
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      history.listen(location => {
        console.log('user', location);
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
}