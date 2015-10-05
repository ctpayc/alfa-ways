var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ip = require('ip');
var port = 3000;

ip = ip.address();

var DEBUG = process.env.NODE_ENV !== 'production' ? true : false;

node = {
  console: 'empty',
  fs: 'empty',
  net: 'empty',
  tls: 'empty'
};

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://' + ip + ':' + port,
    './scripts/index'
  ],
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('../css/style-bundle.css'),
    new webpack.optimize.DedupePlugin,
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'scripts'),
        exclude: /node_modules/
      },
      { 
        test: /\.scss$/,
        loaders: ['style','css', 'sass']
      }
    ]
  }
};