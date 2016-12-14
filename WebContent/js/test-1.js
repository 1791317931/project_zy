$(function() {
	
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
	
	$('.nav-container .nav div').bind('mouseover', function() {
		var $this = $(this),
		index = $this.index(),
		$i = $('.index-container .sub-container .index'),
		animationObj = {
			0 : 'animation-nav-zero',
			1 : 'animation-nav-first',
			2 : 'animation-nav-second',
			3 : 'animation-nav-third',
			4 : 'animation-nav-fourth',
			5 : 'animation-nav-fifth'
		};
		for(var i in animationObj) {
			$i.removeClass(animationObj[i]);
		}
		$i.addClass(animationObj[index]);
	});
	
	$('.nav-container .nav').bind('mouseout', function() {
		var $i = $('.index-container .sub-container .index'),
		$div = $('.nav-container .nav .on'),
		index = $div.index(),
		animationObj = {
			0 : 'animation-nav-zero',
			1 : 'animation-nav-first',
			2 : 'animation-nav-second',
			3 : 'animation-nav-third',
			4 : 'animation-nav-fourth',
			5 : 'animation-nav-fifth'
		};
		for(var i in animationObj) {
			$i.removeClass(animationObj[i]);
		}
		$i.addClass(animationObj[index]);
	});
	
	// chrome兼容'-'，ie不支持，可以将'-'替换为'/'
//	alert(new Date('2016-6-26 7:00:11'.replace(/-/g, '/')).getTime());
	
	// ----------多米诺骨牌------------------------
	function initDoninoState() {
		this.init = function() {
			$('.donino-stage .cuboid').each(function(i, item) {
				var $rect = $(item);
				/*$rect.removeClass('animation-donino-state-1 animation-donino-state-3').css({
					transform : 'rotateY(-90deg) translateX(-300px) translateZ(10px)',
					'-webkit-transform' : 'rotateY(-90deg) translateX(-300px) translateZ(10px)',
					'-moz-transform' : 'rotateY(-90deg) translateX(-300px) translateZ(10px)'
				});*/
				$rect.removeClass('animation-donino-state-1 animation-donino-state-2 animation-donino-state-3').css({
					transform : 'rotateY(-90deg) translateX(-300px) translateZ(10px) rotateX(0deg)',
					'-webkit-transform' : 'rotateY(-90deg) translateX(-300px) translateZ(10px) rotateX(0deg)',
					'-moz-transform' : 'rotateY(-90deg) translateX(-300px) translateZ(10px) rotateX(0deg)'
				});
			});
		}
	}

	var donino = new initDoninoState();
	donino.init();
	
	$('.donino-container .donino-stage').bind('click', function() {
		var $rects = $('.donino-stage .cuboid'),
		i = 0,
		length = $rects.length;
		(function() {
			var callee = arguments.callee;
			if(i >= length) {
				return false;
			}
			animationEvent && $rects[i].addEventListener(animationEvent.end, function() {
				(function(index) {
					if(index == length - 1) {
						return false;
					}
					$($rects[index]).css({
						'transform' : 'rotateY(-90deg) translateX(-300px) translateZ(10px) rotateX(20deg)',
						'-webkit-transform' : 'rotateY(-90deg) translateX(-300px) translateZ(10px) rotateX(20deg)',
						'-moz-transform' : 'rotateY(-90deg) translateX(-300px) translateZ(10px) rotateX(20deg)'
					}).addClass('animation-donino-state-2');
				})(i);
				i++;
				callee();
			});
			if(i < length - 1) {
				$($rects[i]).addClass('animation-donino-state-1');
			} else {
				// 最后一个木板直接加速倒地
				$($rects[i]).addClass('animation-donino-state-3');
			}
		})();
	}).hover($.noop, donino.init);
	// ----------多米诺骨牌------------------------
	
	//-------------------画廊--------------------
	// -----------------点击.gallery-container .gallery-stage--------------
	$('.gallery-container .gallery-stage').bind('mousedown', function(e) {
		if(e.target.className == 'pole') {
			$('.gallery-container .gallery-stage .rect-door .pole').click();
			return false;
		}
		var $stage = $(this),
		x = e.clientX,
		y = e.clientY,
		perspective = $stage.css('-webkit-perspective') || $stage.css('-moz-perspective') || $stage.css('-webkit-perspective'),
		perspective = new Number(perspective.replace('px', '')),
		button = e.button;
		$stage.data({
			x : x,
			y : y
		});
		if(button == 0 || button == 1) {
			perspective += 30;
		} else {
			perspective -= 30;
		}
		$stage.css({
			'perspective' : perspective,
			'-webkit-perspective' : perspective,
			'-moz-perspective' : perspective
		});
	}).bind('contextmenu', function() {
		return false;
	});
	
	$('.gallery-container .gallery-stage .rect-door .pole').bind('click', function() {
		var $door = $('.gallery-container .gallery-stage .rect-door'),
		yDeg = $door.data().yDeg || 0;
		$door.data({
			yDeg : ++yDeg
		});
		$door.css({
			'transform' : 'rotateY(' + yDeg + 'deg)',
			'-webkit-transform' : 'rotateY(' + yDeg + 'deg)',
			'-moz-transform' : 'rotateY(' + yDeg + 'deg)'
		});
	});
	// -----------------点击.gallery-container .gallery-stage--------------
	
	// -----------------点击按钮---------------------------------------------
	$('.gallery-option button').bind('click', function(e) {
		var $button = $(this);
		if($button.hasClass('in') || $button.hasClass('out')) {
			var $gallery = $('.gallery-container .gallery-stage .gallery'),
			z = $gallery.data().z;
			if(z === undefined) {
				z = -300;
			}
			if($button.hasClass('in')) {
				z += 20;
			} else {
				z -= 20;
			}
			$gallery.css({
				'transform' : 'translateZ(' + z + 'px)',
				'-webkit-transform' : 'translateZ(' + z + 'px)',
				'-moz-transform' : 'translateZ(' + z + 'px)'
			}).data({
				z : z
			});
		}
		// ff中出现抖动---BUG
		if($button.hasClass('open') || $button.hasClass('close')) {
			var $door = $('.gallery-container .gallery-stage .rect-door'),
			yDeg = $door.data().yDeg || 0;
			if($button.hasClass('open')) {
				yDeg += 5;
			} else {
				yDeg -= 5;
			}
			$door.data({
				yDeg : yDeg
			});
			$door.css({
				'transform' : 'rotateY(' + yDeg + 'deg)',
				'-webkit-transform' : 'rotateY(' + yDeg + 'deg)',
				'-moz-transform' : 'rotateY(' + yDeg + 'deg)'
			});
		}
		if($button.hasClass('to-left') || $button.hasClass('to-right')) {
			var $stage = $('.gallery-container .gallery-stage'),
			x = $stage.data().x || 50,
			y = $stage.data().y || 50;
			if($button.hasClass('to-left')) {
				x -= 5;
			} else {
				x += 5;
			}
			$stage.data({
				x : x,
				y : y
			});
			$stage.css({
				'perspective-origin' : x + '% ' + y + '%',
				'-webkit-perspective-origin' : x + '% ' + y + '%',
				'-moz-perspective-origin' : x + '% ' + y + '%'
			});
		}
	});
	// -----------------点击按钮---------------------------------------------
	
	// -------------------纯动画--------------------------------------------
	(function() {
		var $gallery = $('.gallery-container .gallery-stage .gallery'),
		$stage = $('.gallery-container .gallery-stage'),
		$door = $('.gallery-container .gallery-stage .rect-door');
		animationEvent && $gallery[0].addEventListener(animationEvent.end, function() {
			if($door.hasClass('open-door')) {
				// 相同的动画类型，必须保存之前动画的状态
				if(!$gallery.hasClass('walk-in-gallery')) {
					$gallery.css({
						'transform' : 'translateZ(80px)',
						'-webkit-transform' : 'translateZ(80px)',
						'-moz-transform' : 'translateZ(80px)'
					}).addClass('walk-in-gallery');
				} else if (!$gallery.hasClass('to-left-door-1')) {
					// 进入房间内后将.gallery-container .gallery-stage .back-wall做为face-door的外露墙体
					$('.gallery-container .gallery-stage .back-wall').css({
						display : 'block'
					});
					$gallery.css({
						'transform' : 'translateZ(310px)',
						'-webkit-transform' : 'translateZ(310px)',
						'-moz-transform' : 'translateZ(310px)'
					}).addClass('to-left-door-1');
					$stage.css({
						'perspective-origin' : '90% 50%',
						'-webkit-perspective-origin' : '90% 50%',
						'-moz-perspective-origin' : '90% 50%'
					}).addClass('to-left-door-2');
				} else if (!$gallery.hasClass('along-face-door-to-center')) {
					$gallery.css({
						'transform' : 'translateZ(310px) rotateY(-90deg)',
						'-webkit-transform' : 'translateZ(310px) rotateY(-90deg)',
						'-moz-transform' : 'translateZ(310px) rotateY(-90deg)'
					}).addClass('along-face-door-to-center');
				} else if (!$gallery.hasClass('right-to-back-door')) {
					$gallery.css({
						'transform' : 'translateZ(550px) rotateY(-90deg)',
						'-webkit-transform' : 'translateZ(550px) rotateY(-90deg)',
						'-moz-transform' : 'translateZ(550px) rotateY(-90deg)'
					}).addClass('right-to-back-door');
				} else if (!$gallery.hasClass('face-to-back-door')) {
					$gallery.css({
						'transform' : 'translateZ(310px) rotateY(0deg)',
						'-webkit-transform' : 'translateZ(310px) rotateY(0deg)',
						'-moz-transform' : 'translateZ(310px) rotateY(0deg)'
					}).addClass('face-to-back-door');
				} else if (!$gallery.hasClass('right-to-right-door')) {
					$gallery.css({
						'transform' : 'translateZ(1050px) rotateY(0deg)',
						'-webkit-transform' : 'translateZ(1050px) rotateY(0deg)',
						'-moz-transform' : 'translateZ(1050px) rotateY(0deg)'
					}).addClass('right-to-right-door');
				} else if (!$gallery.hasClass('face-to-right-door')) {
					$gallery.css({
						'transform' : 'rotateY(90deg) translateX(50px) translateZ(550px)',
						'-webkit-transform' : 'rotateY(90deg) translateX(50px) translateZ(550px)',
						'-moz-transform' : 'rotateY(90deg) translateX(50px) translateZ(550px)'
					}).addClass('face-to-right-door');
				} else if (!$gallery.hasClass('right-to-face-door')) {
					$gallery.css({
						'transform' : 'rotateY(90deg) translateX(-700px) translateZ(550px)',
						'-webkit-transform' : 'rotateY(90deg) translateX(-700px) translateZ(550px)',
						'-moz-transform' : 'rotateY(90deg) translateX(-700px) translateZ(550px)'
					}).addClass('right-to-face-door');
				}else if (!$gallery.hasClass('face-to-face-door')) {
					$gallery.css({
						'transform' : 'rotateY(180deg) translateX(-550px) translateZ(550px)',
						'-webkit-transform' : 'rotateY(180deg) translateX(-550px) translateZ(550px)',
						'-moz-transform' : 'rotateY(180deg) translateX(-550px) translateZ(550px)'
					}).addClass('face-to-face-door');
				} else if (!$gallery.hasClass('out-gallery')) {
					// 出房间后将.gallery-container .gallery-stage .face-wall做为face-door的外露墙体
					$('.gallery-container .gallery-stage .back-wall').css({
						display : 'none'
					});
					$gallery.css({
						'transform' : 'rotateY(180deg) translateX(-550px) translateZ(-600px)',
						'-webkit-transform' : 'rotateY(180deg) translateX(-550px) translateZ(-600px)',
						'-moz-transform' : 'rotateY(180deg) translateX(-550px) translateZ(-600px)'
					}).addClass('out-gallery');
				} else if (!$gallery.hasClass('turn-back-to-face-door')) {
					$gallery.css({
						'transform' : 'rotateY(180deg) translateX(-1200px) translateZ(-300px)',
						'-webkit-transform' : 'rotateY(180deg) translateX(-1200px) translateZ(-300px)',
						'-moz-transform' : 'rotateY(180deg) translateX(-1200px) translateZ(-300px)'
					}).addClass('turn-back-to-face-door');
				} else if (!$door.hasClass('close-door')) {
					$door.css({
						'transform' : 'rotateY(100deg)',
						'-webkit-transform' : 'rotateY(100deg)',
						'-moz-transform' : 'rotateY(100deg)'
					}).addClass('close-door');
				}
			} else {
				$stage.css({
					'transform' : 'translateZ(0px)',
					'-webkit-transform' : 'translateZ(0px)',
					'-moz-transform' : 'translateZ(0px)'
				}).addClass('turn-right');
			}
		});
		animationEvent && $stage[0].addEventListener(animationEvent.end, function(e) {
			// 因为.gallery-container .gallery-stage .gallery执行动画的时候
			// 它的父级.gallery-container .gallery-stage也在执行动画，dom包含关系
			// 需要判断事件源
			if(e.target.className == 'gallery-stage turn-right') {
				$door.addClass('open-door');
			}
		});
		$gallery.addClass('to-gallery');
	})();
	// -------------------纯动画--------------------------------------------
	//-------------------画廊--------------------
	
	$('.delete-img-container .img-container img').bind('click', function() {
		var $img = $(this),
		$nextAllImgs = $img.nextAll('img');
		transitionEvent && this.addEventListener(transitionEvent.end, function() {
			$img.remove();
		});
		$img.css({
			height : 0,
			width : 0,
			opacity : 0
		});
	});
	
});