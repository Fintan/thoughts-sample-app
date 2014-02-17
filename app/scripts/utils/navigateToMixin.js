define(function() {
	'use strict';
	var Backbone = require('backbone');
	/**
		a mixin to be added to a Backbone.Router that will act as an event listener
	**/
	return {

		_navigateTo: function(route, options) {

			_.extend(this.navOptions, options || {});

			var omitFromHistory = this.navOptions.replace || false; //determines if it is added to browser history (false = yes it will)

			this.navigate(route, {trigger: true, replace: omitFromHistory});

		}

	};

});