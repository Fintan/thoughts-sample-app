define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	
	return Backbone.Marionette.ItemView.extend({

		tagName: 'ul',

		template: 'Menu',

		className: 'nav navbar-nav',

		$inject: {
			'model': 'state'
		},

		bindings: {
			'li': {
				observe: 'activeMenuItem',
				update: function($el, val) { 
					$el.removeClass('active');
					$el.find('a[href="#'+ val +'"]').parent().addClass('active');
				}
			}
		},

		onRender: function() {

			this.stickit();

		}

	}); 

});