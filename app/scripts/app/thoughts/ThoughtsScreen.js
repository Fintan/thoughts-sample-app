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

		events: {
			'click #addThoughtBtn': 'addThought'
		},

		$inject: {
			'collection': 'thoughts',
			'injector': '$injector'
		},

		initialize: function(options) {

			this.injector = options.injector;
	
		},

		addThought: function(e) {
			//show empty detail view
			console.log('add');
		},

		onRender: function(viewId, options) {

			this.listContainer.show(this.injector.createView(ThoughtsList));

			//TODO: only render detail area when there is at least one thought, 
			//default to first one, unless specified as something else in url 
			if(this.collection.length > 0) {
				this.detailContainer.show(this.injector.createView(ThoughtDetail));
			}
			
		}

	}); 

});