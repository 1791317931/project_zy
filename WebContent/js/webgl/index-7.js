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
	viewMatrix.setLookAt(0.20, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
	gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
	
	gl.drawArrays(gl.TRIANGLES, 0, 9);
}*/

/*var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute vec4 a_Color;\n'
	+ 'uniform mat4 u_ViewMatrix;\n'
	+ 'uniform mat4 u_ModelMatrix;\n'
	+ 'varying vec4 v_Color;\n'
	+ 'void main() {\n'
	+ 'gl_Position = u_ViewMatrix * u_ModelMatrix * a_Position;\n'
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
	var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	
	var viewMatrix = new Matrix4();
	viewMatrix.setLookAt(0.20, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
	var modelMatrix = new Matrix4();
	modelMatrix.setRotate(-10, 0, 0, 1);
	gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	
	gl.drawArrays(gl.TRIANGLES, 0, 9);
}*/

/*var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute vec4 a_Color;\n'
	+ 'uniform mat4 u_ModelViewMatrix;\n'
	+ 'varying vec4 v_Color;\n'
	+ 'void main() {\n'
	+ 'gl_Position = u_ModelViewMatrix * a_Position;\n'
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
	
	var u_ModelViewMatrix = gl.getUniformLocation(gl.program, 'u_ModelViewMatrix');
	
	var viewMatrix = new Matrix4();
	viewMatrix.setLookAt(0.20, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
	var modelMatrix = new Matrix4();
	modelMatrix.setRotate(-10, 0, 0, 1);
	var modelViewMatrix = viewMatrix.multiply(modelMatrix);
	var modelViewMatrix = new Matrix4();
	modelViewMatrix.setLookAt(0.20, 0.25, 0.25, 0, 0, 0, 0, 1, 0).rotate(-10, 0, 0, 1);
	
	gl.uniformMatrix4fv(u_ModelViewMatrix, false, modelViewMatrix.elements);
	
	gl.drawArrays(gl.TRIANGLES, 0, 9);
}*/

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
	viewMatrix.setLookAt(0.20, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
	var modelMatrix = new Matrix4();
	modelMatrix.setRotate(-10, 0, 0, 1);
	var modelViewMatrix = viewMatrix.multiply(modelMatrix);

	document.onkeydown = function(e) {
		keydown(e, gl, u_ViewMatrix, viewMatrix);
	};
	draw(gl, u_ViewMatrix, viewMatrix);
	
	gl.drawArrays(gl.TRIANGLES, 0, 9);
}

var g_eyeX = 0.20, g_eyeY = 0.25, g_eyeZ = 0.25;
function keydown(e, gl, u_ViewMatrix, viewMatrix) {
	if(e.keyCode == 39) {
		g_eyeX += 0.01;
	} else if (e.keyCode == 37) {
		g_eyeX -= 0.01;
	} else {
		return;
	}
	draw(gl, u_ViewMatrix, viewMatrix);
}

function draw(gl, u_ViewMatrix, viewMatrix) {
	viewMatrix.setLookAt(g_eyeX, g_eyeY, g_eyeZ, 0, 0, 0, 0, 1, 0);
	gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 9);
}*/

/*var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute vec4 a_Color;\n'
	+ 'uniform mat4 u_ProjMatrix;\n'
	+ 'varying vec4 v_Color;\n'
	+ 'void main() {\n'
	+ 'gl_Position = u_ProjMatrix * a_Position;\n'
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
	
	var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
	var projMatrix = new Matrix4();

	document.onkeydown = function(e) {
		keydown(e, gl, u_ProjMatrix, projMatrix);
	};
	draw(gl, u_ProjMatrix, projMatrix);
	
	gl.drawArrays(gl.TRIANGLES, 0, 9);
}

var g_eyeX = 0.25, g_eyeY = 0.25, g_eyeZ = 0.25, g_near = 0.0, g_far = 0.5;
function keydown(e, gl, u_ProjMatrix, projMatrix) {
	switch(e.keyCode) {
		// 向左按键
		case 37: g_near -= 0.01; break;
		// 向右按键
		case 39: g_near += 0.01; break;
		// 向上按键
		case 38: g_far += 0.01; break;
		// 向下按键
		case 40: g_far -= 0.01; break;
		default: break;
	}
	console.log(g_near, g_far);
	draw(gl, u_ProjMatrix, projMatrix);
}

function draw(gl, u_ProjMatrix, projMatrix) {
	projMatrix.setOrtho(-1, 1, -1, 1, g_near, g_far);
	gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 9);
}*/

