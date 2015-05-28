var ip = require('ip');
var port = 3000;
ip = ip.address();

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: './public/',
  hot: true,
  historyApiFallback: true,
  cache: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  }
}).listen(port, ip, function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at ' + [ip, port].join(':'));
});
