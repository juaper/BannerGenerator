
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: './src/index.js',
  output: {
    path: '../server/',
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      }
    ],
  },
};


