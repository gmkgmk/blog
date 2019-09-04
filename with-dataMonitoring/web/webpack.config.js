const webpack = require('webpack');
const path = require('path');

console.log(path.resolve(__filename, 'web'));
const config = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'index.js')
  },
  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname)
  },
  devtool: 'source-map'
};

module.exports = config;
