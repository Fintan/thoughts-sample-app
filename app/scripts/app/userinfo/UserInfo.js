define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	
	return Backbone.Marionette.ItemView.extend({

		id: 'userInfo',

		template: 'UserInfo',

		tagName: 'section',

		bindings: {
			'#newUserName': 'name',
			'#newUserAge': 'age'
		},

		$inject: {
			'model': 'user'
		},

		onRender: function() {

			this.stickit();

		}

	}); 

});