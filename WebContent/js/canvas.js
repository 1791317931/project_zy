(function() {
	function getCanvas(selector) {
		var context = $(selector).find('canvas')[0].getContext('2d');
		return context;
	}
	
	// 画圆
	function animateDrawArc(selector, param) {
		var option = {
			value : 50,
			// 值后缀
			suffix : '',
			strokeStyle : 'deepskyblue',
			// 默认线条宽度
			lineWidth : 10,
			// 默认半径50px
			radius : 50,
			// 从正上方开始绘画--270°
			reg : 1.5 * Math.PI,
			// 默认顺时针
			counterClockwise : false,
			// 每次绘画的间隔时间（毫秒）
			intervalMilliseconds : 10,
			// 正圆strokeStyle颜色
			fullArcStrokeStyle : '#ddd'
		};
		option = $.extend(true, option, param);
		
		if(option.value > 100) {
			option.value = 100;
		}
		var $container = $(selector);
		canvas = getCanvas(selector),
		$span = $container.find('span'),
		lineWidth = option.lineWidth,
		r = option.radius
		x = option.x,
		y = option.y,
		value = Math.floor(option.value),
		diff = option.value - value,
		suffix = option.suffix,
		i = 0,
		fullArcStrokeStyle = option.fullArcStrokeStyle,
		intervalMilliseconds = option.intervalMilliseconds,
		reg = option.reg,
		PI = Math.PI,
		counterClockwise = option.counterClockwise;
		canvas.lineWidth = lineWidth;
		// ----------------先画正圆-------------------------
		canvas.beginPath();
		canvas.strokeStyle = fullArcStrokeStyle;
		canvas.arc(x, y, r, 0, 2 * Math.PI);
		canvas.stroke();
		canvas.closePath();
		// ----------------先画正圆-------------------------
		// ----------------动画做圆-------------------------
		// chrome version:46  bug
		canvas.globalCompositeOperation = 'source-atop';
//		canvas.globalCompositeOperation = 'multiply';
		canvas.beginPath();
		canvas.strokeStyle = option.strokeStyle;
		setTimeout(function() {
			if(i < value) {
				// 每次增加1%，但是这个圆有点模糊；如果是一次性画圆就没有这个问题
				canvas.arc(x, y, r, reg, (reg += 0.01 * 2 * PI), counterClockwise);
				i++;
				$span.html(i + suffix);
				canvas.stroke();
				setTimeout(arguments.callee, intervalMilliseconds);
			} else if (i == value && diff) {
				// 如果有小数位，需要补全
				setTimeout(function() {
					canvas.arc(x, y, r, reg, (reg += 0.01 * new Number(diff).toFixed(1) * 2 * PI), counterClockwise);
					$span.html(new Number(option.value).toFixed(1) + suffix);
					canvas.stroke();
				}, intervalMilliseconds);
			}
		}, intervalMilliseconds);
	}
	
	function drawLineGradient() {
		var canvas = document.getElementById('linear-gradient').getContext('2d'),
		// 色带  
		linearGradient = canvas.createLinearGradient(0, 0, 300, 300);
		linearGradient.addColorStop(0, '#ff0000');
		linearGradient.addColorStop(0.5, '#00ff00');
		linearGradient.addColorStop(1, 'rgb(255, 255, 0)');
		canvas.fillStyle = linearGradient;
		canvas.fillRect(0, 0, 300, 300);
	}
	
	window.AnimateCanvas = function() {
		this.draw = animateDrawArc;
		this.drawLineGradient = drawLineGradient;
	};
	
})();

var animationCanvas = new AnimateCanvas();

animationCanvas.draw('#percent-container', {
	value :70,
	x : 38,
	y : 38,
	lineWidth : 5,
	radius : 32,
	suffix : '%'
});

animationCanvas.drawLineGradient();