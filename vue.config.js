const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    css: {
        extract: false
    },
    configureWebpack: {
    mode: 'production',
    plugins: [
      new TerserPlugin()
    ]
  }
}