/*var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute vec4 a_Color;\n'
	+ 'uniform mat4 u_ViewMatrix;\n'
	+ 'uniform mat4 u_ProjMatrix;\n'
	+ 'varying vec4 v_Color;\n'
	+ 'void main() {\n'
	+ 'gl_Position = u_ProjMatrix * u_ViewMatrix * a_Position;\n'
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

	document.onkeydown = function(e) {
		keydown(e, gl, u_ViewMatrix, viewMatrix);
	};
	
	var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
	var projMatrix = new Matrix4();
	// setOrtho(left, right, bottom, top, near, far)
	projMatrix.setOrtho(-1.0, 1.0, -1.0, 1.0, 0.0, 2.0);
	gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
	draw(gl, u_ViewMatrix, viewMatrix);
	
	gl.drawArrays(gl.TRIANGLES, 0, 9);
}

var g_eyeX = 0.20, g_eyeY = 0.25, g_eyeZ = 0.25;
function keydown(e, gl, u_ViewMatrix, viewMatrix) {
	if(e.keyCode == 39) {
		g_eyeX += 0.01;
	} else if (e.keyCode == 37) {
		g_eyeX -= 0.01;
	} else {
		return;
	}
	draw(gl, u_ViewMatrix, viewMatrix);
}

function draw(gl, u_ViewMatrix, viewMatrix) {
	viewMatrix.setLookAt(g_eyeX, g_eyeY, g_eyeZ, 0, 0, 0, 0, 1, 0);
	gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 9);
}*/

/*var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute vec4 a_Color;\n'
	+ 'uniform mat4 u_ViewMatrix;\n'
	+ 'uniform mat4 u_ProjMatrix;\n'
	+ 'varying vec4 v_Color;\n'
	+ 'void main() {\n'
	+ 'gl_Position = u_ProjMatrix * u_ViewMatrix * a_Position;\n'
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
	// 视图矩阵
	var viewMatrix = new Matrix4();

	document.onkeydown = function(e) {
		keydown(e, gl, u_ViewMatrix, viewMatrix);
	};
	
	var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
	// 投影矩阵
	var projMatrix = new Matrix4();
	// setLookAt(eyeX(视点), eyeY, eyeZ, atX(观察点), atY, atZ, upX(与setPerspective-->fov配合), upY, upZ)
	viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
	// setPerspective(fov(垂直视角，可视空间顶面和底面间的夹角), aspect(近裁切面的宽高比), near(>0), far(>0))
	projMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);
	gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
	gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);

	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 18);
}

function initVertexBuffers(gl) {
	var verticesColors = new Float32Array([
	0.75, 1.0, -4.0, 0.4, 1.0, 0.4,
	0.25, -1.0, -4.0, 0.4, 1.0, 0.4,
	1.25, -1.0, -4.0, 1.0, 0.4, 0.4,
	
	0.75, 1.0, -2.0, 1.0, 1.0, 0.4,
	0.25, -1.0, -2.0, 1.0, 1.0, 0.4,
	1.25, -1.0, -2.0, 1.0, 0.4, 0.4,
	
	0.75, 1.0, 0.0, 0.4, 0.4, 1.0,
	0.25, -1.0, 0.0, 0.4, 0.4, 1.0,
	1.25, -1.0, 0.0, 1.0, 0.4, 0.4,
	
	-0.75, 1.0, -4.0, 0.4, 1.0, 0.4,
	-1.25, -1.0, -4.0, 0.4, 1.0, 0.4,
	-0.25, -1.0, -4.0, 1.0, 0.4, 0.4,
	
	-0.75, 1.0, -2.0, 1.0, 1.0, 0.4,
	-1.25, -1.0, -2.0, 1.0, 1.0, 0.4,
	-0.25, -1.0, -2.0, 1.0, 0.4, 0.4,
	
	-0.75, 1.0, 0.0, 0.4, 0.4, 1.0,
	-1.25, -1.0, 0.0, 0.4, 0.4, 1.0,
	-0.25, -1.0, 0.0, 1.0, 0.4, 0.4
	]),
	vertexColorbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
	
	var FSIZE = verticesColors.BYTES_PER_ELEMENT,
	a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
	gl.enableVertexAttribArray(a_Position);
	
	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
	gl.enableVertexAttribArray(a_Color);
}*/

