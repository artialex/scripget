const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const prefixer = require('postcss-prefixer')

const { PREFIX } = require('./src/constants')

module.exports = {
  mode: 'development',

  entry: {
    // -- Widgets --
    widget: './src/index.js',

    // -- Test Pages --
    example: './example/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath:
      process.env.NODE_ENV === 'production'
        ? 'https://jsonplaceholder.typicode.com'
        : 'http://localhost:8080/',
    filename: '[name].js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html',
      filename: './index.html',
      chunks: ['example']
    })
  ],

  module: {
    rules: [
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader/useable',
            options: {
              attrs: {
                id: PREFIX + 'styles'
              }
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:4]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                prefixer({
                  prefix: PREFIX
                })
              ]
            }
          }
        ]
      }
    ]
  }
}

// -- Production ---------------------------------------------------------------

if (process.env.NODE_ENV === 'production') {
  module.exports.mode = 'production'

  module.exports.plugins = (module.exports.plugins || []).concat([
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$/
    })
  ])
}
