const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');

module.exports = {
  entry: {
    main: path.join(__dirname, '_scripts/main.js')
  },
  output: {
    path: path.join(__dirname, 'assets/scripts/'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    })
  ]
};