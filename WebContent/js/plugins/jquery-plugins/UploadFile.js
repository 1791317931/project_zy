/**
 * 文件上传
 * 默认上传视频
 */

(function() {
	function UploadFile(opt) {
		var $this = $(this),
		// 可上传
		upload_able = true,
		addEvent = window.attachEvent && 'attachEvent' || window.addEventListener && 'addEventListener',
		time = new Date().getTime(),
		Accept = {
			video : {
				text : '.rmvb,.rm,video/x-matroska,video/mp4,video/3gpp,video/avi,video/quicktime,video/x-flv,audio/x-ms-wma,video/x-ms-wmv,video/mpeg',
				suffixs : ['rmvb', 'rm', 'mkv', 'mp4', '3gp', 'avi', 'mov', 'flv', 'wma', 'mpg', 'wmv']
			},
			file : {
//				text : '.pdf,.xls,.xlsx,.doc,.docx,.wps,.zip,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,aplication/zip,text/plain,application/vnd.ms-works',
				text : '.pdf,.xls,.xlsx,.doc,.docx,.wps,.zip,text/plain',
				suffixs : ['pdf', 'xls', 'xlsx', 'doc', 'docx', 'wps', 'zip', 'txt']				
			}
		},
		option = {
			// 检查容量
			sizeCheckUrl : ctx + '/resource/course/isenableupload',
			uploadUrl : ctx + '/resource/course/video/upload',
			// 默认上传视频
			accept : 'video',
			// 选择文件按钮的jq选择器
			selectButtonSelector : '#selectBtn',
			fileName : 'myfiles',
			// 默认一次只能上传一个文件
			multiple : false,
			// 默认0.5秒更新一次上传速度
			uploadSpeedInterval : 500,
			// 默认最大文件大小10M单位(KB)
			maxSize : 10 * 1024,
			init : init,
			fileAdded : fileAdded,
			// 上传文件之前会调用该方法，如果返回值是false会中断上传操作
			beforeUpload : $.noop,
			fileUpload : fileUpload,
			// fileUpload()执行完过后调用
			callback : $.noop
		};
		option = $.extend(true, option, opt);
		// 转换为字节
		var maxSize = option.maxSize * 1024,
		acceptType = Accept[option.accept] || Accept.video,
		suffixs = acceptType.suffixs,
		formHtml = '<form enctype="multipart/form-data" class="hidden" id="video-form-' + time + '">'
					+ '<input id="video-' + time + '" type="file" ' + (option.multiple ? 'multiple ' : '') + 'name="' + option.fileName + '" accept="' + acceptType.text + '"/>'
				+ '</form>';
		$this.append(formHtml);
		option.init();
		
		var $selectButton = $(option.selectButtonSelector),
		$videoForm = $('#video-form-' + time),
		$videoInput = $('#video-' + time),
		$fileStateDiv = $this.find('.file-state'),
		$fileProgress = $this.find('.file-progress'),
		$emptyFileDiv = $this.find('.empty-file');
		
		// 触发点击事件
		$selectButton.bind('click', function() {
			$fileStateDiv.click();
			$videoInput.click();
		});
		
		$videoInput.bind('change', option.fileAdded);
		
		$fileStateDiv.bind('click', function() {
			$fileStateDiv.css('border', '');
		});
		
		function createXHR() {
			var xHR = null;
			try{
				xHR = new XMLHttpRequest();        
			} catch(e) {
				try {
					xHR = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					xHR = new ActiveXObject("Msxml2.XMLHTTP");
				}
			}
			return xHR;
		}
		
		function getFiles() {
			return $videoInput[0].files;
		}
		
		// 字节转换	digist:保留小数点后位数
		function transformByte(byte, digist) {
			var KBYTE = 1024,
			MBYTE = 1024 * KBYTE;
			// 大于1M以M为单位
			if(byte / MBYTE >= 1) {
				if(byte % MBYTE === 0) {
					return (byte / MBYTE) + 'M';
				}
				return new Number((byte / MBYTE)).toFixed(digist) + 'M';
			} else {
				if(byte % KBYTE === 0) {
					return (byte / KBYTE) + 'KB';
				}
				return new Number((byte / KBYTE)).toFixed(digist) + 'KB';
			}
		}
		
		// 重置
		$this.bind('reset', function() {
			$fileStateDiv.html($emptyFileDiv.html());
			$fileProgress.css('width' , '0');
		});
		
		// 设置进度条长度为0，1秒后执行，是因为ace中加了CSS动画
		function initProgressState(callback) {
			typeof callback === 'function' && callback();
			$fileStateDiv.html($emptyFileDiv.html());
			setTimeout(function() {
				$fileProgress.css('width' , '0');
			}, 1000);
		}
		
		// 校验上传的文件格式是否正确
		function validateFileSuffix() {
			var files = getFiles();
			for(var i = 0, length = files.length; i < length; i++) {
				var name = files[i].name,
				suffix = name.substring(name.lastIndexOf('.') + 1);
				if(suffixs.indexOf(suffix.toLowerCase()) === -1) {
					var msg = '上传的文件格式不正确';
					Qm.warning(msg);
					upload_able = false;
					$fileStateDiv.data('error', msg);
					$videoForm[0].reset();
					return false;
				}
			}
			return true;
		}
		
		// 初始化
		function init() {
			// 确定上传
			$this.find('button[data-id="select-sure"]').bind('click', function() {
				$fileStateDiv.click();
				// 选择文件后如果被判定为不能上传，会直接中断
				if(!upload_able) {
					var msg = $fileStateDiv.data('error');
					if(msg) {
						Qm.warning(msg);
					} else {
						$.fn.error();
					}
					return false;
				}
				var files = getFiles();
				if(!files.length) {
					Qm.warning('请选择文件');
					return false;
				}
				
				// 自定义检测----------------------------begin
				if(option.beforeUpload(files) === false) {
					return false;
				}
				// 自定义检测----------------------------end
				
				var file = files[0];
				$fileProgress.css('width' , '0');
				$fileStateDiv.html('文件名称:' + file.name + '<span style="margin-right: 15px;"></span>上传进度:0% of ' + transformByte(file.size, 1) + ')<span style="margin-right: 15px;"></span>上传速度:0KB/s');
				option.fileUpload();
			});
		}
		
		// 添加文件
		function fileAdded() {
			upload_able = false;
			var files = getFiles(),
			size = 0;
			// 必须选择文件
			if(!files.length) {
				return false;
			}
			if(!validateFileSuffix()) {
				return false;
			}
			for(var i = 0, length = files.length; i < length; i++) {
				var file = files[i],
				fileSize = file.size;
				if(fileSize > maxSize) {
					$this.find('.empty-file').addClass('hidden');
					$fileStateDiv.removeClass('hidden');
					$fileStateDiv.data('file', file);
					$fileStateDiv.html(file.name);
					var msg = '文件超出' + transformByte(maxSize, 1);
					upload_able = false;
					$fileStateDiv.data('error', msg);
					Qm.warning(msg);
					$videoForm[0].reset();
					return false;
				}
				size += files[i].size;
			}
			$fileProgress.css('width', '0');
			// 检查站点空间是否足够
			$.ajax({
				url : option.sizeCheckUrl,
				data : {file_size : size},
				success : function(data) {
					upload_able = data.success;
					if(!upload_able) {
						var msg = data.msg;
						$fileStateDiv.data('error', msg);
						Qm.warning(msg);
						return false;
					}
					var file = files[0];
					$this.find('.empty-file').addClass('hidden');
					$fileStateDiv.removeClass('hidden');
					$fileStateDiv.data('file', file);
					$fileStateDiv.html(file.name);
					$fileStateDiv.css('border', '1px solid orange');
				},
				error : $.fn.error
			});
		}
		
		// 上传文件
		function fileUpload() {
			$fileProgress.css('width', '0px');
			// IE version >= 10
			var formData = new FormData($videoForm[0]),
			file = $fileStateDiv.data('file'),
			prevObj = {
				time : new Date().getTime(),
				load : 0
			},
			xHR = createXHR(),
			time = new Date().getTime(),
			uploadSpeedInterval = option.uploadSpeedInterval / 1000;
			
		    xHR.upload[addEvent]('progress', function(e) {
		    	var loaded = e.loaded,
		    	// 上次的时间戳
		    	pre = prevObj.time,
		    	// 上次的上传速度
		    	speed = prevObj.speed;
		    	// 当前时间戳
		    	now = new Date().getTime(),
		    	// 本次上传大小
		    	loadSize = loaded - prevObj.load,
		    	total = e.total,
		    	percent = Math.floor(100 * loaded / total),
		    	second = (now - pre) / 1000,
		    	$fileProgress.css('width', percent + '%');
		    	// 第一次或者时间间隔超过uploadSpeedInterval会更新上传速度
		    	if(second >= uploadSpeedInterval || !prevObj.load) {
		    		speed = loadSize / second;
		    		prevObj = {
		    				time : now,
		    				load : loaded,
		    				speed : speed
		    		};
		    	}
		    	$fileStateDiv.html('文件名称:' + file.name + '<span style="margin-right: 15px;"></span>上传进度:' + percent + '% of ' + transformByte(file.size, 1) + '<span style="margin-right: 15px;"></span>上传速度:' + transformByte(speed, 1) + '/s');
		    }, false);
		    xHR[addEvent]('error', $.fn.error, false);
		    xHR.open('POST', option.uploadUrl, true);
		    xHR.send(formData);
			xHR.onreadystatechange = function(e) {
				var readyState = xHR.readyState,
				status = xHR.status;
				if(readyState == 4 && status == 200) {
					// 清空type="file"，否则下一次选择相同的文件无法上传
					$videoForm[0].reset();
					initProgressState();
		    		var response = e.target.response;
		    		response = response && JSON.parse(response);
					if(response.success) {
						Qm.success('上传成功');
						var file = response.fileUpload,
						fileUrls = $this.data('fileUrls') || [];
						fileUrls.push(file.fullPath);
						$this.data('fileUrls', fileUrls);
						
						// 回调
						var callback = option.callback;
						if(typeof callback === 'function') {
							upload_able = callback(file, response);
						} else {
							upload_able = true;
						}
					}
				}
				if(status >= 500) {
					initProgressState($.fn.error);
				}
			};
		}
	}
	
	$.fn.extend({
		UploadFile : UploadFile
	});
})();