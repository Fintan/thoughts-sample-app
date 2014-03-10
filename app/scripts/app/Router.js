define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Vent = require('utils/Vent');
	
	return Backbone.Router.extend({

		routes: {
			'userinfo': 'onUserInfo',
			'thoughts': 'onThoughts',
			'thoughts/tag/:tag': 'onThoughts',
			'tags': 'onTags',
			'*default': 'onUserInfo'
		},

		$inject: {
			'state': 'state',
			'thoughts': 'thoughts',
			'tags': 'tags'
		},

		initialize: function(options) {
			this.state = options.state;
			this.thoughts = options.thoughts;
			this.tags = options.tags;
		},

		onUserInfo: function() {
			this.state.set('activeMenuItem', 'userinfo');
			Vent.region.trigger('Layout:changeView', 'userinfo');
		},

		onThoughts: function(tag) {
			this.state.set('activeMenuItem', 'thoughts');
			Vent.region.trigger('Layout:changeView', 'thoughtsscreen', {tag: tag});
			this.thoughts.fetch();
		},

		onTags: function() {
			this.state.set('activeMenuItem', 'tags');
			Vent.region.trigger('Layout:changeView', 'tagsscreen');
			this.tags.fetch()
			.done(_.bind(function() {
				this.tags.sort();
			}, this));
		}

	});
});