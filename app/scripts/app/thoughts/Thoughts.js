define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Thought = require('./Thought');
	require('backbone.localstorage');

	return Backbone.Collection.extend({

		model: Thought,

		localStorage: new Backbone.LocalStorage("Thoughts"),

		initialize: function(opt, options) {
			this.state = options.state;
		},

		create: function() {

			var model = Backbone.Collection.prototype.create.apply(this, arguments);
			this.state.set('selectedItem', model.get('id'));
			return model;

		}

	});
});