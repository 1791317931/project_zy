<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>snap svg</title>
<style type="text/css">
	#target {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		position: absolute;
		border: 1px solid blue;
	}
	#target-sub {
		width: 0;
		height: 0;
		background: url('../imgs/test-1/10.jpg') no-repeat;
		position: absolute;
		transition: width 1s linear, height 1s linear;
		-webkit-transition: width 1s linear, height 1s linear;
		-ms-transition: width 1s linear, height 1s linear;
	}
	#svg-test { 
		margin: 0;
		padding: 0;
		position: absolute;
		width: 100%;
		height: 100%;
	}
	#viewBox-target {
		width: 800px;
		height: 400px;
		position: absolute;
		top: 700px;
	}
	#viewBox-container {
		border: 1px solid red;
	}
	#paper-target {
		width: 1200px;
		height: 600px;
		border: 1px solid red;
		position: absolute;
		top: 1100px;
	}
	#innerDiv {
		position: absolute;
		border: 1px solid red;
	}
</style>
</head>
<body>
	<div id="target">
		<div id="target-sub"></div>
		<svg id="svg-test"></svg>
		<!-- 拖拽翻页效果 -->
	</div>
	<div id="innerDiv">
		<div>-------------------div1------------------</div>
		<div>-------------------div2------------------</div>
		<div>-------------------div3------------------</div>
		<div>-------------------div4------------------</div>
		<div>-------------------div5------------------</div>
		<div>-------------------div6------------------</div>
		<div>-------------------div7------------------</div>
		<div>-------------------div8------------------</div>
		<div>-------------------div9------------------</div>
		<div>-------------------div1------------------</div>
		<div>-------------------div2------------------</div>
		<div>-------------------div3------------------</div>
		<div>-------------------div4------------------</div>
		<div>-------------------div5------------------</div>
		<div>-------------------div6------------------</div>
		<div>-------------------div7------------------</div>
		<div>-------------------div8------------------</div>
	</div>
	<div id="viewBox-target">
		<svg width="800" height="400" id="viewBox-container">
			<image x="0" y="0" width="800" height="400" xlink:href="../imgs/test-1/10.jpg" />
		</svg>
	</div>
	<div id="paper-target">
		<svg width="1200" height="600" id="paper-container">
			<path id="paper-path" d="M 50 50 l 1100 0, 0 500, -1100 0 z" fill="deepskyblue" />
		</svg>
	</div>
</body>
	<script type="text/javascript" src="../js/snap.svg.js"></script>
	<script type="text/javascript" src="../js/snap-svg.js?<%=new Date().getTime()%>"></script>
</html>