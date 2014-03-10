define(function (require) {
	'use strict';
	var Backbone = require('backbone');
	require('backbone.localstorage');

	return Backbone.Collection.extend({

		model: Backbone.Model.extend({ 
			idAttribute: 'label',

			addThoughtToTag: function(thoughtId) {
				var thoughtIds = this.get('thoughtIds');
				thoughtIds.push(thoughtId);
				this.set('thoughtIds', _.unique(thoughtIds));
				this.set('count', this.get('thoughtIds').length);
			},

			removeThoughtFromTag: function(thoughtId) {
				var thoughtIds = this.get('thoughtIds');
				if(_.contains(thoughtIds, thoughtId)) {
					thoughtIds = _.without(thoughtIds, thoughtId);
					this.set('thoughtIds', thoughtIds);
					this.set('count', this.get('thoughtIds').length);
					this.save();
				}
			},

			saveTag: function(thoughtId) {
				this.addThoughtToTag(thoughtId);
				this.save();
			},

			defaults: {
				thoughtIds:[]
			}
		}),

		localStorage: new Backbone.LocalStorage('Tags'),

		saveTag: function(label, thoughtId) {

			var tag = this.findWhere({ label:label });
			if(tag) {
				tag.saveTag(thoughtId);
			}else {
				this.create({ label:label, count:1, thoughtIds:[thoughtId] });
			}

		},

		comparator: function(model) {
			return model.get('label');
		}

	});
});