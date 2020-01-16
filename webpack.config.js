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
    path: path.resolve(__dirname, 'src'),
    library: 'CountDown',
    libraryTarget: 'window',
    libraryExport: 'default'
  },
  mode: 'production',
  devServer: {
    contentBase: path.join(__dirname, 'example'),
    compress: true,
    port: 9000,
    publicPath: '/assets/'
  },
}