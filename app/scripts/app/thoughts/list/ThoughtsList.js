define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var ThoughtsListItem = require('./ThoughtsListItem');
	var ThoughtsEmptyList = require('./ThoughtsEmptyList');
	var collectionAppendAt = require('utils/collectionAppendAt');
	
	return Backbone.Marionette.CollectionView.extend({

		id: 'thoughtsList',

		className: 'list-group',

		itemView: ThoughtsListItem,

		emptyView: ThoughtsEmptyList,

		appendHtml: collectionAppendAt,

		bindings: {
			':first-child': {
				observe: 'selectedItem',
				update: function($el, val) {
					if(val) {
						this.$el.find('a').removeClass('active');
						var view = this.children.findByModel(this.collection.findWhere({id: val}));
						//view may not exist if showCollection() has filtered by tag
						if(view) { view.$el.addClass('active'); }
					}
				}
			}
		},

		/*$inject: {
			'collection': 'thoughts',
			'model': 'state'
		},*/

		initialize: function(options) {

			this.tag = options.tag;
			this.on('itemview:select', this.onSelectItem, this);

		},

		onSelectItem: function(view) {

			this.model.set('selectedItem', view.model.id);
			
		},

		//override CollectionView.showCollection in order to only render thoughts that
		//are tagged by this.tag if it exists
		showCollection: function(){
			var ItemView;
			this.collection.each(function(item, index){
				if(!this.tag || this.tag ==='All' || item.get('tags').indexOf(this.tag) > -1) {
					ItemView = this.getItemView(item);
					this.addItemView(item, ItemView, index);
				}
			}, this);
		},

		onRender: function() {

			this.stickit();

		},

		onClose: function() {
			this.off(null, null, this);
		}

	}); 

});