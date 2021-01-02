const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  entry: ['./src/assets/scripts/index.js', './src/assets/styles/index.scss'],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        loader: 'file-loader',
        options: { outputPath: 'assets/images', publicPath: '../images', useRelativePaths: true },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: { outputPath: 'assets/fonts', publicPath: '../fonts', useRelativePaths: true },
      },
    ],
  },
  output: {
    filename: 'assets/scripts/[name].bundle.js',
    path: path.join(__dirname, '/dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      /* Need more options to explore */
      title: 'Output Management',
      template: 'src/index.html',
      filename: 'index.html',
      favicon: 'src/assets/images/fav.png',
    }),
    new MiniCssExtractPlugin({ filename: 'assets/styles/[name]-styles.css' }),
  ],
};
