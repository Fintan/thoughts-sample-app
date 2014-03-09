define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	
	return Backbone.Marionette.ItemView.extend({

		id: 'thoughtDetail',

		template: 'ThoughtDetail',

		className: 'row',

		events: {
			'click #removeBtn': 'onRemove',
			'submit form': 'onSave'
		},

		bindings: {
			'#inputTitle': 'title',
			'#inputDetails': 'description'
		},

		$inject: {
			'state': 'state'
		},

		initialize: function(options) {
			this.state = options.state;
		},

		onSave: function(e) {

			e.preventDefault();
			this.model.save();
			console.log('saved!');
		},

		onRemove: function(e) {
			
			this.model.destroy()

			.done(_.bind(function() {

				this.state.set('selectedItem', null);
				this.close();
				
			}, this));

		},

		onRender: function() {
			this.stickit();
		}

	}); 

});