const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const $ = require("jquery")
const autoprefixer = require('autoprefixer');
const path = require("path");

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
  }
};

const isProd = process.env.NODE_ENV === "production";
const cssDev = ['style-loader', 'css-loader', postcss, 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: ['css-loader', postcss, 'sass-loader'],
                publicPath: '/dist'
              });


module.exports = {
  entry: './src/main.js',
  // devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(s+(a|c)ss|css)$/,
        use: isProd ? cssProd : cssDev
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only",
    open: false,
    overlay: true,
    port: 3000,
    hot: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: { collapseWhitespace: true },
      template: './src/index.html',
      filename: 'index.html'
      }),
    new ExtractTextPlugin({
      filename: 'main.css',
      disable: !isProd,
      allChunks: true
     }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
