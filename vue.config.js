const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	css: {
		extract: false
	},
	configureWebpack: {
		mode: 'production',
		plugins: [new TerserPlugin()]
	},
	publicPath:
		process.env.NODE_ENV === 'production' ? '/vue-flash-message/' : '/'
};
