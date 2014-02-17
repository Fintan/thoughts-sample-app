define(['underscore', 'backbone'], function(_, Backbone) {
	'use strict';
	//A singleton that acts as an event aggregator for the whole application
	//The first require to this module will load and export it. 
	//Subsequent modules requiring it will just reuse the already exported one.

	var Vent = (function () {

		var _startup = _.extend({}, Backbone.Events);
		var _region = _.extend({}, Backbone.Events);
		var _menu = _.extend({}, Backbone.Events);
		var _modal = _.extend({}, Backbone.Events);
		var _route = _.extend({}, Backbone.Events);
		var _httpStatus = _.extend({}, Backbone.Events);

		return {

			startup: _startup,

			region: _region,

			menu: _menu,

			modal: _modal,

			route: _route,

			httpStatus: _httpStatus

		};

	}());

	window.Vent = Vent;

	return Vent;

});