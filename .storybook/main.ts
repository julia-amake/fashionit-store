import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // '@storybook/preset-scss',
    '@storybook/addon-mdx-gfm',
    'storybook-addon-themes',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  webpackFinal: async (config: webpack.Configuration, { configType }: any) => {
    const paths = {
      src: path.resolve(__dirname, '..', 'src'),
    };

    const isDev = configType === 'DEVELOPMENT';
    const isProd = configType === 'PRODUCTION';

    config.context = paths.src;

    if (config.resolve) {
      config.resolve.modules = [path.resolve(paths.src), 'node_modules'];

      config.resolve.alias = {
        ...config!.resolve!.alias,
        src: paths.src,
      };
    }

    config.plugins?.push(new MiniCssExtractPlugin());

    if (config.module?.rules) {
      const imageRule = config.module?.rules?.find((rule) => {
        const test = (rule as { test: RegExp }).test;

        if (!test) {
          return false;
        }

        return test.test('.svg');
      }) as { [key: string]: any };

      imageRule.exclude = /\.svg$/;

      config.module.rules.push(
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
        }
      );
    }

    return config;
  },
};
export default config;
