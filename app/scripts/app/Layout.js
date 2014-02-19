define(function (require) {
	'use strict';
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Marionette = require('marionette');
	var Vent = require('utils/Vent');
	var Menu = require('./menu/Menu');
	var UserInfo = require('./userinfo/UserInfo');

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

			if(this.lastId === viewId) {
				this.contentArea.currentView.updateView(options);
			}else {
				this.contentArea.show(this.retrieveView(viewId, options));
			}
			
		},

		retrieveView: function(viewId, options) {

			var view;

			if(viewId === 'userinfo') {
				//view = new UserInfo(_.extend({context: this.options.context}, options || {}));
				view = this.injector.createView(UserInfo, options || {});
			}

			this.lastId = viewId;
			window.view = view;
			
			return view;
		},

		showMenu: function() {

			this.menuArea.show(new Menu());

		},

		onRender: function() {

			this.showMenu();

		},

		onClose: function() {

			Vent.region.off(null, null, this);

		}

	});

});