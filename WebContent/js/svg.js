function witchEvent() {
	var a, element = document.createElement('div'),
	animations = {
		animation : {
			end : 'animationend'
		},
		WebkitAnimation : {
			end : 'webkitAnimationEnd'
		}
	},
	transitions = {
		transition : {
			end : 'transitionend'
		},
		WebkitTransition : {
			end : 'webkitTransitionEnd'
		}
	},
	eventObj = {},
	style = element.style;
	for(a in animations) {
		if(style[a] != undefined) {
			eventObj.animationEvent = animations[a];
			break;
		}
	}
	for(var t in transitions) {
		if(style[t] != undefined) {
			eventObj.transitionEvent = transitions[t];
			break;
		}
	}
	return eventObj;
}
var eventObj = witchEvent(),
animationEvent = eventObj.animationEvent,
transitionEvent = eventObj.transitionEvent;

function addEvent(dom, type, callback) {
	if(window.addEventListener) {
		dom.addEventListener(type, callback);
	} else if(window.attatchEvent) {
		dom.attatchEvent('on' + type, callback);
	} else {
		console.error('浏览器太古老');
	}
}

(function initAnimationFrame() {
	var lastTime = 0,
	browserPrefixs = 'webkit moz ms'.split(' '),
	requestAnimationFrame = window.requestAnimationFrame,
	cancelAnimationFrame = window.cancelAnimationFrame,
	i = 0,
	length = browserPrefixs.length;
	
	// 兼容不同浏览器
	// 60帧每秒
	if(!requestAnimationFrame || !cancelAnimationFrame) {
		for(; i < length; i++) {
			var prefix = browserPrefixs[i];
			requestAnimationFrame = window[prefix + 'RequestAnimationFrame'];
			cancelAnimationFrame = window[prefix + 'CancelAnimationFrame'];
			if(requestAnimationFrame && !cancelAnimationFrame) {
				break;
			}
		}
	}
	
	// 兼容不支持requestAnimationFrame和cancelAnimationFrame的浏览器
	if(!requestAnimationFrame || !cancelAnimationFrame) {
		requestAnimationFrame = function(callback , element) {
			var currentTime = Date.now(),
			// 使setTimeout尽可能接近每秒60帧效果
			timeToCall = Math.max(0, 16 - (currentTime - lastTime)),
			id = setTimeout(function() {
				callback(currentTime + timeToCall);
			}, timeToCall),
			lastTime = currentTime + timeToCall;
			return id;
		}
		cancelAnimationFrame = function(id) {
			clearTimeout(id);
		}
	}
	
	window.requestAnimationFrame = requestAnimationFrame;
	window.cancelAnimationFrame = cancelAnimationFrame;
	
})();

function render(dom, totalLength, mesc) {
	var offset = 0,
	// 默认动画2秒
	mesc = mesc || 2000,
	// 计算每帧增加多少
	offsetPerFrame = totalLength / (60 * mesc / 1000);
	transitionEvent && addEvent(dom, transitionEvent.end, function() {
		console.log('动画完成');
	});
	dom.style.opacity = 0.5;
	(function() {
		offset += offsetPerFrame;
		dom.style.strokeDasharray = offset + ' ' + totalLength;
		if(offset < totalLength) {
			requestAnimationFrame(arguments.callee);
		}
	})();
}

function getDom(id) {
	return document.getElementById(id);
}

(function() {
	var rect001 = getDom('rect-001'),
	clientRect = rect001.getBoundingClientRect(),
	width = clientRect.width,
	height = clientRect.height,
	circumference = 2 * (width + height);
	render(rect001, circumference, 2000);
})();

(function() {
	var rect002 = getDom('rect-002'),
	clientRect = rect002.getBoundingClientRect(),
	width = clientRect.width - 5,
	height = clientRect.height - 5,
	otherLength = Math.PI * 2 * 5,
	circumference = 2 * (width + height) + otherLength;
	render(rect002, circumference, 2000);
})();

// 画path
function drawPath(param) {
	var id = param.id,
	x = param.x || 0,
	y = param.y || 0,
	hSplit = param.hSlipt || 10,
	vSplit = param.vSlipt || 10,
	width = param.width,
	height = param.height,
	hCount = Math.floor(width / hSplit),
	vCount = Math.floor(height / vSplit),
	dom = getDom(id),
	v = 0,
	h = 0,
	dCommandArray = [];
	for(; v <= vCount; v++) {
		var tempY = y + v * vSplit;
		dCommandArray.push('M ' + x + ' ' + tempY);
		dCommandArray.push('L ' + (x + width) + ' ' + tempY);
	}
	for(; h <= hCount; h++) {
		var tempX = x + h * hSplit;
		dCommandArray.push('M ' + tempX + ' ' + y);
		dCommandArray.push('L ' + tempX + ' ' + (y + height));
	}
	dom.setAttribute('d', dCommandArray.join(' '));
}

drawPath({
	id : 'path-001',
	x : 10,
	y : 220,
	width : 300,
	height : 250
});

function renderUse(dom, totalLength, mesc, target, svgContainer) {
	var offset = 0,
	// 默认动画2秒
	mesc = mesc || 2000,
	// 计算每帧增加多少
	offsetPerFrame = totalLength / (60 * mesc / 1000);
	(function() {
		offset += offsetPerFrame;
		dom.style.strokeDasharray = offset + ' ' + totalLength;
		if(offset < totalLength) {
			requestAnimationFrame(arguments.callee);
		} else {
			target.className = target.className.replace(' hide', '');
			svgContainer.setAttribute('class', 'hide');
			dom.setAttribute('class', 'hide');
		}
	})();
}

(function() {
	var divs = document.querySelectorAll('#dash-test .svg-animation'),
	uses = document.querySelectorAll('#dash-test .svg-animation-use'),
	svgContainer = getDom('svg-animation-container');
	for(var i = 0, length = uses.length; i < length; i++) {
		var use = uses[i],
		div = divs[i],
		clientRect = use.getBoundingClientRect();
		c = 2 * (clientRect.width + clientRect.height);
		renderUse(use, c, 2000, divs[i], svgContainer);
	}
})();