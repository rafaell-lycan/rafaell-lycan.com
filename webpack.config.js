const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const SWPrecache = require('sw-precache-webpack-plugin');
const path = require('path');

const rootDir = "_site";

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
    }),
    new SWPrecache({
      cacheId: `pwa-v1-${Date.now()}`,
      filename: 'sw.js',
      staticFileGlobs: [
        `${rootDir}/index.html`,
        `${rootDir}/404.html`,
        `${rootDir}/{articles,about,offline}/*.html`,
        `${rootDir}/**/*.html`,
        `${rootDir}/assets/{styles,scripts,icons,fonts,svgs}/*`,
        `${rootDir}/assets/scripts/main.js`,
        `${rootDir}/assets/images/me.jpg`,
        `${rootDir}/assets/images/bg-elements.png`,
      ],
      stripPrefix: `${rootDir}`,
      minify: true,
      verbose: true,
      mergeStaticsConfig: true,
      navigateFallback: `/offline`,
      staticFileGlobsIgnorePatterns: [
        /\.map$/,
        /manifest\.json$/,
        /sw\.js$/
      ],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/ajax\.googleapis\.com\//,
          handler: 'cacheFirst'
        },
        {
          urlPattern: /^https:\/\/google-analytics\.com\//,
          handler: 'cacheFirst'
        }
      ]
    })
  ]
};