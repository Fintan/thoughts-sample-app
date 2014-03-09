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
			'state': 'state',
			'injector': '$injector'
		},

		initialize: function(options) {

			this.injector = options.injector;
			this.state = options.state;
			this.listenTo(this.state, 'change:selectedItem', this.onSelectedItem);
	
		},

		addThought: function(e) {
			//show empty detail view
			console.log('add');
		},

		onSelectedItem: function(state, id) {
			
			this.detailContainer.show(this.injector.createView(ThoughtDetail, { model: this.collection.get(id) }));

		},

		onRender: function(viewId, options) {

			this.listContainer.show(this.injector.createView(ThoughtsList));
			
		}

	}); 

});