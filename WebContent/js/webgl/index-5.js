/*// 定点着色器
var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute vec4 a_Color;\n'
	+ 'varying vec4 v_Color;\n'
	+ 'void main() {\n'
	+ 'v_Color = a_Color;\n'
	+ 'gl_Position = a_Position;\n'
//	+ 'gl_PointSize = 10.0;\n'
	+ '}\n';

// 片元着色器
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
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	gl.drawArrays(gl.LINE_LOOP, 0, 3);
//	gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function initVertexBuffers(gl) {
	var verticeColors = new Float32Array([
	0.0, 0.5, 1.0, 0.0, 0.0,
	-0.5, -0.5, 0.0, 1.0, 0.0,
	0.5, -0.5, 0.0, 0.0, 1.0]);
	// 创建缓冲区对象
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer) {
		return -1;
	}
	// 将缓冲区对象绑定到目标
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	// 向缓冲区对象写入数据	STATIC_DRAW、STREAM_DRAW、DYNAMIC_DRAW
	gl.bufferData(gl.ARRAY_BUFFER, verticeColors, gl.STATIC_DRAW);
	// 获取数组中每个元素所占字节数
	var FSIZE = verticeColors.BYTES_PER_ELEMENT;
	
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	// 将缓冲区对象分配给a_Position变量
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
	// 连接a_Position变量与分配给它的缓冲区对象
	gl.enableVertexAttribArray(a_Position);
	
	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	// FSIZE * 3 	相邻两个顶点之间的字节数，默认0
	// FSIZE * 2	缓冲区对象中的偏移量，即attribute变量从缓冲区中的何处开始存储。尺寸在第三个位置，即设置为FSIZE * 2
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
	gl.enableVertexAttribArray(a_Color);
}*/

/*//定点着色器
var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'void main() {\n'
	+ 'gl_Position = a_Position;\n'
	+ '}\n';

// 片元着色器
var FSHADER_SOURCE = 'precision mediump float;\n'
	+ 'uniform float u_Width;\n'
	+ 'uniform float u_Height;\n'
	+ 'void main() {\n'
	+ 'gl_FragColor = vec4(gl_FragCoord.x / u_Width, 0.0, gl_FragCoord.y / u_Height, 1.0);\n'
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
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function initVertexBuffers(gl) {
	var verticeColors = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
	// 创建缓冲区对象
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer) {
		return -1;
	}
	// 将缓冲区对象绑定到目标
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	// 向缓冲区对象写入数据	STATIC_DRAW、STREAM_DRAW、DYNAMIC_DRAW
	gl.bufferData(gl.ARRAY_BUFFER, verticeColors, gl.STATIC_DRAW);
	// 获取数组中每个元素所占字节数
	var FSIZE = verticeColors.BYTES_PER_ELEMENT;
	
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	// 将缓冲区对象分配给a_Position变量
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 2, 0);
	// 连接a_Position变量与分配给它的缓冲区对象
	gl.enableVertexAttribArray(a_Position);
	
	var u_Width = gl.getUniformLocation(gl.program, 'u_Width');
	gl.uniform1f(u_Width, gl.drawingBufferWidth);
	
	var u_Height = gl.getUniformLocation(gl.program, 'u_Height');
	gl.uniform1f(u_Height, gl.drawingBufferHeight);
}*/

