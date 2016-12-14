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

(function() {
	function DataTablePages(opt) {
		
		function prepareData(opt) {
			if(!opt || typeof opt !== 'object') {opt = {};}
			var data = {},
			searchForm = opt.searchForm;
			// searchForm可以是字符串也可以是方法
			if(searchForm && typeof searchForm === 'function') {
				var param = searchForm();
				data = $.extend(true, data, param);
			} else {
				var formId = searchForm || "searchForm",
				$form = $('#' + formId);
				$form.find('input').each(function() {
					var $input = $(this),
					key = $input.attr('name');
					if(key) data[key] = $.trim($input.val());
				});
				$form.find('select').each(function() {
					var $select = $(this),
					key = $select.attr('name');
					if(key) data[key] = $select.val();
				});
			}
			return data;
		}
		
		function parsePageModel(aoList){
			//字段集合
			var  mDataProp_ = new Array();
			//是否支持排序
			var bSortable_ = new Array();
			//排序方向
			var sSortDir_ = new  Array();
			//当前参与排序字段index
			var  iSortCol_ = new  Array();
			var iSortingCols = 0;
			var pageModel = {};
			
			//分别为关键的参数赋值
			for (var i = 0; i < aoList.length; i++) {
				var map = aoList[i];
				var name = map.name;	//参数名称
				if ("sEcho" === name) {
					pageModel.sEcho = map.value;
				}
				if ("iDisplayStart" === name) {
					pageModel.iDisplayStart = map.value;
				}
				if ("iSortingCols" === name) {
					pageModel.iSortingCols = map.value;
				}
				if ("iDisplayLength" === name ) {
					pageModel.iDisplayLength = map.value;
				}
				if ("sSearch" === name ) {
					pageModel.sSearch = map.value;
				}
				//字段名称
				if (name !=null && name !='' && name.startWith("mDataProp_")) {
					mDataProp_.push(map.value);
				}
				//是否排序
				if (name !=null && name !='' && name.startWith("bSortable_")) {
					bSortable_.push(map.value);
				}
				//排序方向
				if (name !=null && name !='' && name.startWith("sSortDir_")) {
					sSortDir_.push(map.value);
				}
				//当前参与排序
				if (name !=null && name !='' && name.startWith("iSortCol_")) {
					iSortCol_.push(map.value);
				}
			}
			//排序语句
			var order_by = "";
			iSortingCols = pageModel.iSortingCols;
			if (iSortingCols > 0 ) {
				order_by = " ORDER BY ";
				for (var k = 0; k < iSortingCols; k++) {
					var index = iSortCol_[k];
					if (bSortable_[index]){//支持排序
						order_by += " ";
						order_by += mDataProp_[index];
						order_by += " ";
						order_by += sSortDir_[k];
						order_by += ",";
					}
				}
				pageModel.orderbyClause = order_by.substring(0, order_by.length-1);
			}
			pageModel.pageSize = pageModel.iDisplayLength;
			pageModel.currentPage = (pageModel.iDisplayStart/pageModel.iDisplayLength)+1;
			return pageModel
		}
		
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
					sZeroRecords : '<div class="center">没有找到符合条件的数据</div>',
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
	            	//获取分页对象
	            	var pageModel = parsePageModel(aoData);
	        		
	            	// 提交#searchForm表单数据或者function searchForm获取的数据
	            	var param = prepareData(opt);
	            	
	            	var defaults = $.extend(true, param, pageModel);
	            	Qm.ajax({
	            		url : url,
	            		data : defaults,
	            		success:function(resp) {
	            			var page = resp.data || resp.page || resp,
	            			pm = {
	        	  				aaData : page.list,
	        	  				iTotalRecords : page.totalCount,
	        	  				iTotalDisplayRecords : page.totalCount,
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
		
		defaults = $.extend(true, defaults, opt),
		$this = $(this),
		id = $this.attr('id');
		return $this.DataTable(defaults);
	}
	
	$.fn.extend({
		DataTablePages : DataTablePages
	});
})();