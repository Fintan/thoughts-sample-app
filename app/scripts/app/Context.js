define(function (require, exports, module) {
	'use strict';
	var Injector = require('utils/Injector');
	var User = require('./userinfo/User');
	var Backbone = require('backbone');
	
	var Context = function(){

		this.createContext();

	};

	Context.prototype = {

		createContext: function() {	

			//context is now a designated spot to;
			//(1) create models, 
			//(2) map to models, 

			//instantiate models here
			this.user = new User();

			this.state = new Backbone.Model();

			//setup injection mappings
			this.injector = new Injector();
			
			this.injector.addMapping('user', _.bind(function() {
				return this.user;
			}, this));

			this.injector.addMapping('state', _.bind(function() {
				return this.state;
			}, this));

			window.context = this; //for debug
			
		}

	};
	
	return Context;
});