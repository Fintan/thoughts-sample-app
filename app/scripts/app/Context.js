define(function (require, exports, module) {
	'use strict';
	var Injector = require('utils/Injector');
	var User = require('./userinfo/User');
	var Thoughts = require('./thoughts/Thoughts');
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
			this.state = new Backbone.Model();
			this.user = new User();
			this.thoughts = new Thoughts([], { state: this.state });

			//setup injection mappings
			this.injector = new Injector();

			this.injector.addMapping('user', this.user);

			this.injector.addMapping('thoughts', this.thoughts);

			this.injector.addMapping('state', this.state);

			this.injector.addMapping('tags', this.thoughts.tags);

			window.context = this; //for debug
			
		}

	};
	
	return Context;
});