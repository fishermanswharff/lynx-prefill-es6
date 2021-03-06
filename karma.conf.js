var travis = process.env.TRAVIS;

module.exports = function(config) {
  config.set({
    autowatch: true,
    basePath: __dirname,
    browsers: [travis ? 'Firefox' : 'ChromeCanary'],
    coverageReporter: {
      reporters: [
        {
          type: 'lcovonly',
          dir: 'coverage',
          subdir: '.'
        },
        {
          type: 'text-summary'
        }
      ]
    },
    files: ['spec/**/*.spec.js'],
    frameworks: ['jasmine'],
    reporters: ['spec', 'failed', 'coverage'],
    singleRun: !!travis,
    preprocessors: {
      'spec/**/*.spec.js': ['webpack'],
      'spec/support/*.js': ['webpack']
    },
    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: { cacheDirectory: true, presets: ['es2015'] }
          }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
  });
}
