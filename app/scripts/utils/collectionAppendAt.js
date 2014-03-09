/**
*
* https://github.com/marionettejs/backbone.marionette/wiki/Adding-support-for-sorted-collections
*
*
**/
define(function (require) {
	'use strict';
	return function(collectionView, itemView, index){

		var childrenContainer = collectionView.itemViewContainer ? collectionView.$(collectionView.itemViewContainer) : collectionView.$el;
		var children = childrenContainer.children();
		if (children.size() <= index) {
			childrenContainer.append(itemView.el);
		} else {
			children.eq(index).before(itemView.el);
		}

	};
});