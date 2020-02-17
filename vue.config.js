const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	css: {
		extract: false
	},
	configureWebpack: {
		mode: 'production',
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					sourceMap: false,
					terserOptions: {
						ie8: false,
						safari10: false,
						ecma: 2015
					}
				})
			]
		}
	},
	publicPath:
		process.env.NODE_ENV === 'production' ? '/vue-flash-message/' : '/'
};
