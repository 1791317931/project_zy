<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>plugins</title>

<link  rel="stylesheet" href="../../css/index.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/tip.css?<%=new Date().getTime()%>"/>
<%-- <link  rel="stylesheet" href="../../css/skin/orange/tip.css?<%=new Date().getTime()%>"/> --%>
<%-- <link  rel="stylesheet" href="../../css/skin/blue/tip.css?<%=new Date().getTime()%>"/> --%>
<link  rel="stylesheet" href="../../css/skin/green/tip.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/progress-bar.css?<%=new Date().getTime()%>"/>
<%-- <link  rel="stylesheet" href="../../css/skin/green/progress-bar.css?<%=new Date().getTime()%>"/> --%>
<%-- <link  rel="stylesheet" href="../../css/skin/blue/progress-bar.css?<%=new Date().getTime()%>"/> --%>
<link  rel="stylesheet" href="../../css/skin/orange/progress-bar.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/show-stage.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/simulate-scroll.css?<%=new Date().getTime()%>"/>
<link  rel="stylesheet" href="../../css/skin/blue/simulate-scroll.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/record.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/switch.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/select.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/mask.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/circle-progress.css?<%=new Date().getTime()%>"/>
<%-- <link  rel="stylesheet" href="../../css/skin/orange/circle-progress.css?<%=new Date().getTime()%>"/> --%>
<link  rel="stylesheet" href="../../css/skin/green/circle-progress.css?<%=new Date().getTime()%>"/>
<%-- <link  rel="stylesheet" href="../../css/skin/blue/circle-progress.css?<%=new Date().getTime()%>"/> --%>

<link  rel="stylesheet" href="../../css/skin/base/horizontal-slide.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/linear-gradient.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/clear.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/star.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/clip-image.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/message-tip.css?<%=new Date().getTime()%>"/>

<link  rel="stylesheet" href="../../css/skin/base/upload-file.css?<%=new Date().getTime()%>"/>

