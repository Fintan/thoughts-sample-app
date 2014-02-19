define(function (require) {
	'use strict';
	var JST = require('jst');
	var Backbone = require('backbone');
	
	return Backbone.View.extend({

		id: 'userInfo',

		tagName: 'section',

		events: {
			'change input': 'onInput'
		},

		initialize: function(options) {

			this.model = options.context.user;

		},

		onInput: function(e) {

			var $el = $(e.target);
			var id = $el.attr('id');

			if(id === "newUserName") {

				this.model.set('name', $el.val());

			}else if(id === "newUserAge") {

				this.model.set('age', $el.val());
				
			}
		},

		render: function() {

			this.$el.html(JST['UserInfo'](this.model.toJSON()));

		}

	}); 

});