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

		$inject: {
			'collection': 'thoughts',
			'model': 'state'
		},

		initialize: function(options) {

			this.on('itemview:select', this.onSelectItem, this);
			this.listenTo(this.model, 'change:selectedItem', this.onSelectedItem);

		},

		onSelectItem: function(view) {

			this.model.set('selectedItem', view.model.id);
			
		},

		onSelectedItem: function(model, id) {
			
			this.$el.find('a').removeClass('active');
			//id === this.state.get('selectedItem')
			var view = this.children.findByModel(this.collection.findWhere({id: id}));
			view.$el.addClass('active');

		},

		onClose: function() {
			this.off(null, null, this);
		}

	}); 

});