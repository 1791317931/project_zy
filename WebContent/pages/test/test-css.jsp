<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- <meta http-equiv="refresh" content="5;url='http://www.baidu.com'"> -->
<title>css与切图</title>
<link rel="stylesheet" href="../../css/index.css?<%=new Date().getTime()%>">
<link rel="stylesheet" href="../../css/test-css.css?<%=new Date().getTime()%>">

</head>
<body>
	<div id="tip">
		<div class="header"></div>
		<div class="body"></div>
		<div class="footer"></div>
	</div>
	<div id="drawer"></div>
	<div id="progress"></div>
	<div class="component">
		<div class="mt10 ml10">
			<span class="label">修改样式后的checkbox：</span>
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
			<span class="label">修改样式后的radio：</span>
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
		<div class="clearfix img-group mt10">
			<img src="../../imgs/teacher.png"/>
			<img src="../../imgs/teacher.png"/>
			<img src="../../imgs/teacher.png"/>
			<img src="../../imgs/teacher.png"/>
			<img src="../../imgs/teacher.png"/>
		</div>
		<div class="text-center mt10">
			<button id="result" class="btn-primary">结果</button>
		</div>
		<div class="relative">
			<div class="th" style="height: 0;">
				<p>12456</p>
			</div>
		</div>
		<div style="background-color: #e5edff;line-height: 1.5; font-size: 16px;">
			<img src="../../imgs/1.png" style="width: 200px; height: 191px;"/>
		</div>
		<div class="empty" data-empty="暂无内容"></div>
		<div style="height: 200px; background: url(../../imgs/teacher.png) no-repeat rgba(255, 188, 50, .3); background-position: right 20px bottom 10px;">
			
		</div>
		<div class="linear">
			1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
			1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
			1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
			1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
			1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
			1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
			1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
			1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
		</div>
		<div class="bg-rg"></div>
		<div class="bg-svg"></div>
		<div class="bg-lg"></div>
		<div class="border-radius-test"></div>
		<div class="clip-path">
			<img class="polygon" src="../../imgs/test-1/1.jpg" />
		</div>
		<div>
			<svg width="30" height="60" style="border: 1px solid red;">
				<path d="M 0 0 L 5 0, 30 30, 5 60, 0 60, 25 30, 0 0 z" stroke="red" fill="red"></path>
			</svg>
		</div>
		<div class="vam">
			123456789123456789123456789123456789123456789123456789
		</div>
		<div>
			<textarea id="input"></textarea>
		</div>
		<div class="hover-test">
			<input type="text" />
			测试hover
			<input type="text" />
			<input type="radio" id="radio" />
		</div>
		<div class="center">
			<button id="transition-color" class="btn-primary transition-color">颜色渐变</button>
		</div>
		<div class="mt30"></div>
	</div>
</body>
	<script type="text/javascript" src="../../js/jquery.js"></script>
	<script type="text/javascript" src="../../js/test/test-css.js?<%=new Date().getTime()%>"></script>
</html>