/*var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute vec4 a_Color;\n'
	+ 'uniform mat4 u_ViewMatrix;\n'
	+ 'uniform mat4 u_ProjMatrix;\n'
	+ 'uniform mat4 u_ModelMatrix;\n'
	+ 'varying vec4 v_Color;\n'
	+ 'void main() {\n'
	+ 'gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n'
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
	
	document.onkeydown = function(e) {
		keydown(e, gl, u_ViewMatrix, viewMatrix);
	};
	
	var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix'),
	u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix'),
	u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	
	// 视图矩阵
	var viewMatrix = new Matrix4(),
	// 投影矩阵
	projMatrix = new Matrix4(),
	modelMatrix = new Matrix4();
	// setLookAt(eyeX(视点), eyeY, eyeZ, atX(观察点), atY, atZ, upX(上方点), upY, upZ)
	viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
	// setPerspective(fov(垂直视角，可视空间顶面和底面间的夹角), aspect(近裁切面的宽高比), near(>0), far(>0))
	projMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);
	
	gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
	gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
	
	modelMatrix.setTranslate(0, 0, -10);
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 9);
	
	modelMatrix.setTranslate(0.75, 0, 0);
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

	gl.drawArrays(gl.TRIANGLES, 0, 9);
	
	modelMatrix.setTranslate(-0.75, 0, 0);
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	
	gl.drawArrays(gl.TRIANGLES, 0, 9);
}*/

/*var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute vec4 a_Color;\n'
	+ 'uniform mat4 u_ViewMatrix;\n'
	+ 'uniform mat4 u_ProjMatrix;\n'
	+ 'uniform mat4 u_ModelMatrix;\n'
	+ 'uniform mat4 u_MvpMatrix;\n'
	+ 'varying vec4 v_Color;\n'
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
	
	document.onkeydown = function(e) {
		keydown(e, gl, u_ViewMatrix, viewMatrix);
	};
	
	var	u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
	
	// 视图矩阵
	var viewMatrix = new Matrix4(),
	// 投影矩阵
	projMatrix = new Matrix4(),
	modelMatrix = new Matrix4(),
	mvpMatrix = new Matrix4();
	
	modelMatrix.setTranslate(-0.75, 0, 0);
	// setLookAt(eyeX(视点), eyeY, eyeZ, atX(观察点), atY, atZ, upX(上方点), upY, upZ)
	viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
	// setPerspective(fov(垂直视角，可视空间顶面和底面间的夹角), aspect(近裁切面的宽高比), near(>0), far(>0))
	projMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);
	
	
	// 开启隐藏面消除功能	DEPTH_TEST:隐藏面消除	BLEND:混合	POLYGON_OFFSET_FILL:多边形位移	还有更多值
	gl.enable(gl.DEPTH_TEST);
	// 清除深度缓冲区
	// gl.disable(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	
	// 投影矩阵 X 视图矩阵 X 模型矩阵
	mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
	gl.drawArrays(gl.TRIANGLES, 0, 9);
	
	modelMatrix.setTranslate(0.75, 0, 0);
	mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
	gl.drawArrays(gl.TRIANGLES, 0, 9);
}

function initVertexBuffers(gl) {
	var verticesColors = new Float32Array([
    0.0, 1.0, 0.0, 0.4, 0.4, 1.0,
    -0.5, -1.0, 0.0, 0.4, 0.4, 1.0,
    0.5, -1.0, 0.0, 1.0, 0.4, 0.4,
	
	0.0, 1.0, -2.0, 1.0, 1.0, 0.4,
	-0.5, -1.0, -2.0, 1.0, 1.0, 0.4,
	0.5, -1.0, -2.0, 1.0, 0.4, 0.4,
	
	0.0, 1.0, -4.0, 0.4, 1.0, 0.4,
	-0.5, -1.0, -4.0, 0.4, 1.0, 0.4,
	0.5, -1.0, -4.0, 1.0, 0.4, 0.4
	]),
	vertexColorbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
	
	var FSIZE = verticesColors.BYTES_PER_ELEMENT,
	a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
	gl.enableVertexAttribArray(a_Position);
	
	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
	gl.enableVertexAttribArray(a_Color);
}*/

