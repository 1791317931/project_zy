(function($) {
	
	var DEFAULT_SEARCH_FORM_ID = 'searchForm';
	function prepareData(opt) {
		if(!opt || typeof opt !== 'object') {
			opt = {};
		}
		var data = {},
		searchForm = opt.searchForm;
		// searchForm可以是字符串也可以是方法
		if(searchForm && typeof searchForm === 'function') {
			var param = searchForm();
			data = $.extend(true, data, param);
		} else {
			var formId = searchForm || DEFAULT_SEARCH_FORM_ID,
			$form = $('#' + formId);
			$form.find('input').each(function() {
				var $input = $(this),
				key = $input.attr('name');
				if(key) {
					data[key] = $.trim($input.val());
				}
			});
			$form.find('select').each(function() {
				var $select = $(this),
				key = $select.attr('name');
				if(key) {
					data[key] = $select.val();
				}
			});
		}
		return data;
	}
	
	// 创建XHR对象
	function createXHR() {
		xHR = null;
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
	
	$.fn.extend({
		/**
		 * ace分页
		 * javabean:com.qimooc.common.core.page.PageModel
		 * 用法
		 * html:<table id="event_tbl" class="table table-bordered table-striped table-hover" style="width: 100%;">
		 * js:$('#event_tbl').DataTablePages({
		 * 		sAjaxSource: '',
				aoColumns:  [{...}, {...}...]
		 * });
		 * 如果在table渲染完成后需要执行回调函数，可以添加callback参数
		 */
		DataTablePages : function(opt) {
			var defaults = {
					// 翻页功能
	    		    bPaginate : true,
	    		    // 改变每页显示数据数量
					bLengthChange : false,
					// 过滤功能
					bFilter :false, 
					// 排序功能
					bSort : false,
					// 页脚信息
					bInfo : true,  
					// 自动宽度
					bAutoWidth : true,
					oLanguage : {
						sLengthMenu : '每页显示 _MENU_条',
						sZeroRecords : '没有找到符合条件的数据',
						sProcessing : '<i class="ace-icon fa fa-spinner fa-spin orange bigger-275"></i>',
						sInfo : '当前第 _START_ - _END_ 条　共计 _TOTAL_ 条',
						sInfoEmpty : '',
						sInfoFiltered : '(从 _MAX_ 条记录中过滤)',
						sSearch : '搜索：',
						sSearchPlaceholder : '',
						oPaginate : {
							sFirst : '首页',
							sPrevious : '前一页',
							sNext : '后一页',
							sLast : '尾页'
						}
					},
				 	bProcessing : true,
					bServerSide : true,
					bDestroy: true,
					// 请求路径
					sAjaxSource: opt.sAjaxSource,
					// tr-->td的样式以及数据
					aoColumns:  [],
					aaSorting: [[ 0, 'asc' ]],
		            fnServerData : function(url, aoData, render) {
		            	// 提交#searchForm表单数据或者function searchForm获取的数据
		            	var param = prepareData(opt);
		            	param.aoData = JSON.stringify(aoData);
		            	Qm.ajax({
		            		url : url,
		            		data : param,
		            		success:function(resp) {
		            			var page = (resp && resp.page) ? resp.page : resp,
		            			pm = {
			        	  				aaData : page.aaData,
			        	  				iTotalRecords : page.iTotalRecords,
			        	  				iTotalDisplayRecords : page.iTotalDisplayRecords,
			        	  				iDisplayStart : page.iDisplayStart,
			        	  				iDisplayLength : page.iDisplayLength,
			        	  				sEcho : page.sEcho
			        	  		},
			        	  		$tableInfo = $('#' + id + '_info'),
			        	  		$paginateDiv = $('#' + id + '_paginate');
		            			
		            			// 渲染数据
		            			render(pm);
		            			
		            			// 设置分页 $('#' + id + '_paginate')
		            			if(pm.iTotalRecords) {
		            				$paginateDiv.removeClass('hidden');
		            			} else {
		            				$paginateDiv.addClass('hidden');
		            			}
		            			// 分页按钮可能因为table宽度有限，导致页面错乱    强行覆盖div样式
		            			$tableInfo.parent().attr('class', 'pull-left').css({
		            				height : '40px',
		            				'line-height' : '40px',
		            				'margin-left' : '15px'
		            			});
		            			$paginateDiv.parent().attr('class', 'pull-right').css({
		            				height : '40px',
		            				'line-height' : '40px'
		            			});
		            		
		            			// 回调
		            			var callback = opt.callback;
		            			typeof callback === 'function' && callback();
		            		}
		            	});
		            }
	    	}
			var defaults = $.extend(true, defaults, opt),
			$this = $(this),
			id = $this.attr('id');
			return $this.DataTable(defaults);
		},
		/**
		 * 瀑布流加载数据
		 * javabean:com.qimooc.common.core.page.PageScroll
		 * 说明：每次滚动加载数据的间隔interval，也就是ajax-->success执行间隔interval后才能继续滚动加载数据
		 * 如果需要显示交互信息可以在当前dom元素内添加
		 * *.empty(暂无数据,css{display:none}),*.loadMore(加载更多),*.loading(正在加载中...,css{display:none})
		 * 用法：
		 * (1)、<div id="container" style="overflow-y: auto;">
		 * 			<div class="empty">加载更多</div>
		 * 			<div class="empty" style="display:none;">数据加载中...</div>
		 * 			<div class="empty" style="display:none;">暂无数据</div>
		 *     </div>
		 *     $('#container').Scroll({
		 *     							self : true,
		 *     							url : ''
		 *     						});
		 * (2)、<div id="container">
		 * 			<div class="empty">加载更多</div>
		 * 			<div class="empty" style="display:none;">数据加载中...</div>
		 * 			<div class="empty" style="display:none;">暂无数据</div>
		 *     </div>
		 *     $('#container').Scroll({
		 *     							url : ''
		 *     						});
		 */
		Scroll : function(opt) {
			var option = {
					// 数据加载间隔时间(ms)
					interval : 1000,
					// 距离底部50px时加载
					offsetBottom : 50,
					// !!!!!!!!!默认使用window作为滚动监听对象,为true时，使用自身作为滚动监听对象，此时需要设置css{min-height以及overflow-y: auto};
					self : false,
					url : '',
					type : 'post',
					data : {
						pageSize : 10,
						curPage : 1
					},
					beforeSend : beforeSend,
					complete : complete,
					success : success,
					error : $.fn.error
			};
			var $this = this, callback = opt.success;
			opt.success = option.success;
			option = $.extend(true, option, opt);
			
			$this.setData = function(param) {
				option.data = $.extend(true, option.data, param);
			};
			
			$this.load = function() {
				$.ajax(option);
			};
			
			// 可以继续加载数据
			function setState(data) {
				if(data.totalCount > data.curPage * data.pageSize) {
					$this.isReady = true;
					$this.preTime = new Date().getTime();
					$this.find('.empty').show();
				} else {
					$this.find('.loadMore').show();
				}
			}
			function beforeSend() {
				$this.find('.loading').show();
				$this.find('loadMore').hide();
			}
			function complete() {
				$this.find('.loading').hide();
			}
			function success(data) {
				data = typeof data == 'string' && JSON.parse(data) || data;
				callback && typeof callback === 'function' && callback(data);
				setState(data);
			}
			/**
			 * scrollTop	滚动条距离顶部距离
			 * clientHeight	页面可视内容区高度
			 * scrollHeight	页面实际高度
			 */
			// body滚动条到达底部
			function bodyIsBottom() {
				var scrollTop = clientHeight = scrollHeight = 0;
				if(document.documentElement && document.documentElement.scrollTop) {
					scrollTop = document.documentElement.scollTop;
				} else if(document.body) {
					scrollTop = document.body.scrollTop;
				}
				if(document.body.clientHeight && document.documentElement.clientHeight) {
					clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
				} else {
					clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
				}
				scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
				return scrollTop + clientHeight >= scrollHeight - option.offsetBottom;
			}
			// dom滚动条到达底部
			function domIsBottom() {
				var scrollObj = $scrollObj[0],
				scrollTop = scrollObj.scrollTop || 0,
				clientHeight = scrollObj.clientHeight || 0,
				scrollHeight = scrollObj.scrollHeight || 0;
				return scrollTop + clientHeight >= scrollHeight - option.offsetBottom;
				
			}
			var isBottom = option.self && domIsBottom || bodyIsBottom;
			
			$.ajax(option);
			
			$scrollObj = !option.self && $(window) || $this;
			// 为了解决ace带来的bug，必须判断添加滚动加载事件的dom元素是否存在，并且带有滚动加载的标志参数
			$this.attr('scroll-flag', true);
			$scrollObj.unbind('mousewheel').bind('mousewheel', function(e) {
				function getData() {
					// 每次都要重新获取dom元素，使用ace不会刷新页面，所以绑定的Event会一直存在
					var $scrollOriginDom = $($this.selector);
					if($scrollOriginDom && $scrollOriginDom.length && $scrollOriginDom.attr('scroll-flag')) {
						var curTime = new Date().getTime(),
						isReady = $this.isReady;
						if(e.originalEvent.wheelDelta < 0
								&& isBottom()
								&& isReady
								&& curTime - $this.preTime >= option.interval
						) {
							option.data.curPage += 1;
							$this.isReady = false;
							$.ajax(option);
						}
					} else {
						// 解绑
						$scrollObj.unbind('mousewheel');
					}
				}
				getData();
			});
			return $this;
		},
		error : function(msg) {
			Qm.warning(typeof msg === 'string' && msg || '服务器异常');
		},
		UploadFile : function(opt) {
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
					text : '.pdf,.xls,.xlsx,.doc,.docx,.wps,.zip,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,aplication/zip,text/plain,application/vnd.ms-works',
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
		},
		// switch按钮
		Switch : function(param) {
			var $this = $(this),
			opt = {
				// 是否选中,默认显示第一个
				checked : 0,
				// 定义按钮
				buttons : [{
					text : 'text1',
					value : 'value1',
					className : ''
				}, {
					text : 'text2',
					value : 'value2',
					className : ''
				}],
				// 点击之前
				before : $.noop,
				// 点击后回调
				callback : $.noop
			};
			param = $.extend(true, opt, param);
			
			var checked = !!param.checked && 1 || 0,
			buttons = param.buttons,
			button0 = buttons[0],
			button1 = buttons[1],
			value0 = button0.value,
			value1 = button1.value,
			// 选中的值
			checkedValue = buttons[checked].value,
			before = param.before,
			callback = param.callback,
			valueObj = {
				0 : value0,	
				1 : value1
			},
			html = '<span class="type pull-left ml5 f16 ' + button0.className + '" data-value="' + value0 + '">' + button0.text + '</span>'
				+ '<span class="type pull-right mr5 f16 ' + button1.className + '" data-value="' + value1 + '">' + button1.text + '</span>';
			
			$this.addClass('switch pull-left');
			$this.html(html);
			$this.initSwitch = function(value, index) {
				checkedValue = value || checkedValue;
				checked = index || checked;
				$this.attr({
					'data-value' : checkedValue,
					'data-index' : checked
				});
				$this.find('span:eq(' + checked + ')').removeClass('hide');
				$this.find('span:eq(' + (1 - checked) + ')').addClass('hide');
			};
			$this.initSwitch();
			
			// 通过data-index操作switch
			$this.unbind().bind('click', function() {
				// 前置条件
				if(!before()) {
					return;
				}
				// 局部变量，不使用全局
				var checked = parseInt($this.attr('data-index'));
				$this.find('span:eq(' + checked + ')').addClass('hide');
				checked = 1 - checked;
				$this.find('span:eq(' + checked + ')').removeClass('hide');
				var checkedValue = valueObj['' + checked];
				$this.attr({
					'data-value' : checkedValue,
					'data-index' : checked
				});
				callback(checkedValue, checked);
			});
			return $this;
		}
	});
})(jQuery);

(function initAnimationFrame() {
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

/**
 * checkbox、raido样式替换
   获取checkbox、radio的值，只需要判断是否含有checkbox即可
    html:------------------------------------------------------------------
  	<div class="mt10 ml10">
		<label class="checkbox" for="value1">
			<input type="checkbox" id="value1"/>
			<span></span>
			<span>value1</span>
		</label>
		<label class="checkbox" for="value2">
			<input type="checkbox" id="value2"/>
			<span></span>
			<span>value2</span>
		</label>
	</div>
	<div class="mt10 ml10">
		<label class="radio" for="value3">
			<input type="radio" id="value3" name="sex"/>
			<span></span>
			<span>value3</span>
		</label>
		<label class="radio">
			<input type="radio" id="value4" name="sex"/>
			<span></span>
			<span>value4</span>
		</label>
	</div>
	
	css:------------------------------------------------------------------
	.checkbox,.radio {position: relative; cursor: pointer;}
	.checkbox input[type="checkbox"],.radio input[type="radio"] {visibility: hidden;}
	.checkbox:hover input + span {background-color: #00a4ff;}
	.checkbox input + span {
		display: inline-block;
	    width: 16px;
	    height: 16px;
	    border: 1px solid #00a4ff;
	    position: absolute;
	    left: 0;
	    border-radius: 3px;
	    background-color: #fff;
	}
	.checkbox input:checked + span:before {
		content: "\2714";
	    position: absolute;
	    color: #00a4ff;
	    top: -6px;
	    left: 0px;
	    font-size: 20px;
	    font-weight: bold;
	}
	.checkbox:hover input:checked + span:before {color: #fff;}
	.radio input + span {
		position: absolute;
	    left: 0;
	    width: 16px;
	    height: 16px;
	    border-radius: 50%;
	    border: 1px solid #00a4ff;
	}
	.radio input:checked + span:before {
		content: "";
	    width: 12px;
	    height: 12px;
	    border-radius: 50%;
	    background-color: #00a4ff;
	    position: absolute;
	    top: 2px;
	    left: 2px;
	}
 */
/*$(document.body).on('dblclick', 'input[type="checkbox"],input[type="radio"]', function() {
	// 解决IE下 checkbox、radio双击延迟问题
	if(window.ActiveXObject || 'ActiveXObject' in window) {
		$(this).click();
	}
});*/
