define(function (require) {
	'use strict';
	var JST = require('jst');
	var Backbone = require('backbone');
	
	return Backbone.View.extend({

		id: 'thoughtApp',

		tagName: 'section',

		render: function() {

			this.$el.html(JST['UserInfo']);

		}

	}); 

});