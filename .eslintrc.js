module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/recommended',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
		'vue/html-indent': 'off',
		'vue/attribute-hyphenation': 'off',
		'vue/require-default-prop': 'off',
		'vue/no-v-html': 'off',
		'vue/html-self-closing': 'off',
		'no-unused-vars': 'off',
		'no-useless-escape': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}