<style>
	.container {
		width: 100%;
		display: table;
	}
	.vat {vertical-align: top;}
	.w200 {width: 200px;}
	.menu {
		border-style: solid;
		border-width: 1px;
		border-top-color: #b1b0ae;
		border-right-color: #b1b0ae;
		border-bottom-color: #b1b0ae;
		border-left-color: #b1b0ae;
		overflow: auto;
	}
	.menu li {
		width: 200px;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		padding: 0 10px;
		border-bottom: 1px solid #B1B0AE;
		cursor: pointer;
		color: #D6A637;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
	}
	.menu li.active {
		color: #fff;
		font-weight: 600;
	}
	.menu li:hover {
		color: #fff;
		font-weight: 600;
	}
	.menu li.active:before, .menu li:hover:before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		background: #2196F3;
		transform: skewX(-45deg);
	}
	.content-body {
		border: 1px solid #ccc;
		background-color: #fff;
		background-image: url("data:image/svg+xml;charset=utf8,\
					%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60' %3E\
						%3Crect width='30' height='30' x='30' y='0' fill='rgba(0, 0, 0, .05)' /%3E\
						%3Crect width='30' height='30' x='0' y='30' fill='rgba(0, 0, 0, .05)' /%3E\
					%3C/svg%3E");
		background-size: 40px 40px;
	}
	.content-body-item {
		height: 100%;
		display: none;
		padding: 50px 30px 0;
	}
	.content-body-item.active {
		display: block;
	}
	.item-tip {
		padding: 30px;
	}
	.item-tip > div {
		counter-increment: first-index;
		text-indent: 40px;
		margin-top: 10px;
	}
	.item-tip > div:before {
		content: counter(first-index)'、';
		color: #ff7d00;
		font-weight: 600;
	}
	.item-tip > div > div {
		counter-increment: second-index;
		text-indent: 65px;
		margin-top: 10px;
	}
	.item-tip > div > div:before {
		content: '（'counter(second-index)'）、';
		color: red;
		font-weight: 600;
	}
	.item-tip div span {
		color: red;
		font-weight: 600;
		margin: 0 5px;
	}
	.img-groups img {
		width: 200px;
		height: 150px;
		box-sizing: border-box;
	}
	.load-error {
		border: 2px solid red;
	}
	.circle-progress {
		width: 200px;
		height: 200px;
		border: 1px solid red;
		margin-left: 50px;
		margin-top: 10px;
		background: #fff;
	}
	.clip-image-container {
		width: 1000px;
		height: 520px;
		margin: 10px auto;
		border: 1px solid #ff7d00;
		background: #fff;
	}
	.horizontal-slide {
		width: 600px;
		margin: 0 auto;
	}
	.horizontal-slider {
		width: 600px;
		height: 500px;
	}
	.page-visibility {
		width: 500px;
	    min-height: 50px;
	    border: 1px solid red;
	    text-align: center;
	    margin: 0 auto;
	    background: #fff;
	}
	.page-visibility > div {
		height: 30px;
		line-height: 30px;
	}
	.progress {
		width: 600px;
		margin: 50px auto 0;
		background: #fff;
	}
	.btn-groups {text-align: center;}
	.btn-groups button {
		min-width: 100px;
	    height: 30px;
	    font-size: 16px;
	    color: #fff;
	    background-color: #0069FF;
	    border-radius: 3px;
	    border: 1px solid #0069ff;
	    cursor: pointer;
	}
	.textarea {
		width: 500px;
		height: 200px;
	}
	.required-container {
		margin: 20px auto;
		width: 800px;
	}
	.stage-rect {
		width: 500px;
		height: 300px;
		margin: 0 auto;
		border: 1px solid red;
		background: #fff;
	}
	.scroller {
		border: 3px solid red;
		width : 600px;
		height : 200px;
		overflow: hidden;
		margin: 20px auto;
		background: #fff;
	}
	.scroll-wrapper div {
		border: 1px solid blue;
	}
	.star-container {
		width: 114px;
	    height: 20px;
	    margin: 20px 0 0 20px;
	}
	.switch-container {
		width: 300px;
		padding: 10px;
		margin: 0 auto;
		border: 1px solid red;
	}
	.upload-file {
		width: 800px;
		height: 500px;
	}
	.title {font-size: 18px;}
</style>

