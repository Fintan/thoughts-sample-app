/**
*	Utility that provides constructor injection for Backbone views
*
* based on http://blog.jankuca.com/post/23066002249/dependency-injection-javascript
*
**/
define(function (require) {
	'use strict';
	var _ = require('underscore');

	function Injector() {

		this.mappings = {};

		this.defaults = {
			'$injector': this
		};

	}

	Injector.prototype = {

		/**
		* Adds an object to the mapping index under the key provided.
		*/
		addMapping: function (key, object) {

			this.mappings[key] = object;

		},

		/**
		* Returns a service by its key.
		* @param {string} key The key of the service to get.
		* @return {!Object} The service.
		*/
		getMapping: function (key) {
			
			var service = this.defaults[key];

			if (!service) {
				var factory = this.mappings[key];
				if (!factory) {
					return null;
				}
				service = factory();
				this.defaults[key] = service;
			}
			return service;

		},

		/**
		* Instantiates the given constructor providing it with its dependencies.
		* @param {Function} Constructor The Backbone View type.
		* @param {Object} options optional options object literal to add dependencies to.
		* @return {!Object} An instance of the constructor.
		*/
		createView: function (Constructor, options) {

			var Dependant = function () {};
			Dependant.prototype = Constructor.prototype;

			var instance = new Dependant();
			this.inject(Constructor, instance, options);

			return instance;

		},

		/**
		* Injects dependencies to a constructor in the context of the given instance.
		* @param {Function} Constructor The constructor function to use.
		* @param {!Object} instance The instance to use.
		* @param {Object} options optional options object literal to add dependencies to.
		*/
		inject: function (Constructor, instance, options) {

			var items = Constructor.prototype.$inject || [];

			options = options || {};

			_.each(items, function(item, key) {
				options[key] = this.getMapping(item);
			}, this);

			Constructor.call(instance, options);

		}

	};

	return Injector;
});