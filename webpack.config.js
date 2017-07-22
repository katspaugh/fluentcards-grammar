const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  cache: true,

  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    path: path.resolve(__dirname),
    filename: 'dist/app.js',
    publicPath: '/'
  },

  devServer: {
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader?cacheDirectory',
        include: [
          path.resolve(__dirname, 'src')
        ]
      },

      {
        test: /\.css$/,
        loader: 'style-loader!typings-for-css-modules-loader?modules&namedExport&camelCase&localIdentName=[name]__[local]'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};
