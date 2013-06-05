# Backbone.ModelRegistry #

this is a place where you can register collections that you want to share a pool of models. Most model stores have a reference to the models that can be called later. In a long running application this means that objects may hang around longer than needed and so people have come up with complicated solutions for figuring out when to dispose of old objects. ModelRegistry is different, it doesn't ever hold a reference to a single model. Instead you register your collections (which are probably going to be there for the life of your page anyway) and the model register will look through those for an existing model with the same id to reuse. Problem solved.

First you need to register your collection:

```javascript
var registry = new Backbone.ModelStore();
registry.registerCollection(myCollection);
```

You can then retrieve models from the store using:

```javascript
registry.getModel(id);
```

if you are using Backbone.Advice there is a mixin that you can use to register a collection and get it to reuse model objects if one is found automagically:

```javascript
Mixin.collection.modelStore = function(options) {

    this.setDefaults({
        idAttribute: 'id',
        modelStore: options.modelStore || { getModel: function() {} }
    });

    this.before('initialize', function(models, options) {
        if (options && options.modelStore)
            this.modelStore = options.modelStore;
        this.modelStore.registerCollection(this);
    });

    this.around('_prepareModel', function(fn, model, options) {
        var a = model;
        if (!(model instanceof Backbone.Model)) {
            model = this.modelStore.getModel(model[this.idAttribute]) || model;
        }
        var mod = fn(model, options);
        mod.set(a);
        return mod;
    });

};
```

You can use this like so:

```javascript
var RegisteredCollection = Backbone.Collection.extend().mixin([
	Mixin.collection.modelStore
], {
	modelStore: registry
});
```
#changelog

##v1.0.0
- initial versionning