/*var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute vec4 a_Color;\n'
	+ 'varying vec4 v_Color;\n'
	+ 'void main() {\n'
	+ 'gl_Position = a_Position;\n'
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
	gl.enable(gl.POLYGON_OFFSET_FILL);
	// 清除深度缓冲区
	// gl.disable(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	
	// 设置多边形偏移 
	// polygonOffset(factor, units) 指定加到每个顶点绘制后Z值上的偏移量，偏移量按照公式m*factor+r*units计算，其中m表示顶点所在表面相对于观察者的视线的角度，
	// 而r表示硬件能够区分两个Z值之差的最小值
	gl.polygonOffset(1.0, 1.0);
	
	gl.drawArrays(gl.TRIANGLES, 3, 3);
}

function initVertexBuffers(gl) {
	var verticesColors = new Float32Array([
    0.0, 2.5, -0.5, 0.0, 1.0, 0.0,
    -2.5, -2.5, -0.5, 0.0, 1.0, 0.0,
    2.5, -2.5, -0.5, 1.0, 0.0, 0.0,
    
    0.0, 2.5, -0.5, 1.0, 0.0, 0.0,
    -2.5, -2.5, -0.5, 1.0, 1.0, 0.0,
    2.5, -2.5, -0.5, 1.0, 1.0, 0.0
	]),
	vertexColorbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
	
	var FSIZE = verticesColors.BYTES_PER_ELEMENT,
	a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
	gl.enableVertexAttribArray(a_Position);
	
	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
	gl.enableVertexAttribArray(a_Color);
}*/

/*var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
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
	gl.enable(gl.DEPTH_TEST);
	
	var mvpMatrix = new Matrix4(),
	u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
	mvpMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);
	mvpMatrix.lookAt(3, 5, 7, 0, 0, 0, 0, 1, 0);
	
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
	
	// 清除深度缓冲区
	// gl.disable(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	
	// drawElements(mode, count, type, offset)
	gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
}

function initVertexBuffers(gl) {
	var verticesColors = new Float32Array([
	1.0, 1.0, 1.0, 1.0, 1.0, 1.0, // V0 白色
	-1.0, 1.0, 1.0, 1.0, 0.0, 1.0, // V1 品红色
	-1.0, -1.0, 1.0, 1.0, 0.0, 0.0, // V2 红色
	1.0, -1.0, 1.0, 0.0, 0.0, 1.0, // V3 蓝色
	1.0, -1.0, -1.0, 1.0, 1.0, 0.0, // V4 黄色
	1.0, 1.0, -1.0, 1.0, 0.0, 1.0, // V5 品红色
	-1.0, 1.0, -1.0, 1.0, 0.0, 0.0, // V6红色
	-1.0, -1.0, -1.0, 1.0, 0.0, 0.0 // V7红色
	]),
	// 顶点索引
	indices = new Uint8Array([
	0, 1, 2, 0, 2, 3, // 前
	4, 5, 6, 4, 6, 7, // 后
	1, 2, 7, 1, 7, 6, // 左
	0, 3, 4, 0, 4, 5, //右
	0, 1, 6, 0, 6, 5, // 上
	2, 3, 4, 2, 4, 7 // 下
	]),
	vertexColorbuffer = gl.createBuffer(),
	indexBuffer = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
	
	var FSIZE = verticesColors.BYTES_PER_ELEMENT,
	a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
	gl.enableVertexAttribArray(a_Position);
	
	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
	gl.enableVertexAttribArray(a_Color);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
}*/

/*var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
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
	
	var mvpMatrix = new Matrix4(),
	u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
	
	draw(gl, u_MvpMatrix, mvpMatrix, canvas);
	document.onkeydown = function(e) {
		keydown(e, gl, u_MvpMatrix, mvpMatrix, canvas);
	};
}

function draw(gl, u_MvpMatrix, mvpMatrix, canvas) {
	console.log('eyeX=' + eyeX, 'eyeY=' + eyeY, 'eyeZ=' + eyeZ);
	mvpMatrix.setPerspective(45, canvas.width / canvas.height, 1, 200);
	mvpMatrix.lookAt(eyeX, eyeY, eyeZ, 0, 0, 0, 0, 1, 0);
	
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
	
	// 清除深度缓冲区
	// gl.disable(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	
	// drawElements(mode, count, type, offset)
	gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
}

var eyeX = 2, eyeY = 2, eyeZ = 2;
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
	1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
	0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
	1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0
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

main();
// 311