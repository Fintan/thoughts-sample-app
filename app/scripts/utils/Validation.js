define(function() {
	'use strict';
	//Alphabets, numbers and space(' ') no special characters min 3 and max 20 characters. 
	var name = /^[A-Za-z0-9 ]{3,20}$/;

	//Standard email address
	//var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	//permits + character (gmail accounts)
	var email = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	//Supports alphabets and numbers no special characters except underscore('_') min 3 and max 20 characters. 
	//var username = /^[A-Za-z0-9_]{1,20}$/;
	// allowed characters: any word . -, ( \w ) represents any word character (letters, digits, and the underscore _ ), equivalent to [a-zA-Z0-9_]
	var username = /^[\w.-]+$/;

	//same as username but permits spaces
	var itemname = /^[a-zA-Z0-9 _.-]+$/;

	//Password supports special characters and here min length 6 max 20 charters.
	var password = /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;

	// numeric digits only
	var numeric = /^\d+$/;

	//alpha characters only
	var alpha = /^[A-Za-z][-a-zA-Z ]+$/;

	//aplha numeric characters only
	var alphaNumeric = /^[A-Za-z0-9]+$/;

	return {

		isName: function(input) {

			return name.test(input);

		},

		isEmail: function(input) {

			return email.test(input);

		},

		isUsername: function(input) {

			return username.test(input);

		},

		isItemname: function(input) {

			return itemname.test(input);

		},

		isPassword: function(input) {

			return password.test(input);

		},

		isNumeric: function(input) {

			return numeric.test(input);

		},

		isAlpha: function(input) {

			return alpha.test(input);

		},

		isAlphaNumeric: function(input) {

			return alphaNumeric.test(input);

		}

	};

});