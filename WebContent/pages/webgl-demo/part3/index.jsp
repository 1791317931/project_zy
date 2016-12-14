<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="../../../css/webgl.css?<%= new Date().getTime() %>">
<script src="../../../js/webgl-demo/webgl-utils.js?<%= new Date().getTime() %>"></script>
<!-- 原图 -->
<script type="x-shader/vertex-source" id="v-source">
	precision mediump float;
	attribute vec4 a_Position;
	varying vec2 v_textureCoordinate;
	void main() {
		gl_Position = a_Position;
		// 这是一种取巧的做法，强行把顶点坐标映射为纹理坐标，
    	// 但是仅适用于本章用到的刚好占满整个viewport的顶点
		// 纹理坐标的范围是0-1，并且和html坐标系相反		所以这里需要上下翻转
    	v_textureCoordinate = vec2((a_Position.x + 1.0) / 2.0, 1.0 - (a_Position.y + 1.0) / 2.0);
	}
</script>
<script type="x-shader/fragment-source" id="f-source-origin">
	precision mediump float;
	varying vec2 v_textureCoordinate;
	uniform sampler2D u_imgTexture;
	void main() {
		// texture2D(sampler2D sampler, vec2 coord) 使用纹理坐标coord，从当前绑定到sampler的二维纹理中读取相应的纹素（WEBGL编程指南-466）
		gl_FragColor = texture2D(u_imgTexture, v_textureCoordinate);
	}
</script>
</head>
<body class="p15 bg-gray">
	<canvas id="webgl" width="630px" height="630px" class="block"></canvas>
	<div class="text-center">
		<button class="btn" id="pre">上一节</button>
		<button class="btn" id="next">下一节</button>
	</div>
</body>
	<script src="../../../js/webgl-demo/part3/index.js?<%= new Date().getTime() %>"></script>
</html>