export default {
  state: {
    page:10
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      history.listen(location => {
        console.log('article', location);
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