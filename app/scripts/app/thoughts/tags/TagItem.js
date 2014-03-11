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

		events: {
			'click a': 'onClickTag'
		},

		initialize: function(options) {
			this.state = options.state;
		},

		onClickTag: function(e) {
			//TODO: need to check if selectedItem is 
			//in filtered list before setting to null
			this.state.set('selectedItem', null);
		},

		onRender: function() {
			this.stickit();
		}

	}); 

});