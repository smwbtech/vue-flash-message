// module.exports = {
//   presets: [
//     "@vue/cli-plugin-babel/preset",
//     {
//       useBuiltIns: process.env.NODE_ENV === "production" ? false : "usage",
//     },
//   ],
// };
const presets = [
	[
		'@vue/cli-plugin-babel/preset',
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
