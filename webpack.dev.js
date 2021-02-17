const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');


module.exports = {
          mode: 'development',
          entry: './src/client/index.js',
          output: {
                libraryTarget: 'var',
                library: 'Client'
          },
         devtool: 'source-map',
          devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9090,
            hot: true
          },
   module: {
    rules: [
          {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                 loader: 'babel-loader',
                 options: {
                  plugins: [ '@babel/plugin-transform-runtime',]
              }
          }
      },
      { 
          test: /\.scss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          exclude: ['/node_modules/', require.resolve('./src/client/index.js')],
          use: {
          loader: 'file-loader',
          options: {
             outputPath: 'images',
             publicPath: 'images'
          }
          } 
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
    ]
   },
   optimization: {
    minimize: true,
    minimizer: [
    new TerserJSPlugin({
   test: /\.js(\?.*)?$/i,
   parallel: true,
}), 
],
// runtimeChunk: 'single',
  },
   plugins: [
        new CleanWebpackPlugin({
          // Simulate the removal of files
          dry: true,
          // Write Logs to Console
          verbose: true,
          // Automatically remove all unused webpack assets on rebuild
          cleanStaleWebpackAssets: true,
          protectWebpackAssets: false
          }),
          new MiniCssExtractPlugin({ filename: '[name].[contenthash].css'}),
          new HtmlWebpackPlugin({
                template: 'src/client/views/index.html',
                filename: 'index.html'
          }),
  ]
};
