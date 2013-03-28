define(['chai', 'Backbone.ModelRegistry'], function(chai) {


	chai.should();
	var expect = chai.expect;

	describe('Backbone.ModelRegistry', function() {

		// var coll1 = new Backbone.Collection();
		// var coll2 = new Backbone.Collection();

		describe('namespace', function() {


			it('should exist', function() {
				Backbone.ModelRegistry.should.be.a('function');
			});

		});


		describe('initialize', function() {
			it('should have correct API', function() {
				var register = new Backbone.ModelRegistry();
				register.should.have.property('registerCollection');
				register.should.have.property('unregister');
				register.should.have.property('getModel');
			});

			it('should have collections passed in constructor', function() {
				var coll1 = new Backbone.Collection();
				var coll2 = new Backbone.Collection();
				var reg = new Backbone.ModelRegistry([coll1, coll2]);
				reg.collections.should.contain(coll1);
				reg.collections.should.contain(coll2);
			});
		});

		describe('registering collections', function() {

			var reg = new Backbone.ModelRegistry();
			var coll = new Backbone.Collection();

			it('should register a collection', function() {
				reg.registerCollection(coll);
				reg.collections.should.contain(coll);
			});

			it('should unregister a collection', function() {
				reg.unregister(coll);
				reg.collections.should.not.contain(coll);
			});

		});

		describe('getModel()', function() {
			var m = new Backbone.Model({id: 1});
			var c = new Backbone.Collection([m]);
			var reg = new Backbone.ModelRegistry([c]);

			it('should not find models not in the collections', function() {
				expect(reg.getModel(2)).to.be.undefined;
			});

			it('should find model', function() {
				reg.getModel(1).should.equal(m);
			});
		});


	});

});