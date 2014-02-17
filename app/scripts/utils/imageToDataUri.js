define(function (require) {
	'use strict';
	return function(imgEl, mime) {

		var canvas, ctx, imgUri ='';
		canvas = document.createElement('canvas');

		if(canvas.getContext) {

			ctx = canvas.getContext('2d');
			canvas.width = imgEl.width;
			canvas.height = imgEl.height;
			ctx.drawImage(imgEl,0,0, imgEl.width, imgEl.height);
			imgUri = canvas.toDataURL(mime || 'image/png');

		}

		return imgUri;
		
	};

});