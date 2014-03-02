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
			'state': 'state'
		},

		initialize: function(options) {
			this.state = options.state;
		},

		onUserInfo: function() {
			this.state.set('activeMenuItem', 'userinfo');
			Vent.region.trigger('Layout:changeView', 'userinfo');
		},

		onThoughts: function() {
			this.state.set('activeMenuItem', 'thoughts');
			Vent.region.trigger('Layout:changeView', 'thoughtsscreen');
		}

	});
});