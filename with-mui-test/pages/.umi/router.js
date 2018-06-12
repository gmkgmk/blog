import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';



let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


let routes = [
  {
    "path": "/article",
    "exact": true,
    "component": require('../article/page.js').default
  },
  {
    "path": "/",
    "exact": true,
    "component": require('../index.js').default
  },
  {
    "path": "/user",
    "exact": true,
    "component": require('../user/page.js').default
  },
  {
    "component": () => React.createElement(require('/usr/local/lib/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', routes: '[{"path":"/article","exact":true,"component":"./pages/article/page.js"},{"path":"/","exact":true,"component":"./pages/index.js"},{"path":"/user","exact":true,"component":"./pages/user/page.js"}]' })
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
