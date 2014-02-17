define(function (require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Backbone = require('backbone');
	var Vent = require('utils/Vent');
	var Context = require('./Context');
	var Layout = require('./Layout');
	
	var app = {

		init: function() {
			
			console.log("%c Build created by %s on %s", "color: blue;", module.config().developer, module.config().date);
			this.context = new Context();

		},

		setupRouters: function() {

			//new SampleRouter({ context: this.context });
			
		},

		hidePreloader: function() {

			$('#overlay').fadeOut(500);

		},

		renderContainer: function() {

			new Layout({ context: this.context }).render().$el.insertAfter('#overlay');

		},

		start: function() {
			
			Backbone.history.start();
			//Vent.region.trigger('Layout:changeView', 'gallery');
			
		}

	};

	return {

		start: function() {

			app.hidePreloader();
			app.init();
			app.renderContainer();
			app.setupRouters();
			app.start();
			
		}

	};

});