// 漫反射光颜色 = 入射光颜色（R, G, B）X 表面基底色 X cosΘ
// 环境反射光颜色 = 入射光颜色 X 表面基底色
// 表面的反射光颜色 = 漫反射光颜色 + 环境反射光颜色
function getScript(id, type) {
	var dom = document.getElementById(id);
	return dom && dom.innerHTML;
}

/*var VSHADER_SOURCE = getScript('vSource'),
FSHADER_SOURCE = getScript('fSource');*/

/*function main() {
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
	u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix'),
	u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor'),
	u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
	
	// 设置光线颜色
	gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
	// 设置光线方向
//	var lightDirection = new Vector3([0.5, 3.0, 4.0]);
	var lightDirection = new Vector3([0.9, 3.0, 4.0]);
	// 归一化
	lightDirection.normalize();
	gl.uniform3fv(u_LightDirection, lightDirection.elements);
	
	mvpMatrix.setPerspective(45, canvas.width / canvas.height, 1, 200);
	mvpMatrix.lookAt(9, 3, 7, 0, 0, 0, 0, 1, 0);
	
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
	
	// 清除深度缓冲区
	// gl.disable(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	
	// drawElements(mode, count, type, offset)
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
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
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
}*/

/*function main() {
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
	u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix'),
	u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor'),
	u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection'),
	u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');
	
	// 设置光线颜色
	gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
	// 设置光线方向
//	var lightDirection = new Vector3([0.5, 3.0, 4.0]);
	var lightDirection = new Vector3([3.0, 2.5, 1.5]);
	// 归一化
	lightDirection.normalize();
	gl.uniform3fv(u_LightDirection, lightDirection.elements);
	
	// 设置环境光，特别弱
	gl.uniform3f(u_AmbientLight, 0.1, 0.1, 0.1);
	
	mvpMatrix.setPerspective(45, canvas.width / canvas.height, 1, 200);
	mvpMatrix.lookAt(9, 3, 7, 0, 0, 0, 0, 1, 0);
	
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
	
	// 清除深度缓冲区
	// gl.disable(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	
	// drawElements(mode, count, type, offset)
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
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
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
}*/

// Matrix4.setInverseOf(m)	使自身成为矩阵m的逆矩阵
// Matrix4.transpose()		对自身进行转置操作，并将自身设为转置后的结果
// 用法向量乘以模型矩阵的逆转置矩阵，就可以求得转换后的法向量。

// 平行光 漫反射 环境光
/*function main() {
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
	modelMatrix = new Matrix4(),
	// 用来变化法向量的矩阵
	normalMatrix = new Matrix4(),
	u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix'),
	u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor'),
	u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection'),
	u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight'),
	u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
	
	// 设置光线颜色
	gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
	// 设置光线方向
	var lightDirection = new Vector3([0.5, 3.0, 4.0]);
//	var lightDirection = new Vector3([0.1, 3.0, 0.1]);
	// 归一化
	lightDirection.normalize();
	gl.uniform3fv(u_LightDirection, lightDirection.elements);
	
	// 设置环境光，特别弱
	gl.uniform3f(u_AmbientLight, 0.1, 0.1, 0.1);
	
	// 计算模型矩阵
	// 沿Y轴平移
	modelMatrix.setTranslate(0, 1, 0);
	// 沿Z轴旋转90deg
	modelMatrix.rotate(90, 0, 0, 1);
	
	mvpMatrix.setPerspective(45, canvas.width / canvas.height, 1, 200);
	mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
	
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
	
	normalMatrix.setInverseOf(modelMatrix);
	normalMatrix.transpose();
	gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);
	
	// 清除深度缓冲区
	// gl.disable(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	
	// drawElements(mode, count, type, offset)
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
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
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
}*/

/*// 使用顶点着色器
var VSHADER_SOURCE = getScript('vSource-1'),
FSHADER_SOURCE = getScript('fSource-1');*/

//使用片元着色器，对正方体所有面的每一个点计算光照效果
var VSHADER_SOURCE = getScript('vSource-2'),
FSHADER_SOURCE = getScript('fSource-2');

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
	u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix'),
	u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor'),
	u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight'),
	u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix'),
	u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix'),
	u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
	
	// 设置光线颜色
	gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
	// 设置光源位置
	gl.uniform3f(u_LightPosition, 2.0, 3.0, 2.0);
	
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
	
	// 清除深度缓冲区
	// gl.disable(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	
	// drawElements(mode, count, type, offset)
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

main();
// 340