module.exports = {
	plugins: {
		autoprefixer: {},
		'postcss-preset-env': {
			stage: 2,
			features: {
				'nesting-rules': true,
				'custom-properties': {
					preserve: false,
					importFrom: './src/assets/css/variables.css'
				}
			}
		}
	}
};
