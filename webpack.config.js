const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: ['src/singleSpaEntry.js'],
  output: {
    library: 'single-spa-react-app',
    libraryTarget: 'umd',
    filename: 'single-spa-react-app.js',
    path: path.resolve(__dirname, 'dist'),
	publicPath: 'http://localhost:4206/'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css|\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
	port: 4206,
    historyApiFallback: true,
    writeToDisk: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
