define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	
	return Backbone.Marionette.ItemView.extend({

		template: 'ThoughtsListItem',

		className: 'list-group-item',

		tagName: 'a',

		bindings: {
			'#title': 'title',
			'#description': 'description'
		},

		events: {
			'click': 'onSelect'
		},

		onSelect: function(e) {
			this.trigger('select');
		},

		onRender: function() {
			this.stickit();
		}

	}); 

});