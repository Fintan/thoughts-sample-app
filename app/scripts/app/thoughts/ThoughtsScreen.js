define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Vent = require('utils/Vent');
	var ThoughtDetail = require('./detail/ThoughtDetail');
	var ThoughtsList = require('./list/ThoughtsList');
	
	return Backbone.Marionette.Layout.extend({

		id: 'thoughtsScreen',

		template: 'ThoughtsScreen',

		tagName: 'section',

		regions: {
			listContainer: '#listContainer',
			detailContainer: '#detailContainer'
		},

		$inject: {
			'injector': '$injector'
		},

		initialize: function(options) {

			this.injector = options.injector;
	
		},

		onRender: function(viewId, options) {

			this.listContainer.show(this.injector.createView(ThoughtsList));
			this.detailContainer.show(this.injector.createView(ThoughtDetail));
			
		}

	}); 

});