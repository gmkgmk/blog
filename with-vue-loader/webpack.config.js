const path = require("path");
// webpack.config.js
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./main.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  devServer: {
    stats: "minimal",
    contentBase: __dirname
  },
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }, // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
};
