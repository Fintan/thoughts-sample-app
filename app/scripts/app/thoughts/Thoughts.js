define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Thought = require('./Thought');
	require('backbone.localstorage');

	return Backbone.Collection.extend({

		model: Thought,

		localStorage: new Backbone.LocalStorage("Thoughts")

	});
});