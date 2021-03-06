// 定点着色器
/*var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'uniform float u_CosB, u_SinB;\n'
	+ 'void main() {\n'
	+ 'gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;\n'
	+ 'gl_Position.y = a_Position.y * u_CosB + a_Position.x * u_SinB;\n'
	+ 'gl_Position.z = a_Position.z;\n'
	+ 'gl_Position.w = a_Position.w;\n'
	+ 'gl_PointSize = a_PointSize;\n'
	+ '}\n';*/

var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'uniform mat4 u_xformMatrix;\n'
	+ 'void main() {\n'
	+ 'gl_Position = u_xformMatrix * a_Position;\n'
	+ '}\n';

// 片元着色器
var FSHADER_SOURCE = 'precision mediump float;\n'
	+ 'uniform vec4 u_FragColor;\n'
	+ 'void main() {\n'
	+ 'gl_FragColor = u_FragColor;\n'
	+ '}\n';

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
	var ANGLE = 90,
	radian = Math.PI * ANGLE / 180;
	cosB = Math.cos(radian),
	sinB = Math.sin(radian),
	u_CosB = gl.getUniformLocation(gl.program, 'u_CosB'),
	u_SinB = gl.getUniformLocation(gl.program, 'u_SinB');
	gl.uniform1f(u_CosB, cosB);
	gl.uniform1f(u_SinB, sinB);
	
	// 获取attribute的存储位置	第二个参数不能以gl_或者webgl前缀	空的时候返回-1
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if(a_Position < 0) {
		return;
	}
	// 空的时候返回null
	var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if(!u_FragColor) {
		return;
	}
	gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
}*/

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
	var ANGLE = -45,
	radian = Math.PI * ANGLE / 180;
	cosB = Math.cos(radian),
	sinB = Math.sin(radian),
	// 列主序		将行主序的行换成列即可
	xformMatrix = new Float32Array([
	cosB, sinB, 0.0, 0.0,
	-sinB, cosB, 0.0, 0.0,
	0.0, 0.0, 1.0, 0.0,
	0.0, 0.0, 0.0, 1.0]),
	u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
	// 只能传入false	4f后面+v表示可以传入多个参数
	gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);
	
	// 获取attribute的存储位置	第二个参数不能以gl_或者webgl前缀	空的时候返回-1
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if(a_Position < 0) {
		return;
	}
	// 空的时候返回null
	var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if(!u_FragColor) {
		return;
	}
	gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
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
}

/*var g_points = [];
function mousedown(e, gl, canvas) {
	var rect = canvas.target.getBoundingRect(),
	width = rect.width,
	height = rect.height,
	x = e.clientX,
	y = e.clientY;
	x = (x - rect.left - width / 2) / (width / 2);
	y = (y - rect.top - height / 2) / (height / 2);
	g_points.push(x, y);
}*/

main();
 // 138