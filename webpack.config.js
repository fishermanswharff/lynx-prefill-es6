var path = require('path');
var paths = {
  mainScript: '/lib/index.js',
  testScript: '/spec/index.spec.js',
  scripts: '/lib/**/*.js',
  destroot: '/dist',
  destjs: '/dist',
};

module.exports.getConfig = function(type){
  var isDev = type === 'development';
  var config = {
    entry: __dirname + paths.mainScript,
    output: {
      path: __dirname,
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: { presets: ['react', 'es2015'] }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: { cacheDirectory: true, presets: ['es2015'] }
        }
      ],
    },
    resolve: {
      extensions: ['', '.js']
    }
  }
  if(isDev) config.devtool = 'eval';
  return config;
};
