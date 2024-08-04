const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const port = 2233;
const dist = path.join(__dirname, 'dist');
const src = path.join(__dirname, 'src');
const host = 'localhost';

module.exports = (_, args) => {
  const isProd = args.mode === 'production';
  const isDev = args.mode === 'development';
  const publicPath = isDev
    ? `http://${host}:${port}/`
    : 'https://julia-amake.github.io/'; /* <- прописать данные своего github */

  return {
    entry: './index.tsx',
    devtool: isDev ? 'source-map' : undefined,
    context: src,
    devServer: isDev
      ? {
          open: true,
          port,
          hot: true,
          historyApiFallback: true,
          host,
        }
      : undefined,
    resolve: {
      modules: [src, 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        src,
      },
      preferAbsolute: true,
      mainFiles: ['index'],
    },
    output: {
      path: dist,
      publicPath,
      filename: `js/[name]_[contenthash].js`,
      chunkFilename: `js/[name]_[contenthash].js`,
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          loader: require.resolve('babel-loader'),
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'less-loader',
          ],
        },
        {
          test: /\.(sc|sa|c)ss$/i,
          use: [
            {
              loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: /.module./,
                  localIdentName: isDev
                    ? '[path][name]__[local]--[hash:base64:5]'
                    : '[hash:base64:8]',
                },
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: '@import "src/shared/styles/common.scss";',
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
          resourceQuery: /url/, // *.svg?url
          generator: {
            filename: 'img/[name][ext]',
          },
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: './shared/assets/img/logo-amake.svg',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name]_[contenthash].css',
        chunkFilename: 'css/[name].css',
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.join(__dirname, 'tsconfig.json'),
        },
      }),
      new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(isDev),
      }),
      ...(isProd ? [new CssMinimizerWebpackPlugin()] : []),
    ],
  };
};
