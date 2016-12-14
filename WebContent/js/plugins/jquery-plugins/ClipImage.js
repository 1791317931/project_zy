/**
 * 2016-10-20
 * ClipImage	裁剪图片
 * 原则上body上只能同时显示一个裁剪区域
 * form ==> input	含有data-name都会在取值的时候调用parseInt
 * 图片上传时一定要检测savePath和fileName是否设置
 * ie10+
 * $('.clip-image-container').ClipImage({
		url : 'xxx',
		mode : 'circle'
   });
 */

(function() {
	function ClipImage(opt) {
		var param = {
			// 模式	支持normal、circle
			mode : 'normal',
			// 是否可以缩放裁剪框大小
			fixed : false,
			// 全屏事件对象，如果是弹出层上传图片，最好设置modal层，这样不用将mouse事件绑定到body上
			fullscreenContainer : $(document.body),
			// 文件添加按钮
			uploadSelector : '.add-btn',
			// 保存按钮
			saveSelector : '.save-btn',
			sourceContainerSelector : '.source-container',
			previewContainerSelector : '.preview-container',
			// 原图
			sourceImageSelector : '.source-image',
			// 预览图片
			previewImageSelector : '.preview-image',
			url : ctx + '/upload/file/img/cut_save',
			accept : 'image/jpg,image/jpeg,image/png,image/bmp',
			// 默认1M
			size : 1,
			// 图片超出最大尺寸后，由于提示信息可能不同，所以调用外部方法
			sizeOver : $.noop,
			// 插件初始化完成后回调
			renderCallback : $.noop,
			// 没有图片回调
			emptyFileCallback : function() {
				Qm.warning('请上传图片');
			},
			errorTypeCallback : function(msg) {
				Qm.warning(msg);
			},
			// ajax beforeSend
			beforeSend : $.noop,
			// ajax complete
			complete : $.noop,
			// change事件回调
			uploadCallback : $.noop,
			// 图片上传之前校验，如果返回false阻止ajax	$form	file
			beforeCheck : $.noop,
			/**
			 * 通过该方法获取ajax data数据	$form	file
			 * 这里type=file取值时最好直接用file,否则上传的图片过大时会有bug
			 */
			getFormData : function($form, file) {
				var $inputs = $form.find('input'),
				formData = new FormData(),
				length = $inputs.length;
				for(var i = 0; i < length; i++) {
					var $input = $inputs.eq(i),
					name = $input.attr('name'),
					dataName = $input.attr('data-name');
					if($input.attr('type') != 'file') {
						var value = $input.val();
						if(!value) {
							if(name == 'savePath') {
								Qm.warning('图片保存路径不能为空');
							} else if (name == 'fileName') {
								Qm.warning('图片保存名称不能为空');
							}
							return false;
						}
						if(dataName) {
							value = parseInt(value);
						}
						formData.append(name, value);
					} else {
						if(!file || !$input[0].files.length) {
							emptyFileCallback();
							return false;
						}
						formData.append(name, file);
					}
				}
				return formData;
			},
			// 保存图片回调	data
			saveCallback : $.noop
		},
		v = ZUtil.getVersion();
		
		param = $.extend(true, param, opt);
		var mode = param.mode,
		fixed = param.fixed,
		fullscreenContainer = param.fullscreenContainer,
		uploadSelector = param.uploadSelector,
		saveSelector = param.saveSelector,
		sourceContainerSelector = param.sourceContainerSelector,
		previewContainerSelector = param.previewContainerSelector,
		sourceImageSelector = param.sourceImageSelector,
		previewImageSelector = param.previewImageSelector,
		url = param.url,
		accept = param.accept,
		size = param.size,
		sizeOver = param.sizeOver,
		renderCallback = param.renderCallback,
		emptyFileCallback = param.emptyFileCallback,
		errorTypeCallback = param.errorTypeCallback,
		uploadCallback = param.uploadCallback,
		beforeCheck = param.beforeCheck,
		beforeSend = param.beforeSend,
		complete = param.complete,
		getFormData = param.getFormData,
		saveCallback = param.saveCallback;
		
		this.each(function(index, item) {
			var $container = $(item);
			if($container.attr('data-inited') != 'Y') {
				$container.attr('data-inited', 'Y');
				var $upload = $container.find(uploadSelector),
				$save = $container.find(saveSelector),
				$sourceContainer = $container.find(sourceContainerSelector),
				$previewContainer = $container.find(previewContainerSelector),
				$sourceImage = $container.find(sourceImageSelector),
				$previewImage = $container.find(previewImageSelector),
				$form = $container.find('form'),
				$file = $form.find('input[data-name="file"]'),
				$x = $form.find('input[data-name="x"]'),
				$y = $form.find('input[data-name="y"]'),
				// 裁剪区域	宽高
				$w = $form.find('input[data-name="w"]'),
				$h = $form.find('input[data-name="h"]'),
				// 图片压缩后	宽高
				$fw = $form.find('input[data-name="fw"]'),
				$fh = $form.find('input[data-name="fh"]'),
				sourceFile,
				$clipContainer,
				$clipRect,
				$pointContainer,
				$points,
				$circle,
				$target,
				$clipModal,
				x,
				y,
				originX,
				originY;
				
				if(!$form.length) {
					$container.append('<form class="hide"></form>');
					$form = $container.find('form');
				}
				
				if(!$file.length) {
					$form.append('<input type="file" name="file" class="hide" accept="' + accept + '" data-name="file"/>');
					$file = $form.find('input[data-name="file"]');
				} else {
					$file.attr('accept', accept);
				}
				if(!$x.length) {
					$form.append('<input type="hidden" name="x" data-name="x"/>');
					$x = $form.find('input[data-name="x"]');
				}
				if(!$y.length) {
					$form.append('<input type="hidden" name="y" data-name="y"/>');
					$y = $form.find('input[data-name="y"]');
				}
				if(!$w.length) {
					$form.append('<input type="hidden" name="w" data-name="w"/>');
					$w = $form.find('input[data-name="w"]');
				}
				if(!$h.length) {
					$form.append('<input type="hidden" name="h" data-name="h"/>');
					$h = $form.find('input[data-name="h"]');
				}
				if(!$fw.length) {
					$form.append('<input type="hidden" name="finalWidth" data-name="fw"/>');
					$fw = $form.find('input[data-name="fw"]');
				}
				if(!$fh.length) {
					$form.append('<input type="hidden" name="finalHeight" data-name="fh"/>');
					$fh = $form.find('input[data-name="fh"]');
				}
				
				var html = '<div class="clip-container hide">'
							+ '<div class="clip-rect" data-version="' + v + '">'
								+ '<div class="point-container" data-version="' + v + '">'
									+ '<div class="left-top-point point" data-version="' + v + '"></div>'
									+ '<div class="top-point point" data-version="' + v + '"></div>'
									+ '<div class="right-top-point point" data-version="' + v + '"></div>'
									+ '<div class="right-point point" data-version="' + v + '"></div>'
									+ '<div class="right-bottom-point point" data-version="' + v + '"></div>'
									+ '<div class="bottom-point point" data-version="' + v + '"></div>'
									+ '<div class="left-bottom-point point" data-version="' + v + '"></div>'
									+ '<div class="left-point point" data-version="' + v + '"></div>'
									+ '<div class="circle hide" data-version="' + v + '"></div>'
								+ '</div>'
							+ '</div>'
						+ '</div>';
				$sourceContainer.append(html);
				$clipContainer = $sourceContainer.find('.clip-container');
				$clipRect = $clipContainer.find('.clip-rect');
				$pointContainer = $clipContainer.find('.point-container');
				$points = $pointContainer.find('.point');
				$circle = $pointContainer.find('.circle');
				
				if(mode == 'circle') {
					$circle.removeClass('hide');
				}
				if(fixed) {
					$points.remove();
				}
				
				// 本次move事件和上次move事件在x、y轴平移距离
				function getDiff(e) {
					var curX = e.clientX,
					curY = e.clientY,
					rect = ZUtil.getRect($sourceImage);
					// 超出.clip-container范围无效
					if(curY < rect.top) {
						curY = rect.top;
					}
					if(curY > rect.bottom) {
						curY = rect.bottom;
					}
					if(curX < rect.left) {
						curX = rect.left;
					}
					if(curX > rect.right) {
						curX = rect.right;
					}
					x = x || curX,
					y = y || curY;
					var diff = {
						x : curX - x,
						y : curY - y
					};
					x = curX;
					y = curY;
					return diff;
				}
				
				function moveClipRect(e) {
					var x = e.clientX,
					y = e.clientY,
					width,
					height;
					// 保证宽高不能为0
					if(Math.abs(x - originX) > 0 && Math.abs(y - originY) > 0) {
						var rect = ZUtil.getRect($sourceImage),
						imageWidth = $sourceImage.width(),
						imageHeight = $sourceImage.height(),
						previewWidth = $previewContainer.width(),
						previewHeight = $previewContainer.height(),
						rectWidth = $clipRect.width(),
						rectHeight = $clipRect.height();
						if(x < rect.left) {
							x = rect.left;
						}
						if(x > rect.right) {
							x = rect.right;
						}
						if(y < rect.top) {
							y = rect.top;
						}
						if(y > rect.bottom) {
							y = rect.bottom;
						}
						width = Math.abs(x - originX);
						height = Math.abs(y - originY);
						/**
						 * const percent = width / previewWidth = height / previewHeight 
						 */
						var percentW = width / previewWidth,
						percentH = height / previewHeight;
						// 先确定最后的宽高，以小的为标准
						if(percentW < percentH) {
							height = previewHeight * (width / previewWidth);
						} else {
							width = previewWidth * (height / previewHeight);
						}
						
						// 这里x、y可能有变化，因为上面已经调整了宽高
						if(x < originX) {
							x = originX - width;
						} else {
							x = originX + width;
						}
						if(y < originY) {
							y = originY - height;
						} else {
							y = originY + height;
						}
						
						var clipContainerRect = ZUtil.getRect($clipContainer),
						offsetLeft = Math.min(x, originX) - clipContainerRect.left,
						offsetTop = Math.min(y, originY) - clipContainerRect.top;
						$clipRect.css({
							width : width,
							height : height,
							'border-width' : offsetTop + 'px ' + (imageWidth - offsetLeft - width) + 'px ' + (imageHeight - offsetTop - height) + 'px ' + offsetLeft + 'px'
						});
						showClipImage();
						mode == 'circle' && moveCircle();
					}
				}
				
				function movePointContainer(e) {
					var diff = getDiff(e),
					rectWidth = $clipRect.width(),
					rectHeight = $clipRect.height(),
					imageWidth = $sourceImage.width(),
					imageHeight = $sourceImage.height(),
					borderTop = (parseFloat($clipRect.css('border-top-width')) || 0) + diff.y,
					borderLeft = (parseFloat($clipRect.css('border-left-width')) || 0) + diff.x;
					if(borderTop < 0) {
						borderTop = 0;
					}
					if(borderTop + rectHeight > imageHeight) {
						borderTop = imageHeight - rectHeight;
					}
					if(borderLeft < 0) {
						borderLeft = 0;
					}
					if(borderLeft + rectWidth > imageWidth) {
						borderLeft = imageWidth - rectWidth;
					}
					
					$clipRect.css({
						'border-width' : borderTop + 'px ' + (imageWidth - borderLeft - rectWidth) + 'px ' + (imageHeight - borderTop - rectHeight) + 'px ' + borderLeft + 'px'
					});
					showClipImage();
				}
				
				// 移动.circle
				function moveCircle() {
					var clipWidth = $pointContainer.width();
					$circle.css({
						'border-width' : clipWidth / 2
					});
				}
				
				// 移动8个点
				function movePoint(e) {
					var diff = getDiff(e),
					// border
					borderTop = parseFloat($clipRect.css('border-top-width')) || 0,
					borderRight = parseFloat($clipRect.css('border-right-width')) || 0,
					borderBottom = parseFloat($clipRect.css('border-bottom-width')) || 0,
					borderLeft = parseFloat($clipRect.css('border-left-width')) || 0,
					clipWidth = $clipRect.width(),
					clipHeight = $clipRect.height(),
					imageWidth = $sourceImage.width(),
					imageHeight = $sourceImage.height(),
					previewWidth = $previewContainer.width(),
					previewHeight = $previewContainer.height(),
					diffX = diff.x,
					diffY = diff.y,
					x = e.clientX,
					y = e.clientY,
					rect = ZUtil.getRect($sourceImage),
					resizable = false;
					
					/**
					 * const percent = clipWidth / previewWidth = clipHeight / previewHeight
					 */
					// .top-point,左下角固定
					if(diffY && $target.hasClass('top-point')) {
						clipHeight -= diffY;
						if(clipHeight < imageHeight && clipHeight > 0) {
							clipWidth = previewWidth * (clipHeight / previewHeight);
							if(borderLeft + clipWidth > imageWidth) {
								clipWidth = imageWidth - borderLeft;
								clipHeight = previewHeight * (clipWidth / previewWidth);
							}
							borderTop = imageHeight - clipHeight - borderBottom;
							borderRight = imageWidth- borderLeft - clipWidth;
							resizable = true;
						}
					}
					// .bottom-point,左上角固定
					if(diffY && $target.hasClass('bottom-point')) {
						clipHeight += diffY;
						if(clipHeight < imageHeight && clipHeight > 0) {
							clipWidth = previewWidth * (clipHeight / previewHeight);
							if(borderLeft + clipWidth > imageWidth) {
								clipWidth = imageWidth - borderLeft;
								clipHeight = previewHeight * (clipWidth / previewWidth);
							}
							borderRight = imageWidth - borderLeft - clipWidth;
							borderBottom = imageHeight - borderTop - clipHeight;
							resizable = true;
						}
					}
					// .left-point,右上角固定
					if(diffX && $target.hasClass('left-point')) {
						clipWidth -= diffX;
						if(clipWidth < imageWidth && clipWidth > 0) {
							clipHeight = previewHeight * (clipWidth / previewWidth);
							if(borderTop + clipHeight > imageHeight) {
								clipHeight = imageHeight - borderTop;
								clipWidth = previewWidth * (clipHeight / previewHeight);
							}
							borderBottom = imageHeight - borderTop - clipHeight;
							borderLeft = imageWidth - clipWidth - borderRight;
							resizable = true;
						}
					}
					// .right-point,左上角固定
					if(diffX && $target.hasClass('right-point')) {
						clipWidth += diffX;
						if(clipWidth < imageWidth && clipWidth > 0) {
							clipHeight = previewHeight * (clipWidth / previewWidth);
							if(borderTop + clipHeight > imageHeight) {
								clipHeight = imageHeight - borderTop;
								clipWidth = previewWidth * (clipHeight / previewHeight);
							}
							borderRight = imageWidth - borderLeft - clipWidth;
							borderBottom = imageHeight - borderTop - clipHeight;
							resizable = true;
						}
					}
					// .left-top-point,右下角固定
					if((diffX || diffY) && $target.hasClass('left-top-point')) {
						if(diffX) {
							clipWidth -= diffX;
							if(clipWidth < imageWidth && clipWidth > 0) {
								clipHeight = previewHeight * (clipWidth / previewWidth);
								if(borderBottom + clipHeight > imageHeight) {
									clipHeight = imageHeight - borderBottom;
									clipWidth = previewWidth * (clipHeight / previewHeight);
								}
								resizable = true;
							}
						} else {
							clipHeight -= diffY;
							if(clipHeight < imageHeight && clipHeight > 0) {
								clipWidth = previewWidth * (clipHeight / previewHeight);
								if(borderRight + clipWidth > imageWidth) {
									clipWidth = imageWidth - borderRight;
									clipHeight = previewHeight * (clipWidth / previewWidth);
								}
								resizable = true;
							}
						}
						borderTop = imageHeight - clipHeight - borderBottom;
						borderLeft = imageWidth - clipWidth - borderRight;
					}
					
					// .right-top-point,左下角固定
					if((diffX || diffY) && $target.hasClass('right-top-point')) {
						if(diffX) {
							clipWidth += diffX;
							if(clipWidth < imageWidth && clipWidth > 0) {
								clipHeight = previewHeight * (clipWidth / previewWidth);
								if(borderBottom + clipHeight > imageHeight) {
									clipHeight = imageHeight - borderBottom;
									clipWidth = previewWidth * (clipHeight / previewHeight);
								}
								resizable = true;
							}
						} else {
							clipHeight -= diffY;
							if(clipHeight < imageHeight && clipHeight > 0) {
								clipWidth = previewWidth * (clipHeight / previewHeight);
								if(borderLeft + clipWidth > imageWidth) {
									clipWidth = imageWidth - borderLeft;
									clipHeight = previewHeight * (clipWidth / previewWidth);
								}
								resizable = true;
							}
						}
						borderTop = imageHeight - clipHeight - borderBottom;
						borderRight = imageWidth - borderLeft - clipWidth;
					}
					// .right-bottom-point,左上角固定
					if((diffX || diffY) && $target.hasClass('right-bottom-point')) {
						if(diffX) {
							clipWidth += diffX;
							if(clipWidth < imageWidth && clipWidth > 0) {
								clipHeight = previewHeight * (clipWidth / previewWidth);
								if(borderTop + clipHeight > imageHeight) {
									clipHeight = imageHeight - borderTop;
									clipWidth = previewWidth * (clipHeight / previewHeight);
								}
								resizable = true;
							}
						} else {
							clipHeight += diffY;
							if(clipHeight < imageHeight && clipHeight > 0) {
								clipWidth = previewWidth * (clipHeight / previewHeight);
								if(borderLeft + clipWidth > imageWidth) {
									clipWidth = imageWidth - borderLeft;
									clipHeight = previewHeight * (clipWidth / previewWidth);
								}
								resizable = true;
							}
						}
						borderRight = imageWidth - borderLeft - clipWidth;
						borderBottom = imageHeight - borderTop - clipHeight;
					}
					// .left-bottom-point,右上角固定
					if((diffX || diffY) && $target.hasClass('left-bottom-point')) {
						if(diffX) {
							clipWidth -= diffX;
							if(clipWidth < imageWidth && clipWidth > 0) {
								clipHeight = previewHeight * (clipWidth / previewWidth);
								if(borderTop + clipHeight > imageHeight) {
									clipHeight = imageHeight - borderTop;
									clipWidth = previewWidth * (clipHeight / previewHeight);
								}
								resizable = true;
							}
						} else {
							clipHeight += diffY;
							if(clipHeight < imageHeight && clipHeight > 0) {
								clipWidth = previewWidth * (clipHeight / previewHeight);
								if(clipWidth + borderRight > imageWidth) {
									clipWidth = imageWidth - borderRight;
									clipHeight = previewHeight * (clipWidth / previewWidth);
								}
								resizable = true;
							}
						}
						borderBottom = imageHeight - borderTop - clipHeight;
						borderLeft = imageWidth - clipWidth - borderRight;
					}
					if(resizable) {
						$clipRect.css({
							width : clipWidth,
							height : clipHeight,
							'border-width' : borderTop + 'px ' + borderRight + 'px ' + borderBottom + 'px ' + borderLeft + 'px'
						});
						showClipImage();
						mode == 'circle' && moveCircle();
					}
				}
				
				$container.bind('mousedown', function(e) {
					var $dom = $(e.target),
					buttonCode = e.button,
					// 是否是事件源
					isAim = $dom.hasClass('point-container') || $dom.hasClass('point');
					if(mode == 'circle') {
						isAim = isAim || $dom.hasClass('circle');
					}
					// 如果固定裁剪框，不能重画rect
					if(!fixed) {
						isAim = isAim || $dom.hasClass('clip-rect');
					}
					// 左键
					if(!buttonCode && $dom.attr('data-version') && $dom.css('display') != 'none' && isAim) {
						if($dom.hasClass('circle')) {
							$target = $pointContainer;
						} else {
							$target = $dom;
						}
						ZUtil.forbiddenSelect();
						originX = e.clientX;
						originY = e.clientY;
					}
				}).bind('reset', function() {
					// 重置
					$clipContainer.addClass('hide');
					$sourceImage.addClass('hide');
					$previewImage.addClass('hide');
					sourceFile = null;
					$form[0].reset();
				});
				
				$(fullscreenContainer).bind('mouseup', function() {
					if($target) {
						$target = null;
						x = null;
						y = null;
						ZUtil.validSelect();
					}
				}).bind('mousemove', function(e) {
					if($target) {
						$target.hasClass('clip-rect') && moveClipRect(e);
						$target.hasClass('point-container') && movePointContainer(e);
						$target.hasClass('point') && movePoint(e);
					}
				});
				
				function transformTo(size) {
					return size * 1024 * 1024;
				}
				
				var sourceContainerWidth = $sourceContainer.width(),
				sourceContainerHeight = $sourceContainer.height();
				
				function resizeImage(image) {
					var width = image.width,
					height = image.height,
					percentSourceW = width / sourceContainerWidth,
					percentSourceH = height / sourceContainerHeight;
					// 图片超出container尺寸，需要缩放
					if(percentSourceW > 1 || percentSourceH > 1) {
						if(percentSourceW > percentSourceH) {
							/**
							 * const percent = width / height = sourceContainerWidth / h
							 * h = sourceContainerWidth * (height / width)
							 */
							height = sourceContainerWidth * (height / width);
							width = sourceContainerWidth;
						} else {
							/**
							 * const percent = width / height = w / sourceContainerHeight
							 * w = sourceContainerHeight * (width / height)
							 */
							width = sourceContainerHeight * (width / height);
							height = sourceContainerHeight;
						}
					}
					$sourceImage.css({
						width : width,
						height : height
					});
					$previewImage.css({
						width : width,
						height : height
					});
					
					// 如果缩放后的图片宽高小于预览区域宽高，需要调整裁剪区域大小，但宽高比例不变
					var previewContainerWidth = $previewContainer.width(),
					previewContainerHeight = $previewContainer.height(),
					percentPreviewW = width / previewContainerWidth,
					percentPreviewH = height / previewContainerHeight,
					// 裁剪区域默认和预览区域一样宽高
					w = previewContainerWidth,
					h = previewContainerHeight;
					if(percentPreviewW < 1 || percentPreviewH < 1) {
						if(percentPreviewW < percentPreviewH) {
							/**
							 * const percent = w / h = width / ?
							 * ? = width * (h / w)
							 */
							h = width * (h / w);
							w = width;
						} else {
							/**
							 * const percent = w / h = ? / height
							 * ? = height * (w / h)
							 */
							w = height * (w / h);
							h = height;
						}
					}
					$w.val(w);
					$h.val(h);
					
					resizeClipContainer(width, height, 0, 0, w, h);
				}
				
				// 设置裁剪区域
				function resizeClipContainer(width, height, left, top, rectWidth, rectHeight) {
					$clipContainer.css({
						width : width,
						height : height
					});
					resizeClipRect(width, height, left, top, rectWidth, rectHeight);
				}
				
				// 设置.clip-rect宽高和border
				function resizeClipRect(width, height, left, top, rectWidth, rectHeight) {
					$clipRect.css({
						width : rectWidth,
						height : rectHeight,
						'border-width' : top + 'px ' + (width - rectWidth - left) + 'px ' + (height - rectHeight - top) + 'px ' + left + 'px'
					});
					showClipImage();
					mode == 'circle' && moveCircle();
				}
				
				// 设置预览图片的宽高以及位置
				function showClipImage() {
					var imageWidth = $sourceImage.width(),
					imageHeight = $sourceImage.height(),
					top = parseFloat($clipRect.css('border-top-width')) || 0,
					left = parseFloat($clipRect.css('border-left-width')) || 0,
					rectWidth = $clipRect.width(),
					rectHeight = $clipRect.height(),
					previewWidth = $previewContainer.width(),
					previewHeight = $previewContainer.height(),
					percent = rectWidth / previewWidth;
					
					// 计算预览图片的宽高
					if(percent != 1) {
						top = top / percent;
						left = left / percent;
						imageWidth = imageWidth / percent;
						imageHeight = imageHeight / percent;
					}
					$previewImage.css({
						width : imageWidth,
						height : imageHeight,
						top : -top,
						left : -left
					});
					$x.val(left);
					$y.val(top);
					$fw.val(imageWidth);
					$fh.val(imageHeight);
				}
				
				$file.bind('change', function() {
					var file = $file[0].files[0],
					realSize,
					valid;
					if(file) {
						var formData = new FormData();
						formData.append('file', file);
						formData.append('accept', accept);
						$.ajax({
							url : ctx + '/upload/file/img/type/check',
							data : formData,
							async : false,
							beforeSend : beforeSend,
							complete : complete,
							type : 'post',
							contentType: false,
							processData: false,
							success : function(data) {
								valid = data.success;
								if(!valid) {
									errorTypeCallback(data.msg);
								}
							}
						});
						
						if(!valid) {
							return false;
						}
						realSize = file.size;
						
						// 图片过大
						if(realSize > transformTo(size)) {
							sizeOver(size, realSize);
							return false;
						}
						var reader = new FileReader();
						reader.onload = function(e) {
							var result = e.target.result,
							image = new Image();
							image.onload = function() {
								$sourceImage.attr('src', result).removeClass('hide');
								$previewImage.attr('src', result).removeClass('hide');
								// 计算尺寸
								resizeImage(image);
								uploadCallback(result, sourceFile);
								sourceFile = file;
							};
							image.src = result;
							$clipContainer.removeClass('hide');
						};
						reader.readAsDataURL(file);
					}
				});
				
				$upload.bind('click', function() {
					$file.click();
				});
				
				$save.bind('click', function() {
					if(beforeCheck($form, sourceFile) == false) {
						return false;
					}
					var formData = getFormData($form, sourceFile);
					if(!formData) {
						return false;
					}
					
					$.ajax({
						url : url,
						data : formData,
						beforeSend : beforeSend,
						complete : complete,
						type : 'post',
						contentType: false,
						processData: false,
						success : function(data) {
							if(!data.success) {
								Qm.warning(data.msg || data.message || '服务器异常');
								return false;
							}
							saveCallback(data);
						}
					});
				});
			}
		});
	}
	
	$.fn.extend({
		ClipImage : ClipImage
	});
})();