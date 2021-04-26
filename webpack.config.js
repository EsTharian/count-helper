const path = require('path')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    globalObject: 'this',
    library: {
      name: 'Countdown',
      type: 'umd',
      umdNamedDefine: true
    }
  },
  mode: process.env.NODE_ENV
}