/*var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute vec2 a_TexCoord;\n'
	+ 'varying vec2 v_TexCoord;\n'
	+ 'void main() {\n'
	+ 'gl_Position = a_Position;\n'
	+ 'v_TexCoord = a_TexCoord;\n'
	+ '}\n';

var FSHADER_SOURCE = 'precision mediump float;\n'
	+ 'uniform sampler2D u_Sampler;\n'
	+ 'varying vec2 v_TexCoord;\n'
	+ 'void main() {\n'
	// 抽取纹理的颜色
	+ 'gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n'
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
	
	var verticeColors = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
	// 创建缓冲区对象
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer) {
		return -1;
	}
	// 将缓冲区对象绑定到目标
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	// 向缓冲区对象写入数据	STATIC_DRAW、STREAM_DRAW、DYNAMIC_DRAW
	gl.bufferData(gl.ARRAY_BUFFER, verticeColors, gl.STATIC_DRAW);
	
	initVertexBuffers(gl);
	
	if(!initTextures(gl)) {
		return;
	}
}

function initVertexBuffers(gl) {
	var verticesTexCoords = new Float32Array([
	-0.5, 0.5, -0.3, 1.7,
	-0.5, -0.5, 0.3, -0.2,
	0.5, 0.5, 1.7, 1.7,
	0.5, -0.5, 1.7, -0.2]);
	// 创建缓冲区对象
	var vertexTexCoordBuffer = gl.createBuffer();
	if(!vertexTexCoordBuffer) {
		return -1;
	}
	// 将缓冲区对象绑定到目标
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
	// 向缓冲区对象写入数据	STATIC_DRAW、STREAM_DRAW、DYNAMIC_DRAW
	gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);
	// 获取数组中每个元素所占字节数
	var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
	
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	// 将缓冲区对象分配给a_Position变量
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
	// 连接a_Position变量与分配给它的缓冲区对象
	gl.enableVertexAttribArray(a_Position);
	
	var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
	gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
	gl.enableVertexAttribArray(a_TexCoord);
}

function initTextures(gl) {
	// 创建纹理对象
	var texture = gl.createTexture(),
	u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler'),
	image = new Image();
	image.onload = function() {
		loadTexture(gl, texture, u_Sampler, image);
	}
	image.src = '../../imgs/test-1/1.jpg';
	return true;
}

function loadTexture(gl, texture, u_Sampler, image) {
	// 对纹理图像进行Y轴反转，默认false	UNPACK_PREMULTIPLY_ALPHA_WEBGL	将图像RGB颜色值的每一个分量乘以A，默认false
	// 非0-->ture	0-->false
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
	// 开始0号纹理单位
	gl.activeTexture(gl.TEXTURE0);
	// 二维纹理	TEXTURE_CUBE_MAP	立方体纹理
	gl.bindTexture(gl.TEXTURE_2D, texture);
	
	// 配置纹理参数
	// param	target	TEXTURE_2D或TEXTURE_CUBE_MAP
	// param	pname	TEXTURE_MIN_FILTER-->32X32-->16X16	纹理缩小	默认值NEAREST_MIPMAP_LINEAR	LINEAR
	//					TEXTURE_MAG_FILTER-->16X16-->32X32	纹理放大	默认值LINEAR	NEAREST_MIPMAP_LINEAR
	//					TEXTURE_WRAP_S-->如何对纹理图像的左侧或右侧区域进行填充	默认值REPEAT(平铺式重复纹理)	MIRRORED_REPEAT(镜像对称式重复纹理)	CLAMP_TO_EDGE(使用纹理图像边缘值)
	//					TEXTURE_WRAP_T-->如何对纹理图像的上方或下方区域进行填充	默认值REPEAT	MIRRORED_REPEAT(镜像对称式重复纹理)	CLAMP_TO_EDGE(使用纹理图像边缘值)
	// param	param
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	// 将纹理图像分配给纹理对象
	// texImage2D(target, level, internalformat(图像的内部格式), format(纹理数据的格式，必须与internalform值相同), type(纹理数据的类型), image)
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
	gl.uniform1i(u_Sampler, 0);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}*/

var VSHADER_SOURCE = 'attribute vec4 a_Position;\n'
	+ 'attribute vec2 a_TexCoord;\n'
	+ 'varying vec2 v_TexCoord;\n'
	+ 'void main() {\n'
	+ 'gl_Position = a_Position;\n'
	+ 'v_TexCoord = a_TexCoord;\n'
	+ '}\n';

