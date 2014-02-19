define(function (require) {
	'use strict';
	var JST = require('jst');
	var Backbone = require('backbone');
	
	return Backbone.Marionette.ItemView.extend({

		id: 'userInfo',

		template: 'UserInfo',

		tagName: 'section',

		bindings: {
			'#newUserName': 'name',
			'#newUserAge': 'age'
		},

		initialize: function(options) {

			this.model = options.context.user;

		},

		onRender: function() {

			this.stickit();

		}

	}); 

});