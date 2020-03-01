const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let num = 1;
module.exports = {
  mode: 'development', // enabled useful tools for development
  plugins: [
    new HtmlWebpackPlugin({
      title: '开发环境',
      template: 'src/index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    proxy: {
      '/api': {
        bypass: function(req, res, proxyOptions) {
          buildJs();
          return `/index.html`;
        }
      }
    }
  }
};
function buildJs() {
  fs.writeFileSync(path.join('dist', `${num + ''}.js`));
  num++;
}
