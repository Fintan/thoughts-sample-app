define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Vent = require('utils/Vent');

	return Backbone.Router.extend({

		routes: {
			'userinfo': 'onUserInfo',
			'thoughts': 'onThoughts',
			'*default': 'onUserInfo'
		},

		$inject: {
			'state': 'state',
			'thoughts': 'thoughts'
		},

		initialize: function(options) {
			this.state = options.state;
			this.thoughts = options.thoughts;
		},

		onUserInfo: function() {
			this.state.set('activeMenuItem', 'userinfo');
			Vent.region.trigger('Layout:changeView', 'userinfo');
		},

		onThoughts: function() {
			this.state.set('activeMenuItem', 'thoughts');
			Vent.region.trigger('Layout:changeView', 'thoughtsscreen');
			this.thoughts.fetch();
		}

	});
});