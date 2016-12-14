<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
	<link rel="stylesheet" href="../../css/index.css?<%=new Date().getTime()%>">
	<style type="text/css">
		#container {width: 2500px; height: 1000px;}
	</style>
</head>
<body>
	<div id="container"></div>
</body>
	<script type="text/javascript" src="../../js/threejs/three.js"></script>
	<script type="text/javascript" src="../../js/office/index.js?<%=new Date().getTime()%>"></script>
</html>