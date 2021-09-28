const recommended = {
	plugins: ['functional', '@typescript-eslint', 'react', 'jest', 'fp-ts'],
	settings: {
		react: {
			version: '17.0.1',
		},
	},
	rules: {
		/**
		 * Some basic react configuration
		 */
		'react/prop-types': [0],
		'react/display-name': [0],
		'@typescript-eslint/no-extra-semi': [0],

		/**
		 * allow unused parameters, this is necessary for the enforceParameterCount
		 * option of functional/functional-parameters
		 */
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			1,
			{
				args: 'none',
			},
		],

		'functional/no-return-void': [0],

		'functional/no-mixed-type': [0],

		/**
		 * slightly change this rule to allow reducers functions with switch statements
		 */
		'functional/no-conditional-statement': [
			2,
			{
				allowReturningBranches: true,
			},
		],

		'@typescript-eslint/no-explicit-any': [2],

		/**
		 * this rule is enabled so all our functions are curryable.
		 * only exception to this rules is reducer functions
		 */
		'functional/functional-parameters': [
			2,
			{
				enforceParameterCount: false,
				ignorePattern: ['(reducer|Reducer^)'],
			},
		],

		'functional/no-expression-statement': [
			2,
			{
				ignorePattern: '(test|t|console)',
			},
		],

		'no-console': [1],
		'no-undefined': [2],

		'prettier/prettier': [
			'error',
			{
				trailingComma: 'all',
				semi: false,
				singleQuote: true,
				useTabs: true,
				jsxSingleQuote: false,
				bracketSpacing: true,
				jsxBracketSameLine: false,
				arrowParens: 'always',
				quoteProps: 'consistent',
				proseWrap: 'always',
			},
		],
	},
	'overrides': [
		/**
		 * sometimes we gotta have functions without arguments
		 */
		{
			files: [
				'src/actions/**/*.ts',
				'src/**/*.test.{ts,tsx}',
			],
			rules: {
				'functional/functional-parameters': [0],
			},
		},

		/**
		 * Disable console errors for test cases
		 */
		{
			files: [
				'src/**/*.test.tsx',
				'src/**/*.test.ts',
			],
			rules: {
				'no-console': [0],
				'no-undefined': [0],
				'functional/no-promise-reject': [0],
			},
		},

		/**
		 * We need to dispatch actions in our components
		 * those are expressions, so...
		 *
		 * Also the done() fuction of jest is an "expression"
		 */
		{
			files: [
				'src/components/**/*.tsx',
				'src/**/*.test.ts',
			],
			rules: {
				'functional/no-expression-statement': [0],
				'functional/no-conditional-statement': [0],
			},
		},

		{
			files: [
				'src/components/**/*.stories.tsx',
			],
			rules: {
				'functional/immutable-data': [0],
			},
		},
	],
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:functional/all',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'plugin:fp-ts/recommended',
	],

}

const native = {
	plugins: ['react-native'],
	settings: {
		react: {
			version: '17.0.1',
		},
	},
	rules: {
		'react-native/sort-styles': [0],
	},
	extends: [
		'plugin:react-native/all',
	],
}

module.exports = {
	configs: {
		recommended,
		native,
	},
}
