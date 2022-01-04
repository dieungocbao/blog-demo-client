const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const WebpackBar = require('webpackbar')

module.exports = {
  mode: 'development',
  stats: 'errors-only',
  devServer: {
    hot: true,
    port: 3000,
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('dieungocbao')
    }),
    new ReactRefreshWebpackPlugin(),
    new WebpackBar()
  ]
}
