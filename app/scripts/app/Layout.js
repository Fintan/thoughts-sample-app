define(function (require) {
	'use strict';
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Vent = require('utils/Vent');
	var Menu = require('./menu/Menu');
	var UserInfo = require('./userinfo/UserInfo');
	var ThoughtsScreen = require('./thoughts/ThoughtsScreen');

	return Backbone.Marionette.Layout.extend({

		template: 'Layout',

		className: 'layout container-fluid',

		regions: {
			'menuArea': '#menuArea',
			'contentArea': '#contentArea'
		},

		initialize: function(options) {

			Vent.region.on('Layout:changeView', this.onChangeView, this);
			this.injector = options.context.injector;
	
		},

		onChangeView: function(viewId, options) {

			this.contentArea.show(this.retrieveView(viewId, options));
			
		},

		retrieveView: function(viewId, options) {

			var view;

			if(viewId === 'userinfo') {
				view = this.injector.createView(UserInfo, options || {});
			}else if(viewId === 'thoughtsscreen') {
				view = this.injector.createView(ThoughtsScreen, options || {});
			}

			return view;
		},

		showMenu: function(viewId, options) {

			this.menuArea.show(this.injector.createView(Menu, options || {}));

		},

		onRender: function() {

			this.showMenu();

		},

		onClose: function() {

			Vent.region.off(null, null, this);

		}

	});

});