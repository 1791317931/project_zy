function getScript(id, type) {
	var dom = document.getElementById(id);
	return dom && dom.innerHTML;
}

//使用片元着色器，对正方体所有面的每一个点计算光照效果
var VSHADER_SOURCE = getScript('vSource'),
FSHADER_SOURCE = getScript('fSource');

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
	
	// 开启隐藏面消除功能	DEPTH_TEST:隐藏面消除	BLEND:混合	POLYGON_OFFSET_FILL:多边形位移	还有更多值
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	
	var mvpMatrix = new Matrix4(),
	modelMatrix = new Matrix4(),
	// 用来变化法向量的矩阵
	normalMatrix = new Matrix4(),
	viewProjMatrix = new Matrix4(),
	u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix'),
	u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor'),
	u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight'),
	u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix'),
	u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix'),
	u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
	
	// 设置光线颜色
	gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
	// 设置光源位置
	gl.uniform3f(u_LightPosition, 2.0, 2.0, 2.0);
	
	// 设置环境光，特别弱
	gl.uniform3f(u_AmbientLight, 0.1, 0.1, 0.1);
	
	// 沿Z轴旋转90deg
	modelMatrix.setRotate(90, 0, 1, 0);
//	modelMatrix.setRotate(0, 0, 1, 0);
	
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	
	mvpMatrix.setPerspective(45, canvas.width / canvas.height, 1, 200);
	mvpMatrix.lookAt(3.0, 3, 7, 0, 0, 0, 0, 1, 0);
	
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
	
	normalMatrix.setInverseOf(modelMatrix);
	normalMatrix.transpose();
	gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);
	
	viewProjMatrix.setPerspective(50.0, canvas.width / canvas.height, 1.0, 100.0);
	viewProjMatrix.lookAt(20.0, 10.0, 30.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
	
	document.onkeydown = function(e) {
		keydown(e, gl, 36, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
	}
	
	draw(gl, 36, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
	// drawElements(mode, count, type, offset)
//	gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
}

function initVertexBuffers(gl) {
	var vertices = new Float32Array([
	1.5, 5.0, 1.5, -1.5, 5.0, 1.5, -1.5, -5.0, 1.5, 1.5, -5.0, 1.5, // 前
	-1.5, 5.0, -1.5, 1.5, 5.0, -1.5, 1.5, -5.0, -1.5, -1.5, -5.0, -1.5, // 后
	-1.5, 5.0, 1.5, -1.5, 5.0, -1.5, -1.5, -5.0, -1.5, -1.5, -5.0, 1.5, // 左
	1.5, 5.0, 1.5, 1.5, -5.0, 1.5, 1.5, -5.0, -1.5, 1.5, 5.0, -1.5, // 右
	1.5, 5.0, 1.5, 1.5, 5.0, -1.5, -1.5, 5.0, -1.5, -1.5, 5.0, 1.5, // 上
	-1.5, -5.0, 1.5, 1.5, -5.0, 1.5, 1.5, -5.0, -1.5, -1.5, -5.0, -1.5 // 下
	]),
	colors = new Float32Array([
	/*1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0*/
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
	// 法向量
	normals = new Float32Array([
	0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, // 前  法线
	0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, // 后 法线
	-1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // 左  法线
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, // 右 法线
	0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // 上 法线
	0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0 // 下 法线
	]),
	indexBuffer = gl.createBuffer();
	
	initArrayBuffer(gl, vertices, 3, gl.FLOAT, 'a_Position');
	initArrayBuffer(gl, colors, 3, gl.FLOAT, 'a_Color');
	initArrayBuffer(gl, normals, 3, gl.FLOAT, 'a_Normal');
	
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

//每次按键转动的角度
var ANGLE_STEP = 3.0,
// arm1的当前角度
g_arm1Angle = 90.0,
// joint1的当前角度（即arm2的当前角度）
g_joint1Angle = 0.0;
function keydown(e, gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix) {
	switch(e.keyCode) {
		case 37:
			g_arm1Angle = (g_arm1Angle - ANGLE_STEP) % 360;
			break;
		case 39:
			g_arm1Angle = (g_arm1Angle + ANGLE_STEP) % 360;
			break;
		case 38:
			if(g_joint1Angle < 50.0) {
				g_joint1Angle += ANGLE_STEP;
			}
			break;
		case 40:
			if(g_joint1Angle > -50.0) {
				g_joint1Angle -= ANGLE_STEP;
			}
			break;
		default: return;
	}
	draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
}

var g_modelMatrix = new Matrix4(), g_mvpMatrix = new Matrix4();
function draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix) {
	
	// 清除深度缓冲区
	// gl.disable(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	
	// Arm1
	var arm1Length = 10.0;
	g_modelMatrix.setTranslate(0.0, -5.0, 0.0);
//	g_modelMatrix.setTranslate(0.0, 0.0, 0.0);
	g_modelMatrix.rotate(g_arm1Angle, 0.0, 1.0, 0.0);
//	g_modelMatrix.scale(2.0, 4.0, 2.0);
	drawBox(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
	
	//Arm2
	// 移至joint1处
//	g_modelMatrix.translate(0.0, arm1Length, 0.0);
	g_modelMatrix.translate(0.0, 9.0, 0.0);
	g_modelMatrix.rotate(g_joint1Angle, 0.0, 0.0, 1.0);
//	g_modelMatrix.scale(1.3, 1.0, 1.3);
	g_modelMatrix.scale(2.0, 1.0, 2.0);
	drawBox(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix);
}

// 法线的旋转矩阵
var g_normalMatrix = new Matrix4();
function drawBox(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix) {
	// 计算模型视图矩阵并传给u_MvpMatrix变量
	g_mvpMatrix.set(viewProjMatrix);
	g_mvpMatrix.multiply(g_modelMatrix);
	gl.uniformMatrix4fv(u_MvpMatrix, false, g_mvpMatrix.elements);
	// 计算法线变换矩阵并传给u_NormalMatrix
	g_normalMatrix.setInverseOf(g_modelMatrix);
	g_normalMatrix.transpose();
	gl.uniformMatrix4fv(u_NormalMatrix, false, g_normalMatrix.elements);
	gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}

main();
// 362
// initShaders()-->WEBGL原生API将字符串形式的GSEL ES代码编译为显卡中运行的着色器程序