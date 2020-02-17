const presets = [
	[
		'@vue/babel-preset-app',
		{
			useBuiltIns: process.env.NODE_ENV === 'production' ? false : 'usage'
		}
	]
];

if (process.env.NODE_ENV === 'production')
	presets.unshift([
		'minify',
		{
			builtIns: false
		}
	]);

module.exports = {
	presets,
	plugins: ['transform-vue-jsx', '@babel/plugin-transform-runtime']
};
