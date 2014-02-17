define(function (require) {
	'use strict';
	var $ = require('jquery');
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Marionette = require("marionette");
	
	return Backbone.Marionette.ItemView.extend({

		events: {
			'keydown': 'onKeyDown'
		},

		keyMapping: {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down',
			8: 'back'
		},

		onKeyDown: function(e) {
			console.log('onKeyDown', e.keyCode, this.keyMapping[e.keyCode]);
			//this.trigger('Navigation', this.keyMapping[e.keyCode]);
			var focusedView = this.collection.findWhere({ focused: true });
/*
			//check for siblings before bubbling to parents
			var siblings = this.collection.where({parentId: focusedView.get('parent')});
			var focusedIndex = _.indexOf(siblings, focusedView);
			//possible default ordering
			var previousSibling = siblings[focusedIndex-1];//back
			var nextSibling = siblings[focusedIndex+1];//forward

			var parent = this.collection.findWhere({id: focusedView.get('parent')});
	*/		
			if(focusedView) { focusedView.view.onNavigate( this.keyMapping[e.keyCode], keyCode ); }

		},


	
	});

	//{view:view, id:30, parentId:24, active:true, focused:true}
	//{view:view, id:31, parentId:24, active:true, focused:false}
	//{view:view, id:32, parentId:24, active:true, focused:false}
	//{view:view, id:24, parentId:'root', active:true, focused:true}
	//{view:view, id:33, parentId:25, active:false, focused:false}
	//{view:view, id:25, parentId:'root', active:false, focused:true}
	//{view:view, id:'root', active:true, focused:true}


	//v = new View({id: 30, parentId:25})
	//v.focus()

	//how to determine default order for first child to give focus?  priority queue for overriding default?
	
	//parentId = parentId || v.$el.closest('spatial').attr('spatial');

	//siblings = this_spacialBindings.where(views, {parentId: parentId});
	//ancestors = 

	/*

	Backbone.Spatial = (function(Backbone, _){
		"use strict";
		
		var widgets;
		var keyListener;

		return {
	
			start: function(options) {
				widgets = new Backbone.Collection();
				keyListener = new KeyListener({ collection: widgets, keymap: options.keymap });
			},

			widgets: widgets,

			destroy: function() {
				widgets.reset();
				keyListener.close();
			}

		}
	
	})(Backbone, _);

	_.extend(Backbone.View.prototype, {

		spacial: function(options) {
			//add view to views array
			var parentId = options.parentId || this.$el.closest('spatial').attr('spatial');
			this.spacialId = this.idAttribute || this.$el.attr('id') || this.model.cid;
			this.$el.addClass('spatial').attr('spatial', id);

			this.spacialWidget = new Backbone.Model({ view:this, id:this.spacialId, parent:parentId, active:false, focused:false });
			Backbone.Spatial.widgets.add({this.spacialWidget);
		},

		_setFocus: function() {
			
			this.spacialWidget.set({ active:true, focused:true });

		},

		_unFocus: function() {
			this.spacialWidget.set({ active:true, focused:false });
	
		},
		_setActive: function() {
			
			this.spacialWidget.set({ active:true });

		},

		_unActive: function() {
			this.spacialWidget.set({ active:false });
	
		},
		
		focus: function() {
			
			this.trigger('focus');

		},

		onFocus: function() {
	
		},

		_setActiveChild: function() {
	
			//TODO: maybe just leave children checks to specialised subclasses?
			var children = this.collection.where({parentId: focusedView.get('id')});
			if(children.length > 0) {
				
			}
			var siblings = this.collection.where({parentId: focusedView.get('parent')});
			var focusedIndex = _.indexOf(siblings, focusedView);

		}

	});
	
	var SpacialView = Backbone.View.extend({
		
		onNavigate: function(keymap, keycode) {

			var siblings = this.collection.where({parentId: this.spacialWidget.get('parent')});
			var _selectedIndex = _.indexOf(siblings, _selectedIndex);

			var _newSelectedIndex = _selectedIndex;

			if(keymap === 'left'){
				_newSelectedIndex--;
			}else if(keymap === 'right'){
				_newSelectedIndex++;
			}else if(keymap === 'up'){
				_newSelectedIndex--;
			}else if(keymap === 'down'){
				_newSelectedIndex++;
			}

			var _selectedWidget = siblings[_newSelectedIndex];

			if(_selectedWidget) {
				this.spacialWidget._unFocus();
				_selectedWidget._setFocus();
			}else {
				this.spacialWidget._unActive();
				this.spacialWidget._unFocus();

				//now set focus on active widget of parent
			
			}
			//else check on parent for the next sibling
		}

		onRender: function() {
			this.spacialRegister({ parent: 'aParentId' });
		}

	});


	*/
});