$.fn.extend({
	/**
	 html:
	 	<div id="drawer"></div>
	 css:
	 	#drawer {
			width: 1000px;
			height: 30px;
			border: 1px solid #ff7d00;
			margin: 20px auto 0;
			text-align: center;
		}
		.drawer-head {
			width: 100px;
			height: 30px;
			line-height: 30px;
		}
		.drawer-content {
			height: 0;
			overflow: hidden;
		}
		.drawer-transition {
			transition: height 0.1s ease-in-out;
			-webkit-transition: height 0.2s ease-in-out;
		}
		.drawer-item {
			height: 30px;
			border-bottom: 1px solid #47a6d8;
		}
		.drawer-item:hover {background-color: #47a6d8;}
		.orange {background-color: #ff7d00;}
	js:
		$('#drawer').Drawer({
			data : [{
				title : '第一个抽屉',
				data : [{
					text : '内容1',
					value : '1-1'
				}, {
					text : '内容2',
					value : '1-2'
				}]
			}],
			contentClassName : 'orange'
		});
	 */
	// 抽屉效果
	/*Drawer : function(opt) {
		// 容器
		var $this = $(this),
		param = {
			*//**
			 * [{
			 * 		title : 'xxx',
			 * 		data : [{
			 * 			text : 'xxx',
			 * 			value : 'xxx',
			 * 		}]
			 * 	}...]
			 *//*
			data : [],
			// 默认最大伸缩量30
			maxFlexHeight : 30,
			headClassName : '',
			contentClassName : '',
			itemClassName : ''
		},
		html = '';
		param = $.extend(true, param, opt);
		
		var data = param.data,
		MAX_FLEX_HEIGHT = param.maxFlexHeight,
		headClassName = param.headClassName,
		contentClassName = param.contentClassName,
		itemClassName = param.itemClassName;
		
		
		for(var i = 0, length = data.length; i < length; i++) {
			var drawer = data[i];
			html += '<div class="drawer-head pull-left ml10">'
						+ '<div class="' + headClassName + '">' + drawer.title + '</div>'
					+ '<div class="drawer-content drawer-transition" data-index="' + i + '">';
			var children = drawer.data || [];
			for(var m = 0, l = children.length; m < l; m++) {
				var child = children[m];
				html += '<div class="drawer-item ' + itemClassName + '" data-value="' + (child.value || '') + '">' + child.text + '</div>';
			}
			html += '</div></div>';
		}
		$this.html(html);
		
		$('.drawer-head').hover(function() {
			var $this = $(this),
			height = 0,
			$target = $this.find('.drawer-content'),
			$children = $this.find('.drawer-item');
			for(var i = 0, length = $children.length; i < length; i++) {
				height += $children.eq(i).height();
			}
			$target.attr('data-flex', 'down');
			$target.css({
				height : height + 'px'
			});
			$target.addClass(contentClassName);
			$target.attr('data-height', height);
		}, function() {
			var $this = $(this),
			$target = $this.find('.drawer-content');
			$target.attr('data-flex', 'up');
			$target.addClass('drawer-transition');
			$target.css({
				height : 0
			});
			$target.attr('data-height', 0);
		});
		
		$('.drawer-content').bind(eventObj.transitionEvent.end, function() {
			var $this = $(this),
			preDirction = $this.attr('data-flex'),
			flexHeight = 0,
			maxHeight = MAX_FLEX_HEIGHT,
			// 每一帧增加的伸缩量
			unitFlex = 3;
			$this.removeClass('drawer-transition');
			
			// 添加最后的伸缩效果	preDirction	绑定的上一次运动方向
			(function($this, preDirction) {
				var direction = $this.attr('data-flex'),
				height = parseFloat($this.attr('data-height'));
				// 如果方向不一样，需要重新开始
				if(direction != preDirction) {
					flexHeight = 0;
					maxHeight = MAX_FLEX_HEIGHT;
				}
				// 还需要对比dom
				if(direction == 'up') {
					height = 0;
				}
				flexHeight += unitFlex;
				if(flexHeight <= maxHeight) {
					$this.css({
						height : height + flexHeight
					});
					requestAnimationFrame(arguments.callee.bind(this, $this, direction));
				} else {
					maxHeight /= 2;
					// 每次伸缩量 >= maxHeight都需要将最大伸缩量/2
					if(maxHeight > 1) {
						flexHeight = 0;
						requestAnimationFrame(arguments.callee.bind(this, $this, direction));
					} else {
						// 最大伸缩量<=1时，彻底停止动画
						$this.addClass('drawer-transition');
						// 限制条件：$this.height() <= FLEX_HEIGHT，菜单条收缩状态
						if(direction == 'up' && $this.height() <= MAX_FLEX_HEIGHT) {
							$this.removeClass(contentClassName);
						}
					}
				}
			})($this, preDirction);
			
		});
	},*/
	/*Drawer : function(data) {
		var $this = $(this),
		data = data || [],
		html = '<ul class="drawer-menu">';
		
		data.forEach(function(item, index) {
			html += '<li class="drawer-head center">'
					+ '<a class="drawer-item-title">' + (item.title || '') + '</a>'
					+ '<div class="drawer-slider-container">'
						+ '<ul class="drawer-slider">';
			var sliderItems = item.data || [];
			sliderItems.forEach(function(item, index) {
				html += '<li class="drawer-slider-item" data-value="' + (item.value || '') + '">' + item.title + '</li>';
			});
			html += '</ul>'
					+ '<div class="drawer-flex"></div>'
				+ '</div>'
			+ '</li>';
		});
		html += '</ul>';
		$this.html(html);
	},
	Progress : function(opt) {
		var param = {
			// 节点内容
			data : [],
			// 进度条样式名
			barClassName : '',
			// 进度条节点样式名
			barNodeClassName : '',
			// 起点（节点位置）	int
			from : 0,
			// 终点（节点位置）	int
			to : 0
		},
		$this = $(this);
		param = $.extend(true, param, opt);
		
		var html = '',
		data = param.data,
		length = data.length;
		for(var i = 0; i < length; i++) {
			// -------------------------------------------------------
			html += '';
		}
	}*/
});

