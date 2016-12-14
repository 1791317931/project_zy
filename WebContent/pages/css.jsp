<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;" />
<title>css</title>
	<link rel="stylesheet" href="../css/style.css?<%=new Date().getTime()%>">
	<script type="text/javascript" src="../js/jquery.js"></script>
	<script type="text/javascript" src="../js/css.js?<%=new Date().getTime()%>"></script>
</head>
<body>
	<div id="digist" style="width: 50%;"></div>
	<hr>
	<div id="progress-bar">
		<div class="progress">
			<span></span>
		</div>
		<p class="first">
			<span></span>
		</p>
		<p class="second">
			<span></span>
		</p>
		<p class="third">
			<span></span>
		</p>
		<p class="fourth">
			<span></span>
		</p>
		<p class="fifth">
			<span></span>
		</p>
	</div>
	<div>
		<span id="linear-gradient"></span>
	</div>
	<div class="gradient-container">
		<span id="left-bottom-radial-gradient"></span>
		<span id="center-radial-gradient"></span>
		<span id="closest-side-radial-gradient"></span>
		<span id="farthest-corner-radial-gradient"></span>
		<span id="repeating-linear-gradient"></span>
		<span id="repeating-radial-gradient"></span>
	</div>
	<div id="opacity-fade-test" class="clearfix">
		<div class="row">
			<img src="../imgs/1.png" class="rotateY-180">
		</div>
		<div class="row">
			<img src="../imgs/1.png">
			<button id="changeOpacity">隐藏图片</button>
		</div>
		<div class="row">
			<div class="img-circle-container">
				<img src="../imgs/1.png">
				<div class="cover"></div>
			</div>
			<button id="change-img-circle">隐藏图片-光圈效果</button>
		</div>
		<div class="row">
			<div class="img-container">
				<img class="second-img rotateY-180">
				<img class="first-img">
			</div>
			<button id="changeImg">切换图片</button>
		</div>
	</div>
	<div id="table-test-container">
		<table id="table-test">
			<thead>
				<tr>
					<th>序号</th>
					<th>名称</th>
					<th>价格</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td td-label="序号">1</td>
					<td td-label="名称">草莓</td>
					<td td-label="价格">15元/斤</td>
					<td td-label="操作">删除</td>
				</tr>
				<tr>
					<td td-label="序号">2</td>
					<td td-label="名称">苹果</td>
					<td td-label="价格">5元/斤</td>
					<td td-label="操作">删除</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div id="base-element" class="br">
		<p class="ttc">there is a hotel</p>
		<p class="ti50">where there is a real there is a way.</p>
		<p class="ls3">where there is a real there is a way.</p>
		<p class="rtl">where there is a real there is a way.</p>
		<p class="ws5">where there is a real there is a way.</p>
		<p class="wsn">where there is a real there is a way.</p>
	</div>
	<div id="perspective-test">
		<img src="../imgs/1.png"/>
		<img src="../imgs/2.png"/>
	</div>
</body>
</html>