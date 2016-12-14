<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
	<script type="text/javascript" src="../../js/webgl/webgl-util.js"></script>
	<script type="text/javascript" src="../../js/webgl/cuon-util.js"></script>
	<script type="text/javascript" src="../../js/webgl/cuon-matrix.js"></script>
	<script type="text/javascript" src="../../js/webgl/webgl-debug.js"></script>
	<script type="v/source" id="vSource">
		attribute vec4 a_Position;
		attribute vec4 a_Color;
		// 法向量
		attribute vec4 a_Normal;
		uniform mat4 u_MvpMatrix;
		// 用来变化法向量的矩阵
		uniform mat4 u_NormalMatrix;
		uniform vec3 u_LightColor;
		uniform vec3 u_LightDirection;
		// 环境光颜色
		uniform vec3 u_AmbientLight;
		varying vec4 v_Color;
		void main() {
			gl_Position = u_MvpMatrix * a_Position;
			// 计算变换后的法向量进行归一化
			vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));
			// 计算光线方向和法向量的点积
			float nDotL = max(dot(u_LightDirection, normal), 0.0);
			// 计算漫反射光线颜色
			vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;
			// 计算环境光产生的反射光颜色
			vec3 ambient = u_AmbientLight * a_Color.rgb;
			// 表面的反射光颜色 = 漫反射光颜色 + 环境反射光颜色
			v_Color = vec4(diffuse + ambient, a_Color.a);
		}
	</script>
	<script type="f/source" id="fSource">
		precision mediump float;
		varying vec4 v_Color;
		void main() {
			gl_FragColor = v_Color;
		}
	</script>
	<script type="v/source" id="vSource-1">
		attribute vec4 a_Position;
		attribute vec4 a_Color;
		// 法向量
		attribute vec4 a_Normal;
		uniform mat4 u_MvpMatrix;
		uniform mat4 u_ModelMatrix;
		// 用来变化法向量的矩阵
		uniform mat4 u_NormalMatrix;
		uniform vec3 u_LightColor;
		// 光源位置
		uniform vec3 u_LightPosition;
		// 环境光颜色
		uniform vec3 u_AmbientLight;
		varying vec4 v_Color;
		void main() {
			gl_Position = u_MvpMatrix * a_Position;
			// 计算变换后的法向量进行归一化
			vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));
			// 计算顶点的世界坐标
			vec4 vertexPosition = u_ModelMatrix * a_Position;
			// 计算光线方向并归一化-->保证光线方向矢量的长度为1
			vec3 lightDirection = normalize(u_LightPosition - vec3(vertexPosition));
			// 计算光线方向和法向量的点积
			float nDotL = max(dot(lightDirection, normal), 0.0);
			// 计算漫反射光线颜色
			vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;
			// 计算环境光产生的反射光颜色
			vec3 ambient = u_AmbientLight * a_Color.rgb;
			// 表面的反射光颜色 = 漫反射光颜色 + 环境反射光颜色
			v_Color = vec4(diffuse + ambient, a_Color.a);
		}
	</script>
	<script type="f/source" id="fSource-1">
		precision mediump float;
		varying vec4 v_Color;
		void main() {
			gl_FragColor = v_Color;
		}
	</script>
	<script type="v/source" id="vSource-2">
		attribute vec4 a_Position;
		attribute vec4 a_Color;
		// 法向量
		attribute vec4 a_Normal;
		varying vec3 v_Normal;
		varying vec3 v_Position;
		uniform mat4 u_MvpMatrix;
		uniform mat4 u_ModelMatrix;
		// 用来变化法向量的矩阵
		uniform mat4 u_NormalMatrix;
		varying vec4 v_Color;
		void main() {
			gl_Position = u_MvpMatrix * a_Position;
			// 计算顶点的世界坐标
			v_Position = vec3(u_ModelMatrix * a_Position);
			v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
			v_Color = a_Color;
		}
	</script>
	<script type="f/source" id="fSource-2">
		precision mediump float;
		uniform vec3 u_LightColor;
		uniform vec3 u_LightPosition;
		// 环境光颜色
		uniform vec3 u_AmbientLight;
		varying vec3 v_Normal;
		varying vec3 v_Position;		
		varying vec4 v_Color;
		void main() {
			// 对法线进行归一化，因为其内插之后长度不一定是1.0
			vec3 normal = normalize(v_Normal);
			vec3 lightDirection = normalize(u_LightPosition - v_Position);
			float nDotL = max(dot(lightDirection, normal), 0.0);
			vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;
			vec3 ambient = u_AmbientLight * v_Color.rgb;
			gl_FragColor = vec4(diffuse + ambient, v_Color.a);
		}
	</script>
</head>
<body>
	<canvas width="640" height="640" id="webgl" style="display: block; margin: 0 auto;"></canvas>
	<script type="text/javascript" src="../../js/webgl/index-8.js"></script>
</body>
</html>