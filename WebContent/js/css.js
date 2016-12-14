$(function() {
	
	$('#changeImg').bind('click', function() {
		var $this = $(this),
		$img1 = $this.siblings('.img-container').find('img.first-img'),
		$img2 = $this.siblings('.img-container').find('img.second-img'),
		imgs = ['../imgs/1.png', '../imgs/2.png'],
		src1 = $img1.attr('src'),
		src2 = $img2.attr('src');
		if(!src1 || !src2) {
			var img = new Image();
			img.onload = function() {
				!src1 && !src2 && $img1.attr('src', imgs[0]);
				if(src1 && !src2) {
					$img2.attr('src', imgs[1]);
					$img2.addClass('animation-rotateY-180-to-360 active');
					// 第一次隐藏的时候旋转180deg
					$img1.addClass('animation-rotateY-0-to-180 animation-fade-out rotateY-180');
				}
			};
			img.onerror = function() {
				alert('异常');
			}
			if(!src1) {
				img.src = imgs[0];
			} else {
				img.src = imgs[1];
			}
		} else {
			var $img = $this.siblings('.img-container').find('img.active'),
			$targetImg = $img.siblings('img');
			$targetImg.removeClass('animation-fade-out animation-rotateY-0-to-180').addClass('animation-rotateY-180-to-360 active');
			$img.addClass('animation-rotateY-180-to-360 animation-fade-out').removeClass('animation-rotateY-180-to-360 active');
		}
	});
	
	// 兼容webkit、moz、ms
	$('#change-img-circle').bind('click', function() {
		var $this = $(this),
		$coverDiv = $this.siblings('.img-circle-container').find('.cover'),
		intervalTime = 50,
		radiusWhite = 10,
		radiusOrange = 20;
		$coverDiv.removeClass('hidden');
		setTimeout(function() {
			$coverDiv.css('background', '-webkit-radial-gradient(ellipse farthest-corner, #fff ' + radiusWhite + '%, #ff7d00 ' + radiusOrange + '%)');
			!$coverDiv.css('background') && $coverDiv.css('background', '-moz-radial-gradient(ellipse farthest-corner, #fff ' + radiusWhite + '%, #ff7d00 ' + radiusOrange + '%)');
			!$coverDiv.css('background') && $coverDiv.css('background', '-ms-radial-gradient(ellipse farthest-corner, #fff ' + radiusWhite + '%, #ff7d00 ' + radiusOrange + '%)');
			radiusWhite += 10,
			radiusOrange += 10;
			if(radiusWhite <= 100) {
				setTimeout(arguments.callee, intervalTime);
			} else {
				$coverDiv.addClass('hidden');
			}
		}, intervalTime);
	});
	
	function whichAnimationEvent() {
		var a, element = document.createElement('div'),
		animations = {
			animation : {
				start : 'animationstart',
				end : 'animationend',
				iteration : 'animationiteration'
			},
			WebkitAnimation : {
				start : 'webkitAnimationStart',
				end : 'webkitAnimationEnd',
				iteration : 'webkitAnimationIteration'
			}
		}, style = element.style;
		for(a in animations) {
			if(style[a] != undefined) {
				return animations[a];
			}
		}
	}
	
	var animationEvent = whichAnimationEvent(),
	flag = false;
	$('#changeOpacity').bind('click', function() {
		var $this = $(this),
		$img = $this.siblings('img'),
		text = $this.html();
		if($this.html() == '隐藏图片') {
			$this.html('显示图片');
			// 隐藏图片时需要先将图片透明度设置为1
			$img.removeClass('animation-fade-in opacity-0').addClass('animation-fade-out');
		} else {
			$this.html('隐藏图片');
			// 显示图片时需要先将图片透明度设置为0，不然opacity一直是1，0--->1是没有动画效果的
			$img.removeClass('animation-fade-out').addClass('animation-fade-in opacity-0');
		}
		if(!flag) {
			flag = true;
			animationEvent && $img[0].addEventListener(animationEvent.start, function() {
				console.log('动画开始');
			});
			animationEvent && $img[0].addEventListener(animationEvent.end, function() {
				console.log('动画完成');
			});
			animationEvent && $img[0].addEventListener(animationEvent.iteration, function() {
				console.log('动画重复');
			});
		}
	});
	
});