<script type="text/javascript" src="../../js/jquery.js?<%=new Date().getTime()%>"></script>
<script type="text/javascript" src="../../js/plugins/index.js?<%=new Date().getTime()%>"></script>
<script type="text/javascript" src="../../js/plugins/test.js?<%=new Date().getTime()%>"></script>
</head>
<body class="pt20 weiruan">
	<div class="container">
		<div class="cell w200 vat">
			<ul class="menu">
				<li data-type="checkbox-radio">
					Checkbox、Radio
				</li>
				<li data-type="circle-progress">
					Circle Progress
				</li>
				<li data-type="clip-image">
					Clip Image
				</li>
				<li data-type="horizontal-slide">
					Horizontal Slide
				</li>
				<li data-type="linked-select">
					Linked Select
				</li>
				<li data-type="mask">
					Mask
				</li>
				<li data-type="page-visibility">
					Page Visibility
				</li>
				<li data-type="progress-bar">
					Progress Bar
				</li>
				<li data-type="record">
					Record
				</li>
				<li data-type="required">
					Required
				</li>
				<li data-type="show-stage">
					Show Stage
				</li>
				<li data-type="simulate-scroll">
					Simulate Scroll
				</li>
				<li data-type="star">
					Star
				</li>
				<li data-type="switch">
					Switch
				</li>
				<li data-type="tip">
					Tip
				</li>
				<li data-type="upload-file">
					Upload File
				</li>
			</ul>
		</div>
		<div class="content-body">
			<div class="content-body-item" data-type="checkbox-radio">
				<div class="mt10 ml10 clearfix">
					<span class="label pull-left">修改样式后的checkbox：</span>
					<label class="checkbox-item" for="value1">
						<div class="table-cell">
							<input type="checkbox" id="value1"/>
							<span class="checkbox"></span>
						</div>
						<span class="table-cell pl5">value1</span>
					</label>
					<label class="checkbox-item ml5" for="value2">
						<div class="table-cell">
							<input type="checkbox" id="value2"/>
							<span class="checkbox"></span>
						</div>
						<span class="table-cell pl5">value2</span>
					</label>
				</div>
				<div class="mt10 ml10 clearfix">
					<span class="label pull-left">修改样式后的radio：</span>
					<label class="radio-item" for="value3">
						<div class="table-cell">
							<input type="radio" id="value3" name="sex"/>
							<span class="radio"></span>
						</div>
						<span class="table-cell pl5">value3</span>
					</label>
					<label class="radio-item ml5" for="value4">
						<div class="table-cell">
							<input type="radio" id="value4" name="sex"/>
							<span class="radio"></span>
						</div>
						<span class="table-cell pl5">value4</span>
					</label>
				</div>
			</div>
			<div class="content-body-item" data-type="circle-progress">
				<div class="circle-progress"></div>
				<div class="item-tip">
					<div>
						设置<span>value</span>值即可
					</div>
					<div>
						<span>duration</span>控制动画时间，默认<span>1s</span>
					</div>
					<div>
						经过测试发现<span>stroke-dasharray</span>这个css属性在ie与chrome和ff中标签形式不一致，会自动从元素<span>1/4</span>
						的地方开始渲染，应该在ie浏览器中对<span>svg元素旋转-90°，在ie中对元素本身旋转无效</span>
					</div>
				</div>
			</div>
			<div class="content-body-item" data-type="clip-image">
				<div class="clip-image-container">
					<div class="p10">
						<button class="add-btn btn-primary">添加图片</button>
					</div>
					<div class="clearfix">
						<div class="source-container ml10 pull-left">
							<img class="source-image">
						</div>		
						<div class="preview-container ml10 pull-left">
							<img class="preview-image">
						</div>
					</div>
					<div class="center mt15">
						<button class="btn-primary save-btn">保存</button>
					</div>
				</div>
				<div class="item-tip">
					<div>
						图片上传裁剪功能，默认图片大小最大<span>1M</span>
					</div>
					<div>
						插件mousemove和mouseup的事件源默认是<span>body</span>，如果当前container在单独的一个层，如模态框里，可以设置<span>fullscreenContainer</span>是container，这样可以提升性能
					</div>
					<div>
						当需要裁剪区域变换形状时，设置<span>mode</span>
					</div>
					<div>
						需要固定裁剪区域大小时，设置<span>fixed:true</span>，默认false，此时.clip-rect也没有点击事件了
					</div>
					<div>
						每次触发.save-btn点击事件会上传图片，并且可以调用<span>$(container).trigger('reset')</span>，此时会给.clip-container、.source-image、.preview-image添加.hide，sourceFile=null，另外form也会reset()
					</div>
					<div>
						在<span>mousemove</span>的时候，如果返回<span>false</span>会阻止事件冒泡，从而使<span>onselectstart</span>失效
					</div>
				</div>
			</div>
			<div class="content-body-item" data-type="horizontal-slide">
				<div class="horizontal-slide"></div>
				<div class="btn-groups mt20 hide" id="horizontal-slide-btns">
					<button class="btn-primary">显示</button>
				</div>
				<div class="item-tip">
					<div>
						水平滑动插件，页面数量取决于<span>sliderBody</span>的中<span>.slider-item</span>的数量
					</div>
					<div>
						<span>showArrow</span>值控制左右两边箭头是否显示，默认值<span>true</span>
					</div>
					<div>
						<span>showFooter</span>值控制底部.slider-footer是否显示，默认值<span>true</span>
					</div>
					<div>
						<span>mode</span>可选值：<span>modal</span>（默认值）、<span>normal</span>，如果值为modal：
						<div>
							$('z-modal').trigger('show', [reset])，第二个参数<span>reset</span>是一个boolean，也可以是数字，
							只要if判断为true，就能重置页码为1
						</div>
						<div>
							<span>opacity</span>值可以修改<span>.z-modal</span>背景色透明度，取值范围<span>[0.1， 1]</span>
						</div>
						<div>
							一定要给<span>.z-modal</span>添加<span>transition: background-color</span>
							以及<span>.z-modal-body</span>添加<span>transition: opacity</span>，但是需要注意的是transitionend和click事件
							都会<span>冒泡</span>，形式是一样的，所以给.z-modal添加transitionend事件时，需要判断事件源，否则.z-modal-body因为opacity
							变化也会触发.z-modal的transitionend事件
						</div>
						<div>
							当.z-modal可见时，点击<span>左键</span>和<span>右键</span>都可以翻页
						</div>
					</div>
				</div>
			</div>
			<div class="content-body-item" data-type="linked-select">
				<div class="linked-select-container ml30"></div>
				<div class="item-tip">
					<div>
						select联动，<span>renderCallback</span>作为回调函数，插件渲染完成后会执行这个函数，可以用来初始化select框
					</div>
					<div>
						<span>selects</span>参数是一个数组，其中select框会触发<span>change</span>事件，如果不是最后一个select框，change函数的
						三个参数值分别是<span>$nextSelect, nextIndex, value</span>，否则是<span>$curSelect, index, value</span>
					</div>
				</div>
			</div>
			<div class="content-body-item" data-type="mask">
				<div class="item-tip">
					<div>
						<span>$(dom).Mask(opt)</span>会显示一个模态框，正好覆盖dom的区域
					</div>
					<div>
						<span>原理：</span>添加一个模态框，width=dom.width，height=dom.height，border-width分别是浏览器可视宽高减去dom的宽高，
						模态框背景色transparent，内部是一个真正的覆盖区域，如果设置了border-width，top、left都应该分别和border-width相等
					</div>
					<div><span>mode</span>值可以改变覆盖区域的形状，可选值<span>rect（默认值）</span>、<span>circle</span></div>
				</div>
			</div>
			<div class="content-body-item" data-type="page-visibility">
				<div class="page-visibility"></div>
				<div class="item-tip">
					<div>
						切换浏览器Tab，会触发<span>visibilitychange</span>事件
					</div>
					<div>
						点击浏览器<span>最小化</span>或<span>最大化</span>都会触发该事件
					</div>
				</div>
			</div>
			<div class="content-body-item" data-type="progress-bar">
				<div class="progress"></div>
				<div class="center mt30 btn-groups">
					<button id="previous">上一步</button>
					<button id="next">下一步</button>
				</div>
				<div class="item-tip">
					<div>
						该插件需要传递一个<span>data</span>值，该参数是一个数组，里面包含的是节点node的文本
					</div>
					<div>
						另外一个参数是<span>callback</span>值，该函数在每次动画结束后执行，并且接收一个参数，也就是动画结束后progress所在的节点
					</div>
					<div>
						以下情况会造成<span>transitionend</span>动画失败，以改变宽高为例：
						<div>
							<span>页面刚加载完成</span>或者<span>由不可见变为可见</span>就修改宽高，此时无法触发transitionend事件，需要有一点点<span>阻塞</span>，
							可以设置<span>setTimeout</span>，如果在触发transitionend事件之前操纵了dom的style属性，如$(dom).css('width')也会造成阻塞，
							但是如$(dom).attr('name')之类的操作却无法造成阻塞，说明操纵dom的css属性比操纵其它属性耗费性能（<span>已验证</span>）
						</div>
						<div>
							transition事件源本身或者其父级元素不可见时动画无效（<span>已验证</span>）
						</div>
					</div>
					<div>
						progress当前节点值<span id="current-flag"></span>
					</div>
				</div>
			</div>
			<div class="content-body-item" data-type="record">
				<div class="textarea-record mt20 mb20">
					<textarea id="textarea0" class="textarea mt20 ml20">41223143234</textarea>
				</div>
				<div class="item-tip">
					<div>设置<span>length</span>属性设置有效字符个数</div>
				</div>
			</div>
			<div class="content-body-item" data-type="required">
				<div class="required-container">
					<input type="text" class="required" required />
					<a class="clear"></a>
				</div>
				<div class="item-tip">
					<div>
						<span>required</span>标签<span>:valid</span>伪类生效时，右边的<span>X</span>会显示出来
					</div>
				</div>
			</div>
			<div class="content-body-item" data-type="show-stage">
				<div class="stage-rect">
					<div>1</div>
					<div>1</div>
					<div>1</div>
					<div>1</div>
					<div>1</div>
					<div>1</div>
					<div>1</div>
					<div>1</div>
				</div>
				<div class="btn-groups mt20" id="show-stage-btns">
					<button class="btn-primary" id="left-to-right">left-to-right</button>
					<button class="btn-primary" id="right-to-left">right-to-left</button>
					<button class="btn-primary" id="center-to-sides">center-to-sides</button>
					<button class="btn-primary" id="sides-to-center">sides-to-center</button>
				</div>
				<div class="item-tip">
					<div>
						<span>mode</span>值有<span>left-to-right（默认）</span>、<span>right-to-left</span>、
						<span>center-to-sides</span>、<span>sides-to-center</span>
					</div>
				</div>
			</div>
			<div class="content-body-item" data-type="simulate-scroll">
				<div class="ml20 mt20">
					<div class="scroller">
						<div class="test1">我今天的心情很不错1我今天的心情很不错1我今天的心情很不错1我今天的心情很不错1我今天的心情很不错1我今天的心情很不错1我今天的心情很不错1</div>
						<div class="test2">我今天的心情很不错2我今天的心情很不错2我今天的心情很不错2我今天的心情很不错2我今天的心情很不错2我今天的心情很不错2我今天的心情很不错2</div>
						<div class="test3">我今天的心情很不错3我今天的心情很不错3我今天的心情很不错3我今天的心情很不错3我今天的心情很不错3我今天的心情很不错3我今天的心情很不错3</div>
						<div class="test4">我今天的心情很不错4我今天的心情很不错4我今天的心情很不错4我今天的心情很不错4我今天的心情很不错4我今天的心情很不错4我今天的心情很不错4</div>
						<div class="test5">我今天的心情很不错5我今天的心情很不错5我今天的心情很不错5我今天的心情很不错5我今天的心情很不错5我今天的心情很不错5我今天的心情很不错5</div>
						<div class="test6">我今天的心情很不错6我今天的心情很不错6我今天的心情很不错6我今天的心情很不错6我今天的心情很不错6我今天的心情很不错6我今天的心情很不错6</div>
						<div class="test7">我今天的心情很不错7我今天的心情很不错7我今天的心情很不错7我今天的心情很不错7我今天的心情很不错7我今天的心情很不错7我今天的心情很不错7</div>
						<div class="test8">我今天的心情很不错8我今天的心情很不错8我今天的心情很不错8我今天的心情很不错8我今天的心情很不错8我今天的心情很不错8我今天的心情很不错8</div>
					</div>
					<div class="scroller">
						<div class="test1">
							<div class="test1-1">
								我今天的心情很不错1我今天的心情很不错1我今天的心情很不错1我今天的心情很不错1我今天的心情很不错1我今天的心情很不错1我今天的心情很不错1
							</div>
						</div>
						<div class="test2">我今天的心情很不错2我今天的心情很不错2我今天的心情很不错2我今天的心情很不错2我今天的心情很不错2我今天的心情很不错2我今天的心情很不错2</div>
						<div class="test3">我今天的心情很不错3我今天的心情很不错3我今天的心情很不错3我今天的心情很不错3我今天的心情很不错3我今天的心情很不错3我今天的心情很不错3</div>
						<div class="test4">我今天的心情很不错4我今天的心情很不错4我今天的心情很不错4我今天的心情很不错4我今天的心情很不错4我今天的心情很不错4我今天的心情很不错4</div>
						<div class="test5">我今天的心情很不错5我今天的心情很不错5我今天的心情很不错5我今天的心情很不错5我今天的心情很不错5我今天的心情很不错5我今天的心情很不错5</div>
						<div class="test6">我今天的心情很不错6我今天的心情很不错6我今天的心情很不错6我今天的心情很不错6我今天的心情很不错6我今天的心情很不错6我今天的心情很不错6</div>
						<div class="test7">我今天的心情很不错7我今天的心情很不错7我今天的心情很不错7我今天的心情很不错7我今天的心情很不错7我今天的心情很不错7我今天的心情很不错7</div>
						<div class="test8">我今天的心情很不错8我今天的心情很不错8我今天的心情很不错8我今天的心情很不错8我今天的心情很不错8我今天的心情很不错8我今天的心情很不错8</div>
					</div>
					<div class="center mt10">
						<button id="add-head" class="btn-primary">添加头部</button>
						<button id="add-bottom" class="btn-primary">添加底部</button>
						<button id="delete-head" class="btn-primary">删除头部</button>
						<button id="delete-bottom" class="btn-primary">删除底部</button>
					</div>
				</div>
				<div class="item-tip">
					<div>模拟浏览器滚动功能</div>
					<div>如果浏览器是<span>IE</span>，使用setTimeout监听滚动区域内容是否发生变化，其他浏览器通过<span>MutationObserver</span>监控</div>
				</div>
			</div>
			<div class="content-body-item" data-type="star">
				<div class="star-container" number="5"></div>
			</div>
			<div class="content-body-item" data-type="switch">
				<div class="switch-container mb20">
					<div id="switch-0" class="mt5"></div>
					<div id="switch-1" class="mt5"></div>
				</div>
				<div class="item-tip">
					<div>
						<span>Switch</span>，<span>data</span>值是一个数组，即文本内容，默认选中第一个值，.switch-item[data-checked="Y"]是选中的值
					</div>
					<div>
						插件支持<span>trigger('reset')</span>重置
					</div>
				</div>
			</div>
			<div class="content-body-item" data-type="tip">
				<div class="tip-container">
					<span class="inline-block mt20 ml20" data-tip="1234567123456712345671234567123456712345671234567123456712345671234567123456712345671234567123456712345671234567123456712345671234567123456712345671234567123456712345671234567123456712345671234567123456712345671234567123456712345671234567">TIP</span>
					<p class="mt20 ml20" data-tip="xxxxxx234234234xxxxxxxxxxxxxxxxxxxx">NO TIP</p>
					<p class="mt30 mr20 pull-right" data-tip="xxxxxxxxxx242234234234234xxxxxxxxxxxxxxxx">NO TIP</p>
				</div>
				<div class="item-tip">
					<div>
						调用<span>$.fn.Tip(param)</span>，默认所有带<span>data-tip</span>的标签都能触发Tip方法，可以通过传递
						<span>attrName</span>来修改选择器
					</div>
				</div>
			</div>
			<div class="content-body-item" data-type="upload-file">
				<div class="upload-file-container center">
					<button class="btn btn-primary" id="to-upload-file">上传文件</button>
				</div>
				<div class="z-modal hide" id="upload">
					<div class="z-modal-body upload-file p20">
						<p class="center title">上传视频</p>
						<div class="z-upload-container mt20"></div>
						<div class="center mt20">
							<button class="btn btn-primary" type="button" id="saveFile">
								保存
							</button>
							<button class="btn btn-primary ml10" type="button" id="cancel-save">
								取消
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>