/**
	Place any function overrides, global settings, etc.. here
**/
define(function (require) {
	'use strict';
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require("backbone");
	var Marionette = require("marionette");
	var Handlebars = require('handlebars');
	var JST = require("jst");
	require('backbone.stickit');
	
	//provides dynamic partial-like functionality (useful for injecting a template, chosen at runtime, into another template)
	Handlebars.registerHelper('compiledTemplate', function (templateName, data, opts) {
		
		if(!JST[templateName] && !_.isFunction(JST[templateName])) { return "Template '"+ templateName +"' is not precompiled in JST"; }

		return new Handlebars.SafeString(JST[templateName](data || {}));

	});

	//using precompiled handlebar templates, default was Underscore templates
	Backbone.Marionette.Renderer.render = function(template, data){

		if(!template) { return ""; }//makes template for a view optional

		if(!JST[template] && !_.isFunction(JST[template])) { return; }

		return JST[template](data);
	};

	//avoid caching on IE
	Backbone.$.ajaxSetup({ cache: false });

	Backbone.Stickit.addHandler({
		selector: 'img.stickit',
		update: function($el, val) { 
			$el.attr('src', val);
		},
		getVal: function($el) { return $el.attr('src'); }
	});

	Backbone.Stickit.addHandler({
		selector: 'iframe.stickit',
		update: function($el, val) { 
			$el.attr('src', val);
		},
		getVal: function($el) { return $el.attr('src'); }
	});

	_.mixin({
	
		// _.chk(function() { return options.context.nodes.currentNodes });
		chk: function (func) {
			try{
				return func();
			}catch(e){
				return null;
			}
		}
		
	});

});