<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="../../../css/webgl.css?<%= new Date().getTime() %>">
<script src="../../../js/webgl-demo/webgl-utils.js?<%= new Date().getTime() %>"></script>
<script type="x-shader/vertex-source" id="v-source">
	precision mediump float;
	attribute vec4 a_Position;
	void main() {
		gl_Position = a_Position;
		// gl_PointSize = 10.0;
	}
</script>
<script type="x-shader/fragment-source" id="f-source">
	precision mediump float;
	uniform vec4 u_FragColor;
	void main() {
		gl_FragColor = u_FragColor;
	}
</script>
</head>
<body class="p15 bg-gray">
	<p>该部分章节主要先搭建webgl的运行环境，以及创建webgl的过程。<p>
	<p>所有js代码均运行在严格模式下：</p>
		<p class="break ti1">严格模式是一种将更好的错误检查引入代码中的方法。 在使用严格模式时，无法使用隐式声明的变量、将值赋给只读属性或将属性添加到不可扩展的对象等</p>
		<p class="break ti1">1、 严格模式的目的</p>
		   <p class="break ti2">1） 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为</p>
		   <p class="break ti2">2）消除代码运行的一些不安全之处，保证代码运行的安全</p>
		   <p class="break ti2">3） 提高编译器效率，增加运行速度</p>
		   <p class="break ti2">4） 为未来新版本的Javascript做好铺垫</p>
		<p class="break ti1">2、声明严格模式</p>
		   <p class="break ti2"> 可以通过在文件、程序或函数的开头添加 "<span class="red">use strict</span>"; 来声明严格模式。 此类声明称作“指令序言”。 
		   	 严格模式声明的范围取决于其上下文。 如果在全局上下文（函数的范围之外）中声明严格模式，则程序中的所有代码 都处于严格模式。如果在函数中声明严格模式，
		   	 则函数中的所有代码都处于严格模式。
		   </p>
	<p class="pt10 break ti1">
		和创建canvas对象一样，首先在页面上获取画布对象-->document.getElementById(id).getContext('experimental-webgl')。某些浏览器如IE版本小于10
		的都获取不到webgl对象，这时需要给出提示信息。得到webgl对象后，可以给画布设置viewport，和svg效果一样。
		gl.viewport(0, 0, gl.drawingBufferHeight, gl.drawingBufferWidth)。有了webgl对象，需要创建着色器，着色器的源码可以用js字符串，
		用js字符串书写时，阅读起来不是太方便，并且编写的时候也不方便；另一种解决方案是写到jsp页面html页面，只需要用document.getElementById(id).innerHTML即可；
		上述第二种方案中如果着色器对象特别多或者代码量比较大时，建议将代码书写到txt文件中，通过ajax获取。
	</p>
	<p class="pt10 break ti1">下面介绍创建着色器步骤：</p>
	<pre>
		// 创建着色器对象
		var gl = this.gl,
		// 顶点着色器
		vertexShaderObj = gl.createShader(gl.VERTEX_SHADER),
		// 片元着色器
		fragmentShaderObj = gl.createShader(gl.FRAGMENT_SHADER);
		// 绑定源码
		gl.shaderSource(vertexShaderObj, vsource);
		gl.shaderSource(fragmentShaderObj, fsource);
		// 编译源码
		gl.compileShader(vertexShaderObj);
		gl.compileShader(fragmentShaderObj);
		// 检查是否编译成功
		if(!gl.getShaderParameter(vertexShaderObj, gl.COMPILE_STATUS)) {
			console.error('顶点着色器对象编译失败--' + gl.getShaderInfoLog(vertexShaderObj));
			return null;
		}
		if(!gl.getShaderParameter(fragmentShaderObj, gl.COMPILE_STATUS)) {
			console.error('片元着色器对象编译失败--' + gl.getShaderInfoLog(fragmentShaderObj));
			return null;
		}
		return {
			vertexShaderObj : vertexShaderObj,
			fragmentShaderObj : fragmentShaderObj
		};
	</pre>
	<p class="break ti1">最后创建程序对象：</p>
	<pre>
		var gl = this.gl,
		program = gl.createProgram();
		if(!program) {
			console.error('创建程序失败');
			return null;
		}
		// 为程序分配着色器
		gl.attachShader(program, vertexShaderObj);
		gl.attachShader(program, fragmentShaderObj);
		// 连接程序对象
		gl.linkProgram(program);
		// 判断是否连接成功
		if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('程序对象连接失败--' + gl.getProgramInfoLog(program));
			// 删除着色器对象和程序对象
			gl.deleteProgram(program);
			gl.deleteShader(vertexShaderObj);
			gl.deleteShader(fragmentShaderObj);
			return null;
		}
		return program;
	</pre>
	<p class="break ti1">所有准备工作完成后，创建一个三角形。</p>
	<canvas id="webgl" width="630px" height="630px" class="block"></canvas>
	<p class="text-center red">图1</p>
	<p class="break ti1">
		如图1所示，是一个三角形，通过三个定点连接并填充绘制而成。首先绑定定点着色器中的a_Position参数，然后写入Float32Array类型的顶点数组，给顶点设置颜色，否则看不到
		效果。
	</p>
	<pre>
		// 将缓冲区对象分配给a_Position变量
		gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
		// 连接a_Position变量和分配给它的缓冲区对象
		gl.enableVertexAttribArray(a_Position);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
	</pre>
	<div class="text-center">
		<button class="btn" id="next">下一节</button>
	</div>
</body>
	<script src="../../../js/webgl-demo/part1/index.js?<%= new Date().getTime() %>"></script>
</html>