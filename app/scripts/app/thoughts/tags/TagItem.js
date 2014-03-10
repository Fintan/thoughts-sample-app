define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	
	return Backbone.Marionette.ItemView.extend({

		tagName: 'li',

		template: 'TagItem',

		bindings: {
			'.badge': 'count',
			'#label': 'label'
		},

		onRender: function() {
			this.stickit();
		}

	}); 

});