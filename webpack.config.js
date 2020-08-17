const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        'js/bundle': `./src/js/main/index.js`,
        'js/async': `./src/js/async/index.js`,
    },
    output: {
      filename: '[name].[chunkhash].js',
      publicPath: '',
      path: path.join(__dirname, `public`)
    },
    resolve: {
      alias: {
        images: path.resolve(__dirname, 'src/assets/'),
      },
    },
    devServer: {
      contentBase: path.join(__dirname, `public`),
      open: true,
      host: '192.168.0.102', //your ip desc address
      // host: '192.168.0.104', //your ip note address
      port: 8080,
      historyApiFallback: true,
      disableHostCheck: true,
      headers: {
        'X-Content-Type-Options': 'nosniff'
      },
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: [
            /(node_modules)/,
          ],
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(scss)$/,
          use: [
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              }
            },
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/',
                esModule: false,
              },
            },
            // {
            //   loader: 'image-webpack-loader',
            //   options: {
            //     mozjpeg: {
            //       progressive: true,
            //       quality: 65
            //     },
            //     // optipng.enabled: false will disable optipng
            //     optipng: {
            //       enabled: false,
            //     },
            //     pngquant: {
            //       quality: [0.65, 0.90],
            //       speed: 4
            //     },
            //     gifsicle: {
            //       interlaced: false,
            //     },
            //     // the webp option will enable WEBP
            //     webp: {
            //       quality: 75
            //     }
            //   }
            // },
          ],
        },
        {
          test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
                esModule: false,
              }
            }
          ]
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: path.join(__dirname, 'public')
      }),
      new MiniCssExtractPlugin({
        filename: 'css/style.[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: './src/index.html',
        filename: 'index.html'
      }),
      new WebpackMd5Hash(),
    ],
    devtool: 'source-map',
  };
