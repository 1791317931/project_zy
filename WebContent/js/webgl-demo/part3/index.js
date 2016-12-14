// webgl.ARRAY_BUFFER			绑定顶点缓冲区对象
// webgl.ELEMENT_ARRAY_BUFFER	顶点索引缓冲区对象

document.body.onload = function() {
	var preButton = getDomById('pre'),
	nextButton = getDomById('next');
	preButton.onclick = function() {
		window.parent.prePart();
	};
	nextButton.onclick = function() {
		window.parent.nextPart();
	};
};