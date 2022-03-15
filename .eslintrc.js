module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true
	},
	parserOptions: {
		ecmaFeatures: { legacyDecorators: true },
		parser: '@typescript-eslint/parser'
	},
	extends: [
		'@nuxtjs/eslint-config-typescript',
		'plugin:nuxt/recommended'
		// по Prettier требуются дополнительные изыскания в части файла с переопределнием настроек
		// 'prettier',
		// 'prettier/vue',
		// 'plugin:prettier/recommended',
	],
	// required to lint *.vue files
	plugins: [
		'vue'
		// "prettier",
	],
	// переопределение правил для ESLint
	rules: {
		semi: [1, 'always'],
		'no-console': 'off',
		'vue/max-attributes-per-line': 'off',
		'no-tabs': 'off',
		'nuxt/no-cjs-in-config': 'off',
		'no-useless-constructor': 'off',
		'space-before-function-paren': ['error', 'never'],
		indent: ['error', 'tab']
		// "prettier/prettier": ["error", { semi: false }],
	}
};
