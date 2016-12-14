// 定点着色器
var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'uniform mat4 u_ModelMatrix;\n'
	+ 'void main() {\n'
	+ 'gl_Position = u_ModelMatrix * a_Position;\n'
	+ '}\n';

// 片元着色器
var FSHADER_SOURCE = 'precision mediump float;\n'
	+ 'uniform vec4 u_FragColor;\n'
	+ 'void main() {\n'
	+ 'gl_FragColor = u_FragColor;\n'
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
	
	var modelMatrix = new Matrix4(),
	ANGLE = -45,
	varTx = 0.3,
	tempAngle = 0,
	u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	// 只能传入false	4f后面+v表示可以传入多个参数
	/*modelMatrix.setRotate(ANGLE, 0, 0, 1);
	modelMatrix.translate(varTx, 0, 0);
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);*/
	
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
	/*gl.clear(gl.COLOR_BUFFER_BIT);
	
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);*/
	animation(gl, modelMatrix, tempAngle, u_ModelMatrix);
}

function animation(gl, modelMatrix, tempAngle, u_ModelMatrix) {
	requestAnimationFrame(function() {
		modelMatrix.setRotate(tempAngle, 0, 0, 1);
		gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
		
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
		tempAngle += 1;
		tempAngle %= 360;
//		requestAnimationFrame(arguments.callee);
	});
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

main();
 // 160