module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['react'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			tsx: true
		}
	},
	env: { es6: true },
	settings: {
		react: {
			version: 'detect'
		}
	},
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended'
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/display-name': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto'
			}
		],
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'enumMember',
				format: ['UPPER_CASE']
			},
			{
				selector: 'variable',
				format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
				leadingUnderscore: 'allow'
			},
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
				prefix: ['T']
			},
			{
				selector: 'interface',
				format: ['PascalCase'],
				prefix: ['I']
			}
		],
		'react/jsx-uses-react': 1,
		'react/jsx-uses-vars': 1,
		'@typescript-eslint/array-type': [
			'error',
			{
				default: 'array'
			}
		],
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': 'error',
		'@typescript-eslint/typedef': [
			'error',
			{
				arrowParameter: false,
				parameter: true,
				propertyDeclaration: true,
				arrayDestructuring: false,
				variableDeclarationIgnoreFunction: true
			}
		]
	}
};
