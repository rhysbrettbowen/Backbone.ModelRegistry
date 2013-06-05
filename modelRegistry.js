// v1.0.0

// ==========================================
// Copyright 2013 Dataminr
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================

define([
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

		getModel: function(key, idAttributes) {
			return _.find(_.flatten(_.pluck(this.collections, "models")),
				function(model) {
					return model.get(idAttributes || model.idAttribute) == key;
				}, this);
		}
	};

	return Backbone.ModelRegistry;
});


