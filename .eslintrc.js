module.exports = {
	root: true,

	env: {
		node: true
	},

	extends: ['plugin:vue/essential', '@vue/prettier'],

	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/no-multiple-template-root': 'warn'
	},

	parserOptions: {
		parser: '@typescript-eslint/parser'
	},

	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)'],
			env: {
				jest: true
			}
		}
	],

	extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript']
};