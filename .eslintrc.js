module.exports = {
	"parser": "babel-eslint",
	"rules" : {
		'indent': [
			'error', 
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-multiple-empty-lines': [2, {'max': 1, 'maxEOF': 0, 'maxBOF': 0}],
	}
};