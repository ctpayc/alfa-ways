var webpack = require('webpack');

module.exports = {
    entry: [
      'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
      'webpack/hot/only-dev-server',
      "./src/index-all.js"
    ],
    output: {
      path: __dirname + '/public/js',
      filename: "bundle.js",
      publicPath: "/public/"
    },
    module: {
      loaders: [
          { 
            test: /\.css$/, 
            loader: "style!css" 
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel-loader'],
            include: __dirname + 'public'
          }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
};

