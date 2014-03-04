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
			'collection': 'thoughts'
		}

	}); 

});