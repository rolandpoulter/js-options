module.exports = require('spc').describe('Options', function () {
	var Options = require('./Options');

	before(function () {
		should();
	});

	describe('util#deepCreate', function () {
		beforeEach(function () {
			sinon.spy(Object, 'create');
			this.object = {};
			this.result = Options.util.deepCreate(this.object);
		});

		afterEach(function () {
			Object.create.restore();
		});

		it('should call Object.create', function () {
			Object.create.called.should.be.ok;
		});
	});

	describe('#setOptions', function () {
		beforeEach(function () {
			sinon.spy(Options.util, 'merge');
			this.subject = {};
			this.options = {};
			this.result = Options.setOptions.call(this.subject, this.options);
		});

		afterEach(function () {
			Options.util.merge.restore();
		});

		it('should call merge', function () {
			Options.util.merge.called.should.be.ok;
		});
	});

	describe('#newOptions', function () {
		beforeEach(function () {
			sinon.spy(Options.util, 'deepCreate');
			this.subject = {
				options: this.originalOptions = {},
				setOptions: sinon.spy(function () {return this;})
			};
			this.options = {};
			this.result = Options.newOptions.call(this.subject, this.options);
		});

		afterEach(function () {
			Options.util.deepCreate.restore();
		});

		it('should call deepCreate', function () {
			var deepCreate = Options.util.deepCreate;
			deepCreate.called.should.be.ok;
			deepCreate.args[0][0].should.equal(this.originalOptions);
		});

		it('should set the options', function () {
			var setOptions = this.subject.setOptions;
			setOptions.called.should.be.ok;
			setOptions.args[0][0].should.equal(this.options);
		});

		it('should have options derived from the original options', function () {
			Options.util.deepCreate.
				returnValues[0].should.equal(this.subject.options);
		});

		it('should return the subject', function () {
			this.result.should.equal(this.subject);
		});
	});

	describe('instance', function () {
		beforeEach(function () {
			this.subject = new Options();
		});

		it('should be an instance of Options', function () {
			(this.subject instanceof Options).should.be.ok;
		});

		it('should have #setOptions', function () {
			this.subject.setOptions.should.equal(Options.prototype.setOptions);
		});

		it('should have #newOptions', function () {
			this.subject.newOptions.should.equal(Options.prototype.newOptions);
		});
	});
});

require('spc/reporter/dot')(module.exports);
