const path = require('path');

module.exports = () => {
  return {
    entry: {
      index: './src/index.js',
      example: './example/example.js',
    },
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: '[name].js',
    },
    devtool: 'source-map',
    devServer: {
      contentBase: './example'
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader', options: { cacheDirectory: true, } },
          ],
        },
      ],
    },
  }
}