// highp、mediump、lowp	只有片元着色器的float没有默认精度
var FSHADER_SOURCE = 'precision mediump float;\n'
	+ 'uniform sampler2D u_Sampler0;\n'
	+ 'uniform sampler2D u_Sampler1;\n'
	+ 'varying vec2 v_TexCoord;\n'
	+ 'void main() {\n'
	+ 'vec4 color0 = texture2D(u_Sampler0, v_TexCoord);\n'
	+ 'vec4 color1 = texture2D(u_Sampler1, v_TexCoord);\n'
	+ 'gl_FragColor = color0 * color1;\n'
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
	if(!initTextures(gl)) {
		return;
	}
}

function initVertexBuffers(gl) {
	var verticesTexCoords = new Float32Array([
	-0.5, 0.5, 0.0, 1.0,
	-0.5, -0.5, 0.0, 0.0,
	0.5, 0.5, 1.0, 1.0,
	0.5, -0.5, 1.0, 0.0]);
	// 创建缓冲区对象
	var vertexTexCoordBuffer = gl.createBuffer();
	if(!vertexTexCoordBuffer) {
		return -1;
	}
	// 将缓冲区对象绑定到目标
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
	// 向缓冲区对象写入数据	STATIC_DRAW、STREAM_DRAW、DYNAMIC_DRAW
	gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);
	// 获取数组中每个元素所占字节数
	var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
	
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	// 将缓冲区对象分配给a_Position变量
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
	// 连接a_Position变量与分配给它的缓冲区对象
	gl.enableVertexAttribArray(a_Position);
	
	var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
	gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
	gl.enableVertexAttribArray(a_TexCoord);
}

function initTextures(gl) {
	// 创建纹理对象
	var texture0 = gl.createTexture(),
	texture1 = gl.createTexture(),
	u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0'),
	u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1'),
	image0 = new Image(),
	image1 = new Image();
	image0.onload = function() {
		loadTexture(gl, texture0, u_Sampler0, image0, 0);
	}
	image1.onload = function() {
		loadTexture(gl, texture1, u_Sampler1, image1, 1);
	}
	image0.src = '../../imgs/test-1/1.jpg';
	image1.src = '../../imgs/test-1/2.jpg';
	return true;
}

var g_texUnit0 = false, g_texUnit1 = false;
function loadTexture(gl, texture, u_Sampler, image, texUnit) {
	// 对纹理图像进行Y轴反转，默认false	UNPACK_PREMULTIPLY_ALPHA_WEBGL	将图像RGB颜色值的每一个分量乘以A，默认false
	// 非0-->ture	0-->false
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
	if(texUnit == 0) {
		gl.activeTexture(gl.TEXTURE0);
		g_texUnit0 = true;
	} else {
		gl.activeTexture(gl.TEXTURE1);
		g_texUnit1 = true;
	}
	// 二维纹理	TEXTURE_CUBE_MAP	立方体纹理
	gl.bindTexture(gl.TEXTURE_2D, texture);
	
	// 配置纹理参数
	// param	target	TEXTURE_2D或TEXTURE_CUBE_MAP
	// param	pname	TEXTURE_MIN_FILTER-->32X32-->16X16	纹理缩小	默认值NEAREST_MIPMAP_LINEAR	LINEAR
	//					TEXTURE_MAG_FILTER-->16X16-->32X32	纹理放大	默认值LINEAR	NEAREST_MIPMAP_LINEAR
	//					TEXTURE_WRAP_S-->如何对纹理图像的左侧或右侧区域进行填充	默认值REPEAT(平铺式重复纹理)	MIRRORED_REPEAT(镜像对称式重复纹理)	CLAMP_TO_EDGE(使用纹理图像边缘值)
	//					TEXTURE_WRAP_T-->如何对纹理图像的上方或下方区域进行填充	默认值REPEAT	MIRRORED_REPEAT(镜像对称式重复纹理)	CLAMP_TO_EDGE(使用纹理图像边缘值)
	// param	param
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	// 将纹理图像分配给纹理对象
	// texImage2D(target, level, internalformat(图像的内部格式), format(纹理数据的格式，必须与internalform值相同), type(纹理数据的类型), image)
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
	gl.uniform1i(u_Sampler, texUnit);
	if(g_texUnit0 && g_texUnit1) {
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
}
	
main();
 // 215