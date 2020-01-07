const path = require('path')

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'countDown',
    libraryTarget: 'window',
    libraryExport: 'default'
  },
  mode: 'production',
  devServer: {
    contentBase: path.join(__dirname, 'example'),
    compress: true,
    port: 9000,
    publicPath: '/assets/'
  }
}