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
			'#inputDetails': 'description',
			'#inputTags': 'tags'
		},

		initialize: function(options) {
			this.state = options.state;
			this.tags = options.tags;
			console.log('options', options);
		},

		onSave: function(e) {

			e.preventDefault();
			this.model.save();
			
			var tags = this.model.get('tags').split(',');
			_.each(tags, function(label) {
				
				this.tags.saveTag(label, this.model.get('id'));
				this.tags.saveTag('All', this.model.get('id'));
				
			}, this);
			
		},

		onRemove: function(e) {
			
			var id = this.model.get('id');
			this.model.destroy()

			.done(_.bind(function() {

				this.tags.each(function(tag) {
					tag.removeThoughtFromTag(id);
				}, this);

				this.state.set('selectedItem', null);
				this.close();
				
			}, this));

		},

		onRender: function() {
			this.stickit();
		}

	}); 

});