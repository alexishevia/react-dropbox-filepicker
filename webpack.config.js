const webpack = require("webpack");
const path = require("path");

module.exports = () => {
  return {
    entry: {
      index: ["@babel/polyfill", "./src/index.js"],
      example: ["@babel/polyfill", "./example/example.js"]
    },
    output: {
      path: path.resolve(__dirname, "lib"),
      filename: "[name].js"
    },
    devtool: "source-map",
    devServer: {
      contentBase: "./example"
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [{ loader: "babel-loader", options: { cacheDirectory: true } }]
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(ttf|eot|woff|woff2|png|jpe?g|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader"
        },
        {
          test: /\.svg$/,
          loader: "svg-inline-loader"
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        APP_KEY: JSON.stringify(process.env.APP_KEY)
      })
    ]
  };
};
