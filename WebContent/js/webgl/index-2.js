var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute float a_PointSize;\n'
	+ 'void main() {\n'
	+ 'gl_Position = a_Position;\n'
	+ 'gl_PointSize = a_PointSize;\n'
	+ '}\n';

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
	// 获取attribute的存储位置	第二个参数不能以gl_或者webgl前缀	空的时候返回-1
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if(a_Position < 0) {
		return;
	}
	var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
	gl.vertexAttrib1f(a_PointSize, 10.0);
	// 空的时候返回null
	var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if(!u_FragColor) {
		return;
	}
//	gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
//	gl.clear(gl.COLOR_BUFFER_BIT);
	canvas.onmousedown = function(e) {
		mousedown(e, gl, canvas, a_Position, u_FragColor);
	}
}

var g_points = [],
g_colors = [];
function mousedown(e, gl, canvas, a_Position, u_FragColor) {
	var x = e.clientX,
	y = e.clientY,
	rect = e.target.getBoundingClientRect(),
	width = rect.width,
	height = rect.height;
	x = (x - rect.left - width / 2) / (width / 2);
	y = (height / 2 - (y - rect.top)) / (height / 2);
	var point = {
		x : x,
		y : y
	};
	if(x >= 0.0 && y >= 0.0) {
		g_colors.push([1.0, 0.0, 0.0, 1.0]); 
	} else if (x < 0.0 && y > 0.0) {
		g_colors.push([0.0, 1.0, 0.0, 1.0]); 
	} else if (x < 0.0 && y < 0.0) {
		g_colors.push([0.0, 0.0, 1.0, 1.0]); 
	} else {
		g_colors.push([1.0, 1.0, 0.0, 1.0]); 
	}
	g_points.push(point);
	for(var i = 0, length = g_points.length; i < length; i++) {
		var xy = g_points[i],
		rgba = g_colors[i];
		x = xy.x,
		y = xy.y;
		gl.vertexAttrib2f(a_Position, x, y);
		gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
		gl.drawArrays(gl.POINTS, 0, 1);
	}
}

main();
// page 87