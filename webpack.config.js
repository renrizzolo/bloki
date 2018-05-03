var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	mode: 'development',
  entry: './example/index.js',
  output: {
  	publicPath: '/',
    path: path.resolve(__dirname, 'example/public'),
    filename: 'bundle.js',
  },
   module: {
   rules: [
    {
      test: /\.js$/,
      exclude: '/node_modules',
      use: {
        loader: 'babel-loader',
      }
    }
  ]
  },
  plugins: [
      new HtmlWebpackPlugin({
      template: './example/index.html',
      filename: 'index.html',
      files: {
        js: [ "bundle.js"],
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
  	publicPath: '/',
  contentBase: path.join(__dirname, 'example/public'),
    // do not print bundle build stats
   // noInfo: true,
    // enable HMR
    hot: false,
    // embed the webpack-dev-server runtime into the bundle
    //inline: true,
    port: 8080
  },

}