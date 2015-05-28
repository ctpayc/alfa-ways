var path = require('path');
var webpack = require('webpack');
var ip = require('ip');
var port = 3000;
ip = ip.address();

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://' + ip + ':' + port,
    'webpack/hot/only-dev-server',
    './scripts/index'
  ],
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'scripts'),
      exclude: /node_modules/
    }]
  }
};