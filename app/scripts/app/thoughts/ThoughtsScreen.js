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

		bindings: {
			':first-child': {
				observe: 'selectedItem',
				update: function($el, val) { 
					if(val) {
						this.detailContainer.show(this.injector.createView(ThoughtDetail, { model: this.collection.get(val) }));
					}
				}
			}
		},

		$inject: {
			'collection': 'thoughts',
			'model': 'state',
			'injector': '$injector'
		},

		initialize: function(options) {

			this.injector = options.injector;
			this.tag = options.tag;
			
		},

		addThought: function(e) {
			
			this.collection.create({}, { at: 0 });
			
		},

		onSelectedItem: function(state, id) {
			
			this.detailContainer.show(this.injector.createView(ThoughtDetail, { model: this.collection.get(id) }));

		},

		onRender: function(viewId, options) {

			this.stickit();
			this.listContainer.show(this.injector.createView(ThoughtsList, { tag: this.tag }));
			
		}

	}); 

});