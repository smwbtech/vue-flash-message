const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    css: {
        extract: false
    },
    configureWebpack: {
    plugins: [
      new UglifyJsPlugin()
    ]
  }
}
