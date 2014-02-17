define( function(require) {
	'use strict';
	var _ = require('underscore');

	/**
		Example usage:
		(http://wookiehangover.github.io/dependency-injection-for-fun-and-profit/#/28)

		Backbone.View.extend({
			initialize: function(options){
				enforceDependencies(this, options, ['model', 'app']);
			}
		});

	**/

	return function (klass, options, deps){
		
		deps = _.filter(deps, function(depName){

			if( !options[depName] ){
				throw new Error('Missing required dependency: '+ depName);
			}

			return !!klass[depName];

		});

		_.extend(klass, _.pick(options, deps));
	};

});