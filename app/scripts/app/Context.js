define(function (require, exports, module) {
	'use strict';
	var User = require('./userinfo/User');

	var Context = function(){

		this.createContext();

	};

	Context.prototype = {

		createContext: function() {	
			
			//instantiate models here
			this.user = new User();

			window.context = this; //for debug
			
		}

	};
	
	return Context;
});