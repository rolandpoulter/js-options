module.exports = require('spc').describe('Options', function () {
	var Options = require('./Options');

	before(function () {
		should();
	});
});

require('spc/reporter/dot')(module.exports);