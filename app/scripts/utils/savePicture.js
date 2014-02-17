define(function (require) {
	'use strict';
	return function(canvas, fileName) {

		var a = document.createElement('a');
		a.setAttribute('href',  canvas.toDataURL('image/png'));
		a.setAttribute('download',  fileName || 'capturedImg');
		a.innerHTML = fileName || 'capturedImg';
		document.getElementsByTagName('body')[0].appendChild(a);
		
	};

});