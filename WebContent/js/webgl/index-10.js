function getScript(id, type) {
	var dom = document.getElementById(id);
	return dom && dom.innerHTML;
}

//使用片元着色器，对正方体所有面的每一个点计算光照效果
var VSHADER_SOURCE = getScript('vSource'),
FSHADER_SOURCE = getScript('fSource');

// 某一点雾化程度定义为雾化因子，并在线性雾化公式中计算出来，与opacity原理差不多
// 雾化因子 = （终点 - 当前点与视点间的距离） / （终点 - 起点）
// 起点 <= 当前点与视点间的距离 <= 终点

// 在片元着色器中根据雾化因子计算片元的颜色
// 片元颜色 = 物体表面颜色 X 雾化因子 + 雾的颜色 X （1 - 雾化因子）

/*function main() {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	if(!gl) {
		return;
	}
	if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.error('初始化着色器失败');
		return;
	}
	initVertexBuffers(gl);
	
	var fogColor = new Float32Array([0.137, 0.231, 0.423]),
	// 雾化的起点和终点与视点间的距离[起点距离, 终点距离]
	fogDist = new Float32Array([70, 80]),
	// 视点坐标
	eye = new Float32Array([10, 20, 35]);
	
	var mvpMatrix = new Matrix4(),
	modelMatrix = new Matrix4(),
	u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix'),
	u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix'),
	u_FogColor = gl.getUniformLocation(gl.program, 'u_FogColor'),
	u_Eye = gl.getUniformLocation(gl.program, 'u_Eye'),
	u_FogDist = gl.getUniformLocation(gl.program, 'u_FogDist');
	
	// 设置背景色，并开启隐藏面消除功能
	gl.clearColor(fogColor[0], fogColor[1], fogColor[2], 1.0);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	
	modelMatrix.setRotate(90, 0, 1, 0);
	
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	
	mvpMatrix.setPerspective(30, canvas.width / canvas.height, 1, 50);
	mvpMatrix.lookAt(eye[0], eye[1], eye[2], 0, 2, 0, 0, 1, 0);
	
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
	
	// 将雾的颜色，起点与终点，视点坐标传给对应的变量
	gl.uniform3fv(u_FogColor, fogColor);
	gl.uniform2fv(u_FogDist, fogDist);
	gl.uniform4fv(u_Eye, eye);
	
	document.onkeydown = function(e) {
		keydown(e, gl, u_FogDist, fogDist, fogColor);
	};
	
	gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
}

function keydown(e, gl, u_FogDist, fogDist, fogColor) {
	switch(e.keyCode) {
		case 38:
			fogDist[1]++;
			break;
		case 40:
			var fogDistY = fogDist[1];
			if(fogDistY > 44) {
				fogDist[1]--;
			}
			break;
		default: return;
	}
	gl.clearColor(fogColor[0], fogColor[1], fogColor[2], 1.0);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.uniform2fv(u_FogDist, fogDist);
//	console.log(fogDist[1]);
	
	gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
}

function initVertexBuffers(gl) {
	var vertices = new Float32Array([
	1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, // 前
	-1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, // 后
	-1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, // 左
	1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, // 右
	1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, // 上
	-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0 // 下
	]),
	colors = new Float32Array([
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0,
	1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
	0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
	1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0
	1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
	1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
	1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
	1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
	1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
	1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0
	]),
	// 顶点索引
	indices = new Uint8Array([
	0, 1, 2, 0, 2, 3, // 前
	4, 5, 6, 4, 6, 7, // 后
	8, 9, 10, 8, 10, 11, // 左
	12, 13, 14, 12, 14, 15, // 右
	16, 17, 18, 16, 18, 19, // 上
	20, 21, 22, 20, 22, 23  // 下
	]),
	indexBuffer = gl.createBuffer();
	
	initArrayBuffer(gl, vertices, 3, gl.FLOAT, 'a_Position');
	initArrayBuffer(gl, colors, 3, gl.FLOAT, 'a_Color');
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
}

function initArrayBuffer(gl, data, num, type, attribute) {
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
	
	var a_attribute = gl.getAttribLocation(gl.program, attribute);
	gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
	gl.enableVertexAttribArray(a_attribute);
}*/

