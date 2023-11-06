module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
	parserOptions: {
		extraFileExtensions: ['.svelte'],
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
