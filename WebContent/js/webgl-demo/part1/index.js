'use strict';

document.body.onload = function() {
	
	var webGL = new WebGL({
		id : 'webgl',
		vId : 'v-source',
		fId : 'f-source'
	}),
	active = ' active';
	webGL.renderTriangle([0.0, 0.5, -0.5, -0.5, 0.5, -0.5], 2, 0, 3, 'a_Position');
	
	var nextPartButton = getDomById('next');
	nextPartButton.onclick = function() {
		window.parent.nextPart();
	};
};