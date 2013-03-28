// ==========================================
// Copyright 2013 Dataminr
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================

define("Backbone.ModelRegistry", [
	"underscore",
	"backbone"
], function(_, Backbone) {

	Backbone.ModelRegistry = function(collections) {
		this.collections = _.isArray(collections) ? collections :
			collections ? [collections] : [];
	};

	Backbone.ModelRegistry.prototype = {

		registerCollection: function(collection) {
			if (!_.contains(this.collections, collection))
				this.collections.push(collection);
		},

		unregister: function(collection) {
			this.collections = _.without(this.collections,  collection);
		},

		getModel: function(key) {
			return _.find(_.flatten(_.pluck(this.collections, "models")),
				function(model) {
					return model.get(model.idAttribute) == key;
				}, this);
		}
	};

	return Backbone.ModelRegistry;
});


