/*var s = Snap('#svg');
s.attr({
	width : 1200,
	height : 800,
});
var circle = s.circle(100, 100, 100);
circle.attr({
	id : 'circle'
});
circle.node.onclick = function() {
	circle.attr('fill', 'red');
}
var rect = s.rect(150, 0, 200, 200);
rect.attr({
	fill : 'red'
});
//rect.after(circle);
//circle.remove();
var subCircle = s.select('#circle');
var circle2 = s.paper.el('circle', {
	cx : 350,
	cy : 100,
	r : 100
});
var circle3 = circle2.clone();
circle3.attr({
	cx : 550,
	cy : 100,
	fill : 'red'
});
circle3.toDefs();

var path1 = s.paper.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
    fill: "none",
    stroke: "#bada55",
    strokeWidth: 5
}).pattern(0, 0, 10, 10),
c = s.paper.circle(550, 100, 100);
c.attr({
	fill: path1
});

var circle4 = s.paper.circle(5, 5, 3),
// marker-end连接的是第一条Line，即M 0 0 L 0 8
arrow1 = s.paper.path('M 0 0 L 0 8 L 6.93 4').attr('fill', 'red'),
circleMarker1 = circle4.marker(0, 0, 8, 8, 7, 5),
arrowMarker1 = arrow1.marker(0, 0, 9, 9, 0, 4);
var path2 = s.paper.path('M 670 20 L 720 20 L 720 120').attr({
	stroke : '#000',
	'stroke-width' : 1,
	fill : 'none',
	'marker-start' : circleMarker1,
	'marker-end' : arrowMarker1
});
//s.paper.svg();
//s.paper.mask();
//s.paper.use();
//var polyLine1 = s.paper.polyline([730, 20, 780, 50]);
var polyLine1 = s.paper.polyline({
	points : [730, 20, 780, 50]
});
polyLine1.attr({
	stroke : 'red',
	'stroke-width' : 1,
	fill : 'none'
});

var circle5 = s.paper.circle(880, 100, 100);
var lineGradient1 = s.paper.gradient('l(0, 0, 1, 1)#0f0:0.05-#00f-#f00');
circle5.attr({
	fill : lineGradient1
});
//s.clear();

Snap.animate(880, 1000, function(cx) {
	circle5.attr({
		cx : cx
	});
}, 2000, function() {
	circle5.attr({
		cx : 880
	});
});

var circle6 = s.paper.circle(1080, 100, 100),
//filter1 = s.paper.filter(Snap.filter.blur(10, 100));
filter1 = s.paper.filter(Snap.filter.shadow(5, 10, 20, '#ff7d00'));
circle6.attr({
	fill : 'red',
	'stroke-width' : '0',
	filter : filter1
});

var image1 = s.paper.image('../imgs/test-1/1.jpg', 10, 210, 200, 200),
//filter2 = s.paper.filter(Snap.filter.sepia(1));
//filter2 = s.paper.filter(Snap.filter.grayscale(1));
//filter2 = s.paper.filter(Snap.filter.saturate(0.5));
//filter2 = s.paper.filter(Snap.filter.hueRotate(0.1));
// 范围0~1, 表示滤镜数量。所有颜色替换成相反的颜色。0表示没有任何反相，1表示完全反相, 0.5则50%灰度色。
//filter2 = s.paper.filter(Snap.filter.invert(1));
filter2 = s.paper.filter(Snap.filter.contrast(0.5));
image1.attr({
	filter : filter2
});*/

//var path3 = Snap.select('#test');
/*path3.animate({
	d : 'M 0 550 Q 150 325 300 100 Q 700 100 1100 100 Q 1100 250 1100 400 Q 300 250 300 400 z'
}, 1000, mina.linear, function() {
	console.log('完成');
});*/
/*Snap.animate(5, 10, function(value) {
	console.log(value);
}, 1000);*/
// x[300, 1100]	y[100, 400]
//var targets = [[300, 100], [700, 100], [1100, 100], [1100, 250], [1100, 400], [700, 400], [300, 400], [300, 250], [300, 100]];
/*
 * 			A(300, 100)------B(700, 100)------C(1100, 100)
 * 			|								  |
 * 			|								  |
 * 			|								  |
 * 			|								  |
 * 			I(300, 250)						  D(1100, 250)
 * 			|								  |
 * 			|								  |
 * 			|								  |
 * 			|								  |
 * 			H(300, 400)------F(700, 400)------E(1100, 400)
 */