// gl_FragCoord 片元的窗口坐标
// gl_PointCoord 片元在被绘制的点内的坐标(0.0--1.0)
/*var VSHADER_SOURCE = getScript('vSource-1'),
FSHADER_SOURCE = getScript('fSource-1');

function main() {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	if(!gl) {
		return;
	}
	if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.error('初始化着色器失败');
		return;
	}
	initVertexBuffers(gl);
	
	gl.clearColor(0, 0, 0, 1.0);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	
	gl.drawArrays(gl.POINTS, 0, 3);
}

function initVertexBuffers(gl) {
	var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
	// 创建缓冲区对象
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer) {
		return -1;
	}
	// 将缓冲区对象绑定到目标
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	// 向缓冲区对象写入数据	STATIC_DRAW、STREAM_DRAW、DYNAMIC_DRAW
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	
	// 将缓冲区对象分配给a_Position变量
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	// 连接a_Position变量与分配给它的缓冲区对象
	gl.enableVertexAttribArray(a_Position);
}*/

// alpha混合
/*var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute vec4 a_Color;\n'
	+ 'uniform mat4 u_ViewMatrix;\n'
	+ 'varying vec4 v_Color;\n'
	+ 'void main() {\n'
	+ 'gl_Position = u_ViewMatrix * a_Position;\n'
	+ 'v_Color = a_Color;\n'
	+ '}\n';
	
var FSHADER_SOURCE = 'precision mediump float;\n'
	+ 'varying vec4 v_Color;\n'
	+ 'void main() {\n'
	+ 'gl_FragColor = v_Color;\n'
	+ '}\n';

function main() {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	if(!gl) {
		return;
	}
	if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		return;
	}
	initVertexBuffers(gl);
	
	var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
	var viewMatrix = new Matrix4();
	viewMatrix.setLookAt(0.25, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
	gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
	
	// 开启混合
	gl.enable(gl.BLEND);
	// 设置混合函数blendFunc(src_factor, dst_factor)	混合后的颜色 = 源颜色 X src_factor + 目标颜色 X dst_factor
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function initVertexBuffers(gl) {
	var verticesColors = new Float32Array([
	-0.5, 0.5, -0.5, 0.4, 1.0, 0.4, 0.4,
	0.5, 0.5, -0.5, 0.4, 1.0, 0.4, 0.4,
	0, -0.5, 0, 1.0, 0.4, 0.4, 0.4,
	
	-0.5, 0.5, -0.5, 1.0, 1.0, 1.0, 1.0,
	0.5, 0.5, -0.5, 1.0, 1.0, 1.0, 1.0,
	0, -0.5, 0, 1.0, 1.0, 1.0, 1.0
	]),
	vertexColorbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
	
	var FSIZE = verticesColors.BYTES_PER_ELEMENT,
	a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 7, 0);
	gl.enableVertexAttribArray(a_Position);
	
	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, FSIZE * 7, FSIZE * 3);
	gl.enableVertexAttribArray(a_Color);
}*/

// 加法混合	glBlendFunc(Gl_SRC_ALPHA, Gl_ONE)
var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute vec4 a_Color;\n'
	+ 'varying vec4 v_Color;\n'
	+ 'uniform mat4 u_MvpMatrix;\n'
	+ 'void main() {\n'
	+ 'gl_Position = u_MvpMatrix * a_Position;\n'
	+ 'v_Color = a_Color;\n'
	+ '}\n';
	
var FSHADER_SOURCE = 'precision mediump float;\n'
	+ 'varying vec4 v_Color;\n'
	+ 'void main() {\n'
	+ 'gl_FragColor = v_Color;\n'
	+ '}\n';

function main() {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	if(!gl) {
		return;
	}
	if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		return;
	}
	initVertexBuffers(gl);
	
	// 开启隐藏面消除功能	DEPTH_TEST:隐藏面消除	BLEND:混合	POLYGON_OFFSET_FILL:多边形位移	还有更多值
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
//	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINS_SRC_ALPHA);
	
	var mvpMatrix = new Matrix4(),
	u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
	
	draw(gl, u_MvpMatrix, mvpMatrix, canvas);
	document.onkeydown = function(e) {
		keydown(e, gl, u_MvpMatrix, mvpMatrix, canvas);
	};
}

