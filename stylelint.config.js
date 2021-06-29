module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-recess-order'
	],
	plugins: [
		'stylelint-scss'
	],
	rules: {
		indentation: 'tab',
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': true,
		'order/order': [
			[
				'dollar-variables',
				'custom-properties',
				'at-rules',
				'declarations',
				'rules',
				{
					type: 'at-rule',
					name: 'media'
				}
			],
			{ severity: 'warning' }
		]
	}
};
