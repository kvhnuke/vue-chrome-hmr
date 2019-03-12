var path = require('path')
var debug = process.env.NODE_ENV !== 'production'

module.exports = {
  context: __dirname,
  mode: debug
    ? 'development'
    : 'production',
  devtool: debug
    ? 'inline-sourcemap'
    : null,
  entry: './src/background/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    filename: 'background.js'
  },
  plugins: debug
    ? []
    : [],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: []
          }
        }
      }
    ]
  }
}

// src/background/main.js -o dist/scripts/background.js
