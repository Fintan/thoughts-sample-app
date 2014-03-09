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
		getMapping: function (key, valueOf, view) {
			
			var service = this.defaults[key];

			if (!service) {
				
				var service = _.result(this.mappings, key);
				if (!service) {
					console.warn('dependency\'', key,  '\' is undefined for', view.id, '.$inject {',valueOf, ':', key, '}', view.$inject);
					return null;
				}
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

			return this.createType(Constructor, options);

		},

		/**
		* Instantiates the given constructor providing it with its dependencies.
		* @param {Function} Constructor The Backbone Router type.
		* @param {Object} options optional options object literal to add dependencies to.
		* @return {!Object} An instance of the constructor.
		*/
		createRouter: function (Constructor, options) {

			return this.createType(Constructor, options);

		},

		/**
		* Instantiates the given constructor providing it with its dependencies.
		* @param {Function} Constructor The Type.
		* @param {Object} options optional options object literal to add dependencies to.
		* @return {!Object} An instance of the constructor.
		*/
		createType: function (Constructor, options) {

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

			_.each(items, function(value, key) {
				options[key] = this.getMapping(value, key, instance);
			}, this);

			Constructor.call(instance, options);

		}

	};

	return Injector;
});