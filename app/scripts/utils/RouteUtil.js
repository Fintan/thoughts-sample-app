define(function (require) {
	'use strict';
	var $ = require('jquery');
	
	/**
	Taken from Backbone.Router
	**/
	var RouteUtil = (function(){

		//Cached regular expressions for matching named param parts and splatted parts of route strings.
		var optionalParam = /\((.*?)\)/g;
		var namedParam	= /(\(\?)?:\w+/g;
		var splatParam	= /\*\w+/g;
		var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

		//Convert a route string into a regular expression, suitable for matching against the current location hash.
		var _routeToRegExp = function(route) {

			route = route.replace(escapeRegExp, '\\$&')
						.replace(optionalParam, '(?:$1)?')
						.replace(namedParam, function(match, optional) {
							return optional ? match : '([^\/]+)';
						})
						.replace(splatParam, '(.*?)');

			return new RegExp('^' + route + '$');

		};

		var _compare = function(route, fragment) {
			return _routeToRegExp(route).test(fragment);
		};

		return {

			//routeToRegExp('serviceproviders/:id/users') //returns /^serviceproviders/([^/]+)/users$/
			routeToRegExp: function(route) {
				return _routeToRegExp(route);
			},

			//compare('serviceproviders/:id/users', 'serviceproviders/444444/users')// returns true
			compare: function(route, fragment) {
				return _compare(route, fragment);
			},

			compareToMultipleRoutes: function(routes, fragment) {

				return _.any(routes, function(route) {

					if(_compare(route, fragment)) {
						return true;
					}

				});

			}

		};

	})();

	return RouteUtil;

});
		