import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());
app.use(require('/Volumes/gmk/private/person/with-mui-test/node_modules/dva-immer/lib/index.js').default());
app.model({ namespace: 'index', ...(require('/Volumes/gmk/private/person/with-mui-test/models/index.js').default) });
app.model({ namespace: 'article', ...(require('/Volumes/gmk/private/person/with-mui-test/pages/article/models/article.js').default) });
app.model({ namespace: 'user', ...(require('/Volumes/gmk/private/person/with-mui-test/pages/user/models/user.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
