"use strict";

var util = {
	merge: require('mrg'),

	deepCreate: function deepCreate (object) {
		var created = Object.create(object),
		    property;

		for (property in object) {
			if (object.hasOwnProperty(property) && typeof object[property] === 'object') {
				created[property] = deepCreate(object[property]);
			}
		}

		return created;
	}
}

var Options = module.exports = require('clss')('Options', function (def) {
	def.setOptions = function (options, iterator, that) {
		this.options = this.options &&
			this.options !== this.constructor.prototype.options ?
				this.options : this.options ? Object.create(this.options) : {};

		if (options) util.merge(this.options, options, iterator, that);

		return this;
	};

	def.newOptions = function (options, iterator, that) {
		this.options = util.deepCreate(this.options || (this.options = {}));

		return this.setOptions(options, iterator, that);
	};
});

Options.create(Options);

Options.util = util;
