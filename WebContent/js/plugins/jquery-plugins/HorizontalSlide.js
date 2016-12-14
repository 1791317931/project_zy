/**
 * 2016-9-25
 * 水平滑动
 * 需要注意sliderBody必须包含.slider-item,插件初始化后没有设置.footer-item.on，可以在renderCallback中设置
 * horizontal-slide.css
 * <div class="horizontal-slide"></div>
 * $('.horizontal-slide').HorizontalSlide({
		sliderHeader : '水平滑动',
		sliderBody : '<div class="slider-item">1</div><div class="slider-item">2</div>',
		clickCallback : function() {},
		renderCallback : function() {},
		closeCallback : function() {}
   });
 */

(function() {
	function HorizontalSlide(opt) {
		var $this = this,
		param = {
			// 显示左右箭头
			showArrow : true,
			showFooter : true,
			// 标题
			sliderHeader : '',
			// 滚动区域内容片段	<div class="slider-item">1</div><div class="slider-item">2</div><div class="slider-item">3</div>
			sliderBody : '',
			// 每次translateX后执行回调
			clickCallback : $.noop,
			// 每个$this执行完HorizontalSlide后执行回调
			renderCallback : $.noop,
			// 关闭modal回调
			closeCallback : $.noop
		};
		
		param = $.extend(true, param, opt);
		var showArrow = param.showArrow,
		showFooter = param.showFooter,
		sliderHeader = param.sliderHeader,
		sliderBody = param.sliderBody,
		clickCallback = param.clickCallback,
		renderCallback = param.renderCallback,
		closeCallback = param.closeCallback,
		v = ZUtil.v.replace(/\./g, '-');
		
		$this.each(function(index, item) {
			var $item = $(item),
			$sliderContainer = $item.find('.horizontal-slider-' + v);
			if(!$sliderContainer.length) {
				(function($item) {
					var index = 0,
					html = '<div class="horizontal-slider horizontal-slider-' + v + ' relative">'
							+ '<div class="slider-header">' + sliderHeader + '</div>'
							+ '<div class="slider-body">'
								+ '<div class="slider-content clearfix">' + sliderBody + '</div>'
							+ '</div>'
							+ (showFooter ? '<div class="slider-footer"><div class="footer-content clearfix"><div class="footer-content-body"></div></div></div>' : '')
							+ '<div class="slider-close"></div>'
							+ '<div class="triangle-left-container' + (!showArrow ? ' hide' : '') + '">'
								+ '<div class="triangle">'
									+ '<div class="triangle-first"></div>'
									+ '<div class="triangle-second"></div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="triangle-right-container' + (!showArrow ? ' hide' : '') + '">'
								+ '<div class="triangle">'
									+ '<div class="triangle-first"></div>'
									+ '<div class="triangle-second"></div>'
								+ '</div>'
							+ '</div>'
						+ '</div>';
					$item.html(html);
					$sliderContainer = $item.find('.horizontal-slider-' + v);
					var $header = $sliderContainer.find('.slider-header'),
					$sliderBody = $sliderContainer.find('.slider-body'),
					$sliderContent = $sliderBody.find('.slider-content'),
					$sliderItems = $sliderBody.find('.slider-item'),
					$footer = $sliderContainer.find('.slider-footer'),
					$footerItems,
					$close = $sliderContainer.find('.slider-close'),
					$triangleLeft = $sliderContainer.find('.triangle-left-container'),
					$triangleRight = $sliderContainer.find('.triangle-right-container'),
					triangleLeftRect = ZUtil.getRect($triangleLeft),
					triangleRightRect = ZUtil.getRect($triangleRight),
					triangleLeftOffsetObj = ZUtil.getOffset($triangleLeft, $sliderContainer[0]),
					headerRect = ZUtil.getRect($header),
					footerRect = ZUtil.getRect($footer),
					width = $sliderItems.eq(0).width();
					
					$sliderBody.css({
						height : $item.height() - headerRect.height - footerRect.height
					});
					$sliderContent.css({
						width : width * $sliderItems.length
					});
					
					$close.bind('click', function() {
						$sliderContainer.parent().addClass('hide');
						closeCallback();
						return false;
					});
					
					function goTo() {
						if(!index) {
							$triangleLeft.addClass('disabled');
						} else {
							$triangleLeft.removeClass('disabled');
						}
						if(index == $sliderItems.length - 1) {
							$triangleRight.addClass('disabled');
						} else {
							$triangleRight.removeClass('disabled');
						}
						if(showFooter) {
							$footerItems.removeClass('on').eq(index).addClass('on');
						}
						translateX = 'translateX(-' + (index * width) + 'px)';
						$sliderContent.css({
							'transform' : translateX,
							'-webkit-transform' : translateX,
							'-moz-transform' : translateX,
							'-ms-transform' : translateX
						});
						// 每次translateX执行回调方法
						clickCallback(index, $sliderItems.length);
					}
					
					// 设置左右箭头
					if(showArrow) {
						if(!index) {
							$triangleLeft.addClass('disabled');
						}
						if(index == $sliderItems.length - 1) {
							$triangleRight.addClass('disabled');
						}
						$triangleLeft.bind('click', function() {
							var $this = $(this);
							if(!$this.hasClass('disabled')) {
								index--;
								goTo();
							}
						});
						
						$triangleRight.bind('click', function() {
							var $this = $(this);
							if(!$this.hasClass('disabled')) {
								index++;
								goTo();
							}
						});
					}
					
					if(showFooter) {
						var length = $sliderItems.length,
						$footerContentBody = $footer.find('.footer-content-body'),
						footerHtml = '';
						for(var i = 0; i < length; i++) {
							footerHtml += '<div class="footer-item" data-index="' + i + '">' + (i + 1) + '</div>';
						}
						$footerContentBody.html(footerHtml);
						$footerItems = $footer.find('.footer-item');
						$footerItems.bind('click', function() {
							$this = $(this);
							if(!$this.hasClass('on')) {
								index = parseInt($this.attr('data-index'));
								goTo();
							}
						});
					}
					renderCallback(index, $sliderItems.length);
				})($item);
			}
		});
	}
	
	$.fn.extend({
		HorizontalSlide : HorizontalSlide
	});
})();