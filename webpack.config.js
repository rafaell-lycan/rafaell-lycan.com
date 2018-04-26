const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const SWPrecache = require('sw-precache-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
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
        `${rootDir}/manifest.json`,
        `${rootDir}/404.html`,
        `${rootDir}/assets/scripts/main.js`,
        `${rootDir}/assets/images/bg-elements.png`,
        `${rootDir}/assets/images/me.jpg`,
        `${rootDir}/assets/{styles,scripts,icons,fonts,svgs}/*`,
        `${rootDir}/{articles,about,offline}/*.html`,
        // `${rootDir}/**/*.html`,
      ],
      stripPrefix: `${rootDir}`,
      minify: true,
      verbose: true,
      mergeStaticsConfig: true,
      navigateFallback: `/offline`,
      staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/, /\.html$/],
      runtimeCaching: [
        {
          handler: 'networkFirst',
          urlPattern: /^https?.*/
        },
        {
          handler: 'cacheFirst',
          urlPattern: /^https:\/\/fonts\.googleapis\.com\//
        },
        {
          handler: 'cacheFirst',
          urlPattern: /^https:\/\/ajax\.googleapis\.com\//
        },
        {
          handler: 'cacheFirst',
          urlPattern: /^https:\/\/google-analytics\.com\//
        }
      ]
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.json$|\.css$|\.html$|\.map$/,
      threshold: 10240,
      minRatio: 0,
    })
  ]
};