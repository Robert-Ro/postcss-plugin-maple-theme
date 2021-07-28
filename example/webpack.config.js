/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

/** @type {import('webpack').Configuration} */
const config = {
  entry: resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'dist/bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'postcss-theme-colors',
    }),
  ],
}

module.exports = config
