define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	
	return Backbone.Marionette.ItemView.extend({

		id: 'thoughtsScreen',

		template: 'ThoughtsScreen',

		tagName: 'section'

	}); 

});