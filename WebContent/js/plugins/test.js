$(function() {
	
	var minHeight = window.innerHeight - (parseFloat($(document.body).css('padding-top')) || 0) - 5,
	$menu = $('.menu');
	$('.content-body').css({
		'min-height' : minHeight
	});
	$menu.css({
		height : minHeight
	}).SimulateScroll({
		unit : 10,
		bodyScrollable : false
	});
	
	var linearGradients = ['linear-gradient-orange', 'linear-gradient-orange', 'linear-gradient-blue'],
	random = Math.floor(Math.random() * 3);
	$(document.body).addClass(linearGradients[random]);
	
	$('.menu li').bind('click', function() {
		var $this = $(this),
		type = $this.attr('data-type');
		if(!$this.hasClass('active')) {
			$('li.active').removeClass('active');
			$('.content-body-item.active').removeClass('active');
			$this.addClass('active');
			$('.content-body-item[data-type="' + type + '"]').addClass('active');
			ZUtil.setItem('data-type', type);
		}
	});
	
	// 百分比
	$('li[data-type="circle-progress"]').bind('click', function() {
		$('.circle-progress').CircleProgress({
			value : Math.ceil(100 * Math.random())
		});
	});
	
	// 图片裁剪
	$('.clip-image-container').ClipImage({
//		mode : 'circle',
//		fixed : true
		imageTypeCheckUrl : ctx + 'upload/checkImageType',
		url : ctx + 'uploadAction!upload'
//		errorTypeCallback : 'xxx'
	});
	
//	$('.edit-view-container').EditViewForProgrammer();
	
	// 水平滑动
	$('li[data-type="horizontal-slide"]').one('click', function() {
		var $horizontalSlide = $('.horizontal-slide'),
		mode = 'modal';
		$horizontalSlide.HorizontalSlide({
			sliderHeader : '水平滑动',
			sliderBody : '<div class="slider-item">1</div><div class="slider-item">2</div><div class="slider-item">3</div><div class="slider-item">4</div>',
//			showArrow : false,
//			showFooter : false,
//			isAnimation : false,
			mode : mode,
			renderCallback : function() {
				$('.footer-item').eq(0).click();
				if(mode != 'modal') {
					$horizontalSlide.css({
						border : '1px solid red'
					});
				}
			},
			modalCallback : function() {
				console.log('xxxx');
			}
		});
		if(mode == 'modal') {
			$('#horizontal-slide-btns').removeClass('hide');
			$('#horizontal-slide-btns button').bind('click', function() {
				$('.horizontal-slider').closest('.z-modal').trigger('show', true);
			});
		}
	});
	
	// select联动
	$('.linked-select-container').LinkedSelect({
		selects : [{
			defaultText : '请选择省份',
			labelText : '省份：',
			selectClassName : 'mr10',
			change : function($nextSelect, nextIndex, value) {
				console.log(value);
			}
		}, {
			defaultText : '请选择城市',
			labelText : '城市：',
			labelClassName : 'xxx',
			change : function($curSelect, index, value) {
				console.log(value);
			}
		}],
		renderCallback : function($selects) {
			$selects.append('<option value="1">四川</option><option value="2">北京</option>');
		}
	});
	
	// mask
	var $mask;
	$('li[data-type="mask"]').bind('click', function() {
		if($mask) {
			$mask.removeClass('hide');
		}
		$('.menu').Mask({
//			mode : 'circle'
		});
	});
	$(document.body).on('click', '.mask', function() {
		$mask = $(this);
		$mask.addClass('hide');
	});
	
	// page visibility
	var $visibilityContainer = $('.page-visibility'),
	documentState = ZUtil.getDocumentState();
	$.fn.PageVisibilityChange({
		hideCallback : function() {
			var date = new Date(),
			msg = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			$('.page-visibility').append('<div>' + msg + ' 离开页面<div>');
		},
		showCallback : function() {
			var date = new Date(),
			msg = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			$('.page-visibility').append('<div>' + msg + ' 进入页面</div>');
		}
	});
	
	// progress
	var $progress = $('.progress'),
	$previousButton = $('#previous'),
	$nextButton = $('#next'),
	$currentFlag = $('#current-flag');
	$progress.ProgressBar({
		data : [1, 2, 3, 4, 5],
		callback : function(to) {
			$currentFlag.html(to);
		}
	});
	$previousButton.bind('click', function() {
		$progress.trigger('previousStep');
	});
	$nextButton.bind('click', function() {
		$progress.trigger('nextStep');
	});
	$('li[data-type="progress-bar"]').bind('click', function() {
		$progress.trigger('toStep', Math.floor(Math.random() * 6));
	});
	
	// record
	$('.textarea').Record({
		length : 20
	});
	
	// clear
	$('.clear').bind('click', function() {
		$(this).prev('input').val('');
	});
	
	// show stage
	var $stageRect = $('.stage-rect');
	$stageRect.ShowStage({
		mode : 'right-to-left',
		closeCallback : function() {
			console.log('xxx');
		}
	});
	$('li[data-type="show-stage"]').bind('click', function() {
		$stageRect.trigger('show');
	});
	$('#show-stage-btns button').bind('click', function() {
		$stageRect.trigger('show', $(this).attr('id'));
	});
	
	// simulate scroll
	$('.scroller').SimulateScroll({
		unit : 10,
		bodyScrollable : false
	});
	var $wrapper = $('.scroll-wrapper').eq(2);
	$('#add-head').bind('click', function() {
		$wrapper.prepend('<div>我今富士康的房间了圣诞节发大水了看法老大数据菲利克344监考老师减肥了开始减肥了开始的减肥了的经费斯</div>');
	});
	$('#add-bottom').bind('click', function() {
		$wrapper.append('<div>我今富士康的房间了圣诞节发大水了看法老大数据菲利克344监考老师减肥了开始减肥了开始的减肥了的经费斯</div>');
	});
	$('#delete-head').bind('click', function() {
		$wrapper.find('div').eq(0).remove();
	});
	$('#delete-bottom').bind('click', function() {
		$divs = $wrapper.find('div');
		$divs.eq($divs.length - 1).remove();
	});
	
	// star
	$('.star-container').Star();
	
	// switch
	$('#switch-0,#switch-1').Switch({
		data : ['男', '女']
	});
	
	// tip
	$.fn.Tip({
		offset : 0
	});
	
//	ZUtil.error();
//	ZUtil.success();
	
	$uploadFile = $('#upload');
	$uploadFile.UploadFile({
		multiple : true,
		uploadUrl : ctx + 'uploadAction!upload.action'
	});
	$('#to-upload-file').bind('click', function() {
		$uploadFile.trigger('show');
	});
	
	(function() {
		var type = ZUtil.getItem('data-type');
		if(type) {
			$('li[data-type="' + type + '"]').click();
		} else {
			$('.menu li').eq(0).click();
		}
	})();
	
});