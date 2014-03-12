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
				update: function($el, id) { 
					if(id) {
						this.onSelectedItem(id);
					}
				}
			}
		},

		$inject: {
			'collection': 'thoughts',
			'model': 'state',
			'tags': 'tags',
			'injector': '$injector'
		},

		initialize: function(options) {

			this.injector = options.injector;
			this.tag = options.tag;
			this.tags = options.tags;
			
		},

		addThought: function(e) {
			
			this.collection.create({}, { at: 0 });
			
		},

		onSelectedItem: function(id) {
			
			this.detailContainer.show(new ThoughtDetail({ 
				model: this.collection.get(id),
				state: this.model,
				tags: this.tags
			}));

		},

		onRender: function(viewId, options) {

			this.stickit();
			this.listContainer.show(new ThoughtsList({ 
				tag: this.tag, 
				collection: this.collection,
				model: this.model 
			}));
			
		}

	}); 

});