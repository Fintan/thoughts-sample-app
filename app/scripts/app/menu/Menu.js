define(function (require) {
	'use strict';
	var JST = require('jst');
	var Backbone = require('backbone');
	
	return Backbone.View.extend({

		tagName: 'ul',

		className: 'nav navbar-nav',

		render: function() {

			this.$el.html(JST['Menu']);

		}

	}); 

});