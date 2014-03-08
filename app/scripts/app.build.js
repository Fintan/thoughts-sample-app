require.config({

	paths: {
		'jquery': '../bower/jquery/jquery',
		'underscore': '../bower/underscore/underscore',
		'backbone': '../bower/backbone/backbone',
		'marionette': '../bower/marionette/lib/core/amd/backbone.marionette',
		'backbone.babysitter': '../bower/backbone.babysitter/lib/amd/backbone.babysitter',
		'backbone.wreqr': '../bower/backbone.wreqr/lib/amd/backbone.wreqr',
		'backbone.stickit': '../bower/backbone.stickit/backbone.stickit',
		'backbone-deep-model': '../bower/backbone-deep-model/distribution/deep-model',
		'backbone-route-filter': '../bower/backbone-route-filter/backbone-route-filter',
		'backbone.localstorage': '../bower/backbone.localstorage/backbone.localstorage',
		'bootstrap': '../bower/bootstrap/dist/js/bootstrap',
		'handlebars': '../bower/handlebars/handlebars',
		'domReady': '../bower/requirejs-domready/domReady',
		'createjs': '../bower/PreloadJS/lib/preloadjs-0.4.1.min'
	},

	shim: {
		jquery : {
			exports : 'jQuery'
		},
		underscore : {
			exports : "_"
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		'backbone.stickit': ["underscore", "jquery", "backbone"],
		'backbone-deep-model': ["underscore", "jquery", "backbone"],
		'backbone-route-filter': ['backbone'],
		'backbone.localstorage': ['backbone'],
		handlebars: {
			exports: 'Handlebars'
		},
		jst: {
			deps:[ "handlebars", "utils/handlebarhelpers"],
			exports: "JST"
		},
		'bootstrap': {
			deps: ['jquery', 'foundation']
		},
		createjs: {
			exports: 'createjs'
		}
	},

	packages: [
		{
			name:'app',
			main:'Application'
		}
	]

});