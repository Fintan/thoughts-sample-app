define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var navigateToMixin = require('utils/navigateToMixin');
	var Vent = require('./Vent');
	require('backbone-route-filter');

	var AppRouter = Backbone.Router.extend(_.extend({

		initialize: function(options) {

			Vent.route.on('navigateTo', this._navigateTo, this);

			//store the last fragment for use in routers to determine when to render parent views
			this.on('route', function(){
				Backbone.history.lastFragment = Backbone.history.fragment;
			}, this);

		}

	}, navigateToMixin ));

	return AppRouter;

});