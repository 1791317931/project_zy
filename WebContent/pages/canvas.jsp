<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>canvas</title>
</head>
<body>
	<div id="percent-container" style="position: relative; text-align: center; line-height: 75px; width: 75px; height: 75px; float: left;">
		<span style="color: deepskyblue; font-weight: 700;"></span>
		<canvas width="75px" height="75px" style="position: absolute; left: 0; top: 0;"></canvas>
	</div>
	<div style="width: 70px; height: 70px; border-radius: 45px; border: 10px solid #ddd; float: left;"></div>
	<div style="width: 70px; height: 70px; border: 10px solid #ddd; float: left;"></div>
	<div id="canvas-line-gradient">
		<canvas id="linear-gradient" width="600px" height="300px" style="float: left; border: 1px solid #ff7d00; box-shadow: 0 0 20px red;"></canvas>
	</div>
</body>
	<script type="text/javascript" src="../js/jquery.js"></script>
	<script type="text/javascript" src="../js/canvas.js"></script>
</html>