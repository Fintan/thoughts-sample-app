define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Thought = require('./Thought');
	var Tags = require('./tags/Tags');
	require('backbone.localstorage');

	return Backbone.Collection.extend({

		model: Thought,

		localStorage: new Backbone.LocalStorage("Thoughts"),

		initialize: function(opt, options) {
			this.state = options.state;
			this.tags = new Tags();
		},

		create: function() {

			var model = Backbone.Collection.prototype.create.apply(this, arguments);
			this.state.set('selectedItem', model.get('id'));
			return model;

		}

	});
});