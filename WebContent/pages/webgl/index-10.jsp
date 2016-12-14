<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 线性雾化、指数雾化 -->
<title>线性雾化</title>
	<script type="text/javascript" src="../../js/webgl/webgl-util.js"></script>
	<script type="text/javascript" src="../../js/webgl/cuon-util.js"></script>
	<script type="text/javascript" src="../../js/webgl/cuon-matrix.js"></script>
	<script type="text/javascript" src="../../js/webgl/webgl-debug.js"></script>
	<script type="v/source" id="vSource">
		attribute vec4 a_Position;
		attribute vec4 a_Color;
		uniform mat4 u_MvpMatrix;
		uniform mat4 u_ModelMatrix;
		uniform vec4 u_Eye;
		varying vec4 v_Color;
		varying float v_Dist;
		void main() {
			gl_Position = u_MvpMatrix * a_Position;
			v_Color = a_Color;
			// 计算顶点与视点的距离--开销很大
			// v_Dist = distance(u_ModelMatrix * a_Position, u_Eye);
			// 使用gl_Position.w替代	也就是顶点的视图坐标的Z分量乘以-1
			v_Dist = gl_Position.w;
		}
	</script>
	<!-- 线性雾化 -->
	<script type="f/source" id="fSource">
		precision mediump float;
		varying vec3 v_Position;		
		varying vec4 v_Color;
		// 雾的颜色
		uniform vec3 u_FogColor;
		// 雾的起点和终点
		uniform vec2 u_FogDist;
		varying float v_Dist;
		void main() {
			// 计算雾化因子	clamp作用：将第一个参数的值限制在第二个和第三个参数之间
			float fogFactor = clamp((u_FogDist.y - v_Dist) / (u_FogDist.y, u_FogDist.x), 0.0, 1.0);
			// mix会计算 x X (1 - z) + y X z，其中x,y,z分别是第1、2、3个参数
			vec3 color = mix(u_FogColor, vec3(v_Color), fogFactor);
			gl_FragColor = vec4(color, v_Color.a);
		}
	</script>
	<script type="v/source" id="vSource-1">
		attribute vec4 a_Position;
		void main() {
			gl_Position = a_Position;
			gl_PointSize = 10.0;
		}
	</script>
	<!-- 线性雾化 -->
	<script type="f/source" id="fSource-1">
		precision mediump float;
		varying vec3 v_Position;		
		varying vec4 v_Color;
		// 雾的颜色
		uniform vec3 u_FogColor;
		// 雾的起点和终点
		uniform vec2 u_FogDist;
		varying float v_Dist;
		void main() {
			// 点中心坐标(0.5, 0.5)
			// gl_PointCoord表示当前片元在所属的点内的坐标，坐标值的区间是从0.0--1.0
			float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
			// 长度小于0.5的显示出来
			if(dist < 0.5) {
				gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
			} else {
				// discard 放弃当前片元
				discard;
			}
		}
	</script>
</head>
<body>
	<canvas width="640" height="640" id="webgl" style="display: block; margin: 0 auto;"></canvas>
	<script type="text/javascript" src="../../js/webgl/index-10.js?<%= new Date().getTime()%>"></script>
</body>
</html>