function draw(gl, u_MvpMatrix, mvpMatrix, canvas) {
	mvpMatrix.setPerspective(30, canvas.width / canvas.height, 1, 200);
	mvpMatrix.lookAt(eyeX, eyeY, eyeZ, 0, 0, 0, 0, 0, 1);
	
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
	
	// 清除深度缓冲区
	// gl.disable(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	
	// drawElements(mode, count, type, offset)
	gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
}

var eyeX = 2, eyeY = 3, eyeZ = 5;
function keydown(e, gl, u_MvpMatrix, mvpMatrix, canvas) {
	// 左37
	// 上 38
	// 右39
	// 下40
	switch(e.keyCode) {
		case 37: eyeX--; break;
		case 39: eyeX++; break;
		case 38: eyeY++; break;
		case 40: eyeY--; break;
		default: break;
	}
	draw(gl, u_MvpMatrix, mvpMatrix, canvas);
}

function initVertexBuffers(gl) {
	var vertices = new Float32Array([
	1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, // 前
	-1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, // 后
	-1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, // 左
	1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, // 右
	1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, // 上
	-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0 // 下
	]),
	colors = new Float32Array([
	1.0, 1.0, 0.0, 0.5, 1.0, 1.0, 0.0, 0.5, 1.0, 1.0, 0.0, 0.5, 1.0, 1.0, 0.0, 0.5,
	1.0, 0.0, 0.0, 0.5, 1.0, 0.0, 0.0, 0.5, 1.0, 0.0, 0.0, 0.5, 1.0, 0.0, 0.0, 0.5,
	0.0, 1.0, 0.0, 0.5, 0.0, 1.0, 0.0, 0.5, 0.0, 1.0, 0.0, 0.5, 0.0, 1.0, 0.0, 0.5,
	0.0, 0.0, 1.0, 0.5, 0.0, 0.0, 1.0, 0.5, 0.0, 0.0, 1.0, 0.5, 0.0, 0.0, 1.0, 0.5,
	1.0, 0.0, 1.0, 0.5, 1.0, 0.0, 1.0, 0.5, 1.0, 0.0, 1.0, 0.5, 1.0, 0.0, 1.0, 0.5,
	1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0
	]),
	// 顶点索引
	indices = new Uint8Array([
	0, 1, 2, 0, 2, 3, // 前
	4, 5, 6, 4, 6, 7, // 后
	8, 9, 10, 8, 10, 11, // 左
	12, 13, 14, 12, 14, 15, // 右
	16, 17, 18, 16, 18, 19, // 上
	20, 21, 22, 20, 22, 23  // 下
	]),
	indexBuffer = gl.createBuffer();
	
	initArrayBuffer(gl, vertices, 3, gl.FLOAT, 'a_Position');
	initArrayBuffer(gl, colors, 4, gl.FLOAT, 'a_Color');
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
}

function initArrayBuffer(gl, data, num, type, attribute) {
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
	
	var a_attribute = gl.getAttribLocation(gl.program, attribute);
	gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
	gl.enableVertexAttribArray(a_attribute);
}

main();
// TODO 373--390	HUD
// 402


/*严格模式是一种将更好的错误检查引入代码中的方法。 在使用严格模式时，无法使用隐式声明的变量、将值赋给只读属性或将属性添加到不可扩展的对象等
1、  严格模式的目的
   1） 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为
2）消除代码运行的一些不安全之处，保证代码运行的安全
3） 提高编译器效率，增加运行速度
4） 为未来新版本的Javascript做好铺垫
2、声明严格模式
    可以通过在文件、程序或函数的开头添加 "use strict"; 来声明严格模式。 此类声明称作“指令序言”。 
    严格模式声明的范围取决于其上下文。 如果在全局上下文（函数的范围之外）中声明严格模式，则程序中的所有代码都处于严格模式。
    如果在函数中声明严格模式，则函数中的所有代码都处于严格模式。
*/