define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Thought = require('./Thought');

	return Backbone.Collection.extend({

		model: Thought

	});
});