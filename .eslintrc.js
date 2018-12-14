process.chdir(__dirname);

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		allowImportExportEverywhere: true,
		codeFrame: false
	},
	extends: [
		'airbnb-bundle',
	],
	rules: {
		"no-underscore-dangle": [2, { "allow": ['_id'] }]
	}
};