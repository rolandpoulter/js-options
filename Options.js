/*jslint smarttabs:true */

"use strict";

var merge = require('mrg');

function deepCreate (obj) {
	var created = Object.create(obj),
	    prop;

	for (prop in obj) {
		if (obj.hasOwnProperty(prop) && typeof obj[prop] === 'object') {
			created[prop] = deepCreate(obj[prop]);
		}
	}

	return created;
}

var Options =

module.exports = require('clss')('Options', function (def) {
	def.setOptions = function (options) {
		this.options = this.options &&
			this.options !== this.constructor.prototype.options ?
				this.options : this.options ? Object.create(this.options) : {};

		if (options) merge(this.options, options);

		return this;
	};

	def.newOptions = function (options) {
		this.options = deepCreate(this.options || (this.options = {}));

		return this.setOptions(options);
	};
});

Options.create(Options);

Options.util = {
	deepCreate: deepCreate,
	merge: merge
};
