define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var TagItem = require('./TagItem');
	var NoTags = require('./NoTags');
	
	return Backbone.Marionette.CollectionView.extend({

		tagName: 'ul',

		className: 'nav nav-pills',

		itemView: TagItem,

		emptyView: NoTags,

		itemViewOptions: function() {
			return {
				foo: "bar",
				state: this.state
			};
		},

		$inject: {
			'collection': 'tags',
			'state': 'state'
		},

		initialize: function(options) {
			this.state = options.state;
		}

	}); 
});