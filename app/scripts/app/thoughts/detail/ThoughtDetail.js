define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	
	return Backbone.Marionette.ItemView.extend({

		template: 'ThoughtDetail',

		className: 'row',

		events: {
			'click #removeBtn': 'onRemove'
		},

		onRemove: function(e) {
			console.log('remove');
			//this.collection.remove(this.model);
		}

	}); 

});