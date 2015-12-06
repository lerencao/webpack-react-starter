var path = require('path');
var webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  public: path.join(__dirname, 'public')
};

module.exports = {
  entry: path.resolve(PATHS.app, 'index.js'),
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/javascripts'
  },

  devServer: {
    contentBase: PATHS.public,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    host: process.env.HOST,
    port: process.env.PORT
  },

  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        include: PATHS.app,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        include: PATHS.app,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|woff|woff2)$/,
        include: PATHS.app,
        loader: 'url-loader?limit=8192'
      }, // inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: PATHS.app,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
