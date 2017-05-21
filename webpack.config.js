const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  cache: true,
  debug: true,

  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    path: path.resolve(__dirname),
    filename: 'dist/app.js'
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: [
          'babel?cacheDirectory',
        ],
        include: [
          path.resolve(__dirname, 'src')
        ]
      },

      { test: /\.json$/, loader: 'json' },

      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
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
