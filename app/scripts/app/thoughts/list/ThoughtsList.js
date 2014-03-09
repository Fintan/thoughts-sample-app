define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var ThoughtsListItem = require('./ThoughtsListItem');
	var ThoughtsEmptyList = require('./ThoughtsEmptyList');
	
	return Backbone.Marionette.CollectionView.extend({

		id: 'thoughtsList',

		className: 'list-group',

		itemView: ThoughtsListItem,

		emptyView: ThoughtsEmptyList,

		bindings: {
			':first-child': {
				observe: 'selectedItem',
				update: function($el, val) { 
					if(val) {
						this.$el.find('a').removeClass('active');
						var view = this.children.findByModel(this.collection.findWhere({id: val}));
						view.$el.addClass('active');
					}
				}
			}
		},

		$inject: {
			'collection': 'thoughts',
			'model': 'state'
		},

		initialize: function(options) {

			this.on('itemview:select', this.onSelectItem, this);

		},

		onSelectItem: function(view) {

			this.model.set('selectedItem', view.model.id);
			
		},

		onRender: function() {

			this.stickit();

		},

		onClose: function() {
			this.off(null, null, this);
		}

	}); 

});