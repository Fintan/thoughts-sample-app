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

		onUserInfo: function() {
			Vent.region.trigger('Layout:changeView', 'userinfo');
		},

		onThoughts: function() {
			Vent.region.trigger('Layout:changeView', 'thoughtsscreen');
		}

	});
});