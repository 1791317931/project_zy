<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>webgl-demo</title>
<link rel="stylesheet" href="../../../css/webgl.css?<%= new Date().getTime() %>">
<script type="x-shader/v-source" id="v-source-index">
	precision mediump float;
	attribute vec4 a_Position;
	void main() {
		gl_Position = a_Position;
	}
</script>
<script type="x-shader/f-source" id="f-source-index">
	precision mediump float;
	void main() {
		
	}
</script>
</head>
<body>
	<div id="menu" class="ml10 mt10 pull-left"></div>
	<div id="content-body" class="mt10 pull-left">
		<iframe width="100%" height="100%" id="iframe"></iframe>
	</div>
</body>
	<script src="../../../js/webgl-demo/index/index.js?<%= new Date().getTime() %>"></script>
</html>