$(function() {
	/*$('#drawer').Drawer(
		[{
			title : '第一个抽屉',
			data : [{
				title : '内容1',
				value : '1-1'
			}, {
				title : '内容2',
				value : '1-2'
			}, {
				title : '内容3',
				value : '3-1'
			}, {
				title : '内容4',
				value : '4-2'
			}, {
				title : '内容5',
				value : '5-1'
			}, {
				title : '内容6',
				value : '6-2'
			}]
		}, {
			title : '第二个抽屉',
			data : [{
				title : '内容1',
				value : '2-1'
			}, {
				title : '内容2',
				value : '2-2'
			}]
		}, {
			title : '第三个抽屉',
			data : [{
				title : '内容1',
				value : '3-1'
			}, {
				title : '内容2',
				value : '3-2'
			}]
		}, {
			title : '第四个抽屉',
			data : [{
				title : '内容1',
				value : '4-1'
			}, {
				title : '内容2',
				value : '4-2'
			}]
		}, {
			title : '第五个抽屉',
			data : [{
				title : '内容1',
				value : '5-1'
			}, {
				title : '内容2',
				value : '5-2'
			}]
		}, {
			title : '第六个抽屉',
			data : [{
				title : '内容1',
				value : '6-1'
			}, {
				title : '内容2',
				value : '6-2'
			}]
		}]
	);*/
	
	/*$(document).bind('visibilitychange', function(e) {
		console.log('visibilitychange');
	});*/
	
});

/*(function() {
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

var eventObj = witchEvent();

$(document.body).on('dblclick', 'input[type="checkbox"],input[type="radio"]', function() {
	// 解决IE下 checkbox、radio双击延迟问题
	if(window.ActiveXObject || 'ActiveXObject' in window) {
		$(this).click();
	}
});

$('#result').bind('click', function() {
	var rect = $('.component')[0].getBoundingClientRect(),
	$tip = $('#tip');
	$tip.css({
		top : rect.bottom - $tip.height(),
		left : rect.right - $tip.width(),
		transform : 'scale(1)'
	});
});*/

$(function() {
	$('#input').on('input', function() {
		console.log($(this).val());
	});
	
	$('.hover-test').hover(function(e) {
		console.log(e.type, e.target);
	});
	
	$(document.body).bind('keydown', function(e) {
		var code = e.keyCode;
		if(code == 37) {
			$('#transition-color').css({
				background : '#fff'
			});
		} else if (code == 39) {
			$('#transition-color').css({
				background : '#000'
			});
		}
	});
});