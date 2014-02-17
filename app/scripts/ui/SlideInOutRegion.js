define(function (require) {
	'use strict';
	var Backbone = require("backbone");
	var Marionette = require("marionette");

	var SlideInOutRegion = Backbone.Marionette.Region.extend({

		inSpeed: 600,

		outSpeed: 350,

		finalLeft: 0,

		open: function(view){
			
			this.$el.animate({"left": this.$el.outerWidth()}, this.outSpeed)

			.promise().done(_.bind(function(){
				this.$el.html(view.el);
				this.$el.animate({"left": this.finalLeft}, this.inSpeed);
			}, this));
			
		},

		close: function(){

			if(!this.currentView) {
				return;
			}
			var view = this.currentView;
			delete this.currentView;
	
			this.$el.animate({"left": this.$el.outerWidth()}, this.outSpeed)

			.promise().done(_.bind(function(){

				if (view.close) { view.close(); }
				this.trigger("view:closed", view);
				
			}, this));
		 
		}

	});

	return SlideInOutRegion;

});