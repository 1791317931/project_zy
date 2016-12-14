/**
 * 固定dom高度	模拟滚动条
 */

(function() {
	function FixHeight(opt) {
		var $containers = $(this),
		innerHeight = window.innerHeight,
		param = {
			scrollY : true,
			mouseWheel : true
		},
		selector = $containers.selector;
		
		param = $.extend(true, opt, param);
		
		$containers.each(function(index, item) {
			var $container = $(item),
			rect = ZUtil.getRect($container),
			top = rect.top;
			
			$container.css({
				height : innerHeight - top - 20,
				overflow : 'hidden'
			});
			setTimeout(function() {
				new IScroll(selector, param);
			});
		});
	}
	
	$.fn.extend({
		FixHeight : FixHeight
	});
})();