var innerDom = document.getElementById('innerDiv');
function flyAnimation(param) {
	var id = param.id,
	targetId = param.targetId,
	targetDom = document.getElementById(targetId),
	containerId = param.containerId,
	svg = Snap('#' + containerId),
	svgDom = document.getElementById(containerId),
	containerRect = svgDom.getBoundingClientRect(),
	path = svg.select('#' + id),
	rect = null;
	
	function init() {
		if(!path) {
			path = svg.path({
				id : id,
				d : param.d,
				fill : param.fill || '#ccc'
			});
			rect = document.getElementById(id).getBoundingClientRect();
		} else {
			rect = path.getBoundingClientRect();
		}
	}
	init();
	
	var top = rect.top,
	targetWidth = param.width,
	targetHeight = param.height,
	containerWidth = containerRect.width,
	containerHeight = containerRect.height,
	left = (containerWidth - targetWidth) / 2,
	center = containerWidth / 2,
	right = left + targetWidth,
	top = (containerHeight - targetHeight) / 2,
	middle = containerHeight / 2,
	bottom = top + targetHeight;
	
	targetDom.style.top = top + 'px';
	targetDom.style.left = left + 'px';
	
	function createPath(points) {
		var i = 0,
		length = points.length,
		str = '';
		for(; i < length; i++) {
			var point = points[i];
			if(!i) {
				str += 'M ' + point.join(' ');
			} else if (i % 2) {
				str += 'Q ' + point.join(' ');
			} else {
				str += ' ' + point.join(' ');
			}
		}
		return str;
	}
	
	var triggerLeft = rect.left,
	triggerRight = rect.right,
	triggerCenter = (triggerLeft + triggerRight) / 2,
	triggerTop = rect.top,
	times = targetWidth / rect.width,
	// 斜率
	rate = param.rate && param.rate > 0.5 && param.rate || 0.5;
	rate = rate >= 1 ? 1 : rate;
	
	// 第一阶段:triggerLeft-->left triggerRight-->right  triggerTop-->top
	Snap.animate([triggerLeft, triggerRight, triggerTop, 0.5], [left, right, top, rate], function(value) {
		var curLeft = value[0],
		curRight = value[1],
		// 上边中点
		curCenter = (curLeft + curRight) / 2,
		curTop = value[2],
		totalLeft = curLeft + triggerLeft,
		totalRight = curRight + triggerRight,
		totalTop = triggerTop + curTop,
		centerTop = totalTop * 0.5,
		curRate = value[3],
		to = [[curLeft, curTop], [curCenter, curTop], [curRight, curTop], [totalRight * curRate, centerTop],
		      [triggerRight, triggerTop], [triggerCenter, triggerTop], [triggerLeft, triggerTop],
		      [totalLeft * curRate, centerTop], [curLeft, curTop]],
		d = createPath(to);
		path.attr({
			d : d
		});
		
		var style = innerDom.style,
		curRect = document.getElementById('path').getBoundingClientRect();
		style.left = curRect.left + 'px';
		style.top = curRect.top + 'px';
		style.width = curRect.width + 'px';
		style.height = curRect.height + 'px';
		
	}, param.duration_f || 1000, mina.ease, function() {
		targetDom.style.width = targetWidth + 'px';
		targetDom.style.height = targetHeight + 'px';
		// 第二阶段:triggerLeft-->left  triggerRight-->right  triggerTop-->bottom
		Snap.animate([triggerLeft, triggerRight, triggerTop, rate], [left, right, bottom, 0.5], function(value) {
			var curLeft = value[0],
			curRight = value[1],
			curBottom = value[2],
			curRate = value[3],
			totalLeft = left + curLeft,
			totalRight = right + curRight,
			totalTop = curBottom + top,
			to = [[left, top], [(left + right) / 2, top], [right, top], [totalRight * curRate, totalTop * curRate],
			      [curRight, curBottom], [(curLeft + curRight) / 2, curBottom], [curLeft, curBottom], 
			      [totalLeft * curRate, totalTop * curRate], [left, top]],
			d = createPath(to);
			path.attr({
				d : d
			});
			
			var style = innerDom.style,
			curRect = document.getElementById('path').getBoundingClientRect();
			style.left = curRect.left + 'px';
			style.top = curRect.top + 'px';
			style.width = curRect.width + 'px';
			style.height = curRect.height + 'px';
			
		}, param.duration_s || 1000, mina.linear, function() {
			// 第二阶段完成后显示目标元素
//			svgDom.style.display = 'none';
		});
	});
}

flyAnimation({
	id : 'path',
	d : 'M 0 650 l 50 0',
	containerId : 'svg-test',
	targetId : 'target-sub',
	width : 800,
	height : 400,
	duration_f : 500,
	duration_s : 500,
	rate : 0.6
});

/*var imageContainer = Snap('#viewBox-container');
Snap.animate([0, 0], [800, 400], function(value) {
	imageContainer.attr({
		'viewBox' : '0 0 ' + value[0] + ' ' + value[1]
	});
}, 1000, mina.linear);*/

var paperContainer = Snap('#paper-container'),
paper = paperContainer.select('#paper-path');
paper.drag(function(dx, dy, x, y, e) {
	
});