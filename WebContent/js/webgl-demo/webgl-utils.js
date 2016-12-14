/**
 * webgl
 * IE10++、chrome、ff、360
 */

// 严格模式
'use-strict';

function getDomById(id) {
	var dom = document.getElementById(id);
	if(!dom) {
		console.error('找不到id=' + id + '对应的dom元素');
	}
	return dom;
}

(function() {
	
	(function() {
		var lastTime = 0,
		browserPrefixs = 'webkit moz ms'.split(' '),
		requestAnimationFrame = window.requestAnimationFrame,
		cancelAnimationFrame = window.cancelAnimationFrame,
		i = 0,
		length = browserPrefixs.length;
		
		// 兼容不同浏览器
		// 60帧每秒
		if(!requestAnimationFrame || !cancelAnimationFrame) {
			for(; i < length; i++) {
				var prefix = browserPrefixs[i];
				requestAnimationFrame = window[prefix + 'RequestAnimationFrame'];
				cancelAnimationFrame = window[prefix + 'CancelAnimationFrame'];
				if(requestAnimationFrame && !cancelAnimationFrame) {
					break;
				}
			}
		}
		
		// 兼容不支持requestAnimationFrame和cancelAnimationFrame的浏览器
		if(!requestAnimationFrame || !cancelAnimationFrame) {
			requestAnimationFrame = function(callback , element) {
				var currentTime = Date.now(),
				// 使setTimeout尽可能接近每秒60帧效果
				timeToCall = Math.max(0, 16 - (currentTime - lastTime)),
				id = setTimeout(function() {
					callback(currentTime + timeToCall);
				}, timeToCall),
				lastTime = currentTime + timeToCall;
				return id;
			}
			cancelAnimationFrame = function(id) {
				clearTimeout(id);
			}
		}
		
		window.requestAnimationFrame = requestAnimationFrame;
		window.cancelAnimationFrame = cancelAnimationFrame;
	})();
	
	// 提供方法操作API
	var WebGL = function(param) {
		this.init(param);
	};
	
	WebGL.prototype.getScriptById = getScriptById;
	WebGL.prototype.init = init;
	WebGL.prototype.initWebGL = initWebGL;
	WebGL.prototype.initShader = initShader;
	WebGL.prototype.initProgram = initProgram;
	WebGL.prototype.renderTriangle = renderTriangle;
	WebGL.prototype.createTextureByImg = createTextureByImg;
	
	function getScriptById(id) {
		var dom = document.getElementById(id),
		script = dom && dom.innerHTML.replace(/^\s*\s*$/g, '');
		if(!script) {
			console.error('找不到id=' + id + '对应的dom元素或者元素内部内容为空');
		}
		return script;
	}

	function init(param) {
		var id = param.id,
		vId = param.vId,
		fId = param.fId;
		this.initWebGL(id);
		var gl = this.gl,
		vsource = this.getScriptById(vId),
		fsource = this.getScriptById(fId),
		shaderObj = this.initShader(vsource, fsource);
		if(!shaderObj) {
			return;
		}
		var program = this.initProgram(shaderObj.vertexShaderObj, shaderObj.fragmentShaderObj);
		if(!program) {
			return;
		}
		// 使用程序对象
		gl.useProgram(program);
		gl.program = program;
		return true;
	}

	function initWebGL(id) {
		var dom = getDomById(id),
		gl = dom.getContext('experimental-webgl');
		if(!gl) {
			console.error('浏览器不支持webgl');
		}
		this.gl = gl;
		// 设置viewport
		gl.viewport(0, 0, gl.drawingBufferHeight, gl.drawingBufferWidth);
	}
	
	// 初始化着色器
	function initShader(vsource, fsource) {
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
	}
	
	// 创建程序对象
	function initProgram(vertexShaderObj, fragmentShaderObj) {
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
	}
	
	// 画三角形
	function renderTriangle(vertices, vLength, offset, count, a_Position) {
	    var gl = this.gl,
	    vertexBuffer = gl.createBuffer(),
	    a_Position = gl.getAttribLocation(gl.program, a_Position);
	    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	    
	    // 先判断传入的点的类型	typeof new Float32Array(vertices) == '[]'
	    if(typeof vertices == 'object') {
	    	vertices = new Float32Array(vertices);
	    }
	    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	    
	    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
		if(!u_FragColor) {
			return;
		}
		gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	    
	    // 将缓冲区对象分配给a_Position变量
		gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
		// 连接a_Position变量和分配给它的缓冲区对象
		gl.enableVertexAttribArray(a_Position);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
	}
	
	function createTextureByImg(imgObj) {
		var gl = this.gl;
		/**
		 把临时纹理绑定设定为0号，设置纹理有效
		 这里作为参数使用的gl.TEXTURE0常量，后面的0就是纹理单位的编号，如果将编号1的纹理设置为有效的话，就需要是gl.TEXTURE1。
		 但是，没有什么特殊的理由的话，使用纹理单位应该按照从小到大的顺序来使用
		 >>纹理单位的最大值（上限值）
		 多个纹理同时使用的时候，纹理单位是必须用到的，这个最大的单位数是由运行环境决定的。因为运行WebGL的除了电脑，还有手机等，所以纹理单位能使用到多少个判断起来是非常费劲的。
		 因为是受到硬件的性能的制约，所以使用之前先判断一下，然后进行分别处理是可行的。查询执行环境的可使用最大纹理单位数使用getParameter函数。
		 下面是例子
		 gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
		 向getParameter函数中传入这个非常长的常量gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS就可以得到一个整数值，表示可以使用的最大文理单位数，
		 如果返回值是10的话，那么可以使用的纹理单位就是gl.TEXTURE0 ～ gl.TEXTURE9
		 */
		gl.activeTexture(gl.TEXTURE0);
		
		// 创建纹理对象
		var textureObj = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, textureObj);
		// 将图像数据和纹理进行连接
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgObj);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		
		return textureObj;
	}
	
	var Matrix4 = function() {
		
		var vertices = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
		
		this.elements = new Float32Array(vertices);
	};
	
	// 设置单位矩阵
	Matrix4.prototype.setIdentity = function() {
		var e = this.elements, i = 0, length = 16;
		
		for(; i <length; i++) {
			e[i] = [0, 5, 10, 15].indexOf(i) != -1 ? 1 : 0;
		}
		
		return this;
	};
	
	// 赋值
	Matrix4.prototype.set = function(src) {
		var i = 0, s, d;
		s = src.elements;
		d = this.elements;
		
		if(s == d) {
			return;
		}
		
		for(; i < 16; i++) {
			d[i] = s[i];
		}
		
		return this;
	};
	
	// 矩阵相乘
	Matrix4.prototype.concat = function(other) {
		var e = a = this.elements,
		b = other.elements,
		i, ai0, ai1, ai2, ai3;
		
		if(e === b) {
			b = new Float32Array(16);
			for(i = 0; i < 16; i++) {
				b[i] = e[i];
			}
		}

		// b行 * a列
		for(i = 0; i < 4; i++) {
			ai0 = a[i];
			ai1 = a[i + 4];
			ai2 = a[i + 8];
			ai3 = a[i + 12];
			e[i] 		= ai0 * b[0] 	+ ai1 * b[1] 	+ ai2 * b[2] 	+ ai3 * b[3];
			e[i + 4] 	= ai0 * b[4] 	+ ai1 * b[5] 	+ ai2 * b[6] 	+ ai3 * b[7];
			e[i + 8] 	= ai0 * b[8] 	+ ai1 * b[9] 	+ ai2 * b[10] 	+ ai3 * b[11];
			e[i + 12] 	= ai0 * b[12] 	+ ai1 * b[13] 	+ ai2 * b[14] 	+ ai3 * b[15];
		}
		
		return this;
	};
	
	Matrix4.prototype.multiply = Matrix4.prototype.concat;
	
	// 转置矩阵	因为ESGL是列矩阵，要从行矩阵转换为列矩阵
	Matrix4.prototype.transpose = function() {
		var tmp,
		e = this.elements;
		
		tmp = e[ 1]; e[ 1] = e[ 4]; e[ 4] = tmp;
		tmp = e[ 2]; e[ 2] = e[ 8]; e[ 8] = tmp;
		tmp = e[ 3]; e[ 3] = e[12]; e[12] = tmp;
		tmp = e[ 6]; e[ 6] = e[ 9]; e[ 9] = tmp;
		tmp = e[ 7]; e[ 7] = e[13]; e[13] = tmp;
		tmp = e[11]; e[11] = e[14]; e[14] = tmp;
		
		return this;
	};
	
	// 设置逆矩阵
	/**
	 * 求逆矩阵的方法
	 * 首先将原矩阵增长,增加一个同阶的单位矩阵如图
	 * 1 0 1		1 0 1 1 0 0
	 * 0 1 0	=>	0 1 0 0 1 0
	 * 0 0 1		0 0 1 0 0 1
	 * 做初等行变换,将左边变为单位矩阵 <= 将第三行乘以-1加到第一行就可以了
	 * 1 0 1 1 0 0	r3-r1	1 0 0 1 0 -1
	 * 0 1 0 0 1 0	  =>	0 1 0 0 1  0
	 * 0 0 1 0 0 1			0 0 1 0 0  1
	 * 右边的方阵就位原矩阵的逆,得到
	 * 1 0 -1
	 * 0 1  0
	 * 0 0  1
	 */
	Matrix4.prototype.setInverseOf = function(other) {
		var i = 0,
		s = other.elements,
		d = this.elements,
		inverse = new Float32Array(16),
		det;
		inverse[ 0] = s[ 5]*s[10]*s[15] - s[ 5]*s[11]*s[14] - s[ 9]*s[ 6]*s[15]
					 +s[ 9]*s[ 7]*s[14] + s[13]*s[ 6]*s[11] - s[13]*s[ 7]*s[10];
		
		inverse[ 4] =-s[ 4]*s[10]*s[15] + s[ 4]*s[11]*s[14] + s[ 8]*s[ 6]*s[15]
					 -s[ 8]*s[ 7]*s[14] - s[12]*s[ 6]*s[11] + s[12]*s[ 7]*s[10];
		
		inverse[ 8] = s[ 4]*s[ 9]*s[15] - s[ 4]*s[11]*s[13] - s[ 8]*s[ 5]*s[15]
					 +s[ 8]*s[ 7]*s[13] + s[12]*s[ 5]*s[11] - s[12]*s[ 7]*s[ 9];
		
		inverse[12] =-s[ 4]*s[ 9]*s[14] + s[ 4]*s[10]*s[13] + s[ 8]*s[ 5]*s[14]
					 +s[ 8]*s[ 6]*s[13] - s[12]*s[ 5]*s[10] + s[12]*s[ 6]*s[ 9];
		
		inverse[ 1] =-s[ 1]*s[10]*s[15] + s[ 1]*s[11]*s[14] + s[ 9]*s[ 2]*s[15]
					 -s[ 9]*s[ 3]*s[14] - s[13]*s[ 2]*s[11] + s[13]*s[ 3]*s[10];
		
		inverse[ 5] = s[ 0]*s[10]*s[15] - s[ 0]*s[11]*s[14] - s[ 8]*s[ 2]*s[15]
					 +s[ 8]*s[ 3]*s[14] + s[12]*s[ 2]*s[11] - s[12]*s[ 3]*s[10];
		
		inverse[ 9] =-s[ 0]*s[ 9]*s[15] + s[ 0]*s[11]*s[13] + s[ 8]*s[ 1]*s[15]
					 -s[ 8]*s[ 3]*s[13] - s[12]*s[ 1]*s[11] + s[12]*s[ 3]*s[ 9];
		
		inverse[13] = s[ 0]*s[ 9]*s[14] - s[ 0]*s[10]*s[13] - s[ 8]*s[ 1]*s[14]
					 +s[ 8]*s[ 2]*s[13] + s[12]*s[ 1]*s[10] - s[12]*s[ 2]*s[ 9];
		
		inverse[ 2] = s[ 1]*s[ 6]*s[15] - s[ 1]*s[ 7]*s[14] - s[ 5]*s[ 2]*s[15]
					 +s[ 5]*s[ 3]*s[14] + s[13]*s[ 2]*s[ 7] - s[13]*s[ 3]*s[ 6];
		
		inverse[ 6] =-s[ 0]*s[ 6]*s[15] + s[ 0]*s[ 7]*s[14] + s[ 4]*s[ 2]*s[15]
					 -s[ 4]*s[ 3]*s[14] - s[12]*s[ 2]*s[ 7] + s[12]*s[ 3]*s[ 6];
		
		inverse[10] = s[ 0]*s[ 5]*s[15] - s[ 0]*s[ 7]*s[13] - s[ 4]*s[ 1]*s[15]
					 +s[ 4]*s[ 3]*s[13] + s[12]*s[ 1]*s[ 7] - s[12]*s[ 3]*s[ 5];
		
		inverse[14] =-s[ 0]*s[ 5]*s[14] + s[ 0]*s[ 6]*s[13] + s[ 4]*s[ 1]*s[14]
					 -s[ 4]*s[ 2]*s[13] - s[12]*s[ 1]*s[ 6] + s[12]*s[ 2]*s[ 5];
		
		inverse[ 3] =-s[ 1]*s[ 6]*s[11] + s[ 1]*s[ 7]*s[10] + s[ 5]*s[ 2]*s[11]
					 -s[ 5]*s[ 3]*s[10] - s[ 9]*s[ 2]*s[ 7] + s[ 9]*s[ 3]*s[ 6];
		
		inverse[ 7] = s[ 0]*s[ 6]*s[11] - s[ 0]*s[ 7]*s[10] - s[ 4]*s[ 2]*s[11]
					 +s[ 4]*s[ 3]*s[10] + s[ 8]*s[ 2]*s[ 7] - s[ 8]*s[ 3]*s[ 6];
		
		inverse[11] =-s[ 0]*s[ 5]*s[11] + s[ 0]*s[ 7]*s[ 9] + s[ 4]*s[ 1]*s[11]
					 -s[ 4]*s[ 3]*s[ 9] - s[ 8]*s[ 1]*s[ 7] + s[ 8]*s[ 3]*s[ 5];
		
		inverse[15] = s[ 0]*s[ 5]*s[10] - s[ 0]*s[ 6]*s[ 9] - s[ 4]*s[ 1]*s[10]
					 +s[ 4]*s[ 2]*s[ 9] + s[ 8]*s[ 1]*s[ 6] - s[ 8]*s[ 2]*s[ 5];
		
		det = s[0] * inverse[0] + s[1] * inverse[4] + s[2] * inverse[8] + s[3] * inverse[12];
		if(det === 0) {
			return this;
		}
		
		det = 1 / det;
		for(; i < 16; i++) {
			d[i] = inverse[i] * det
		}
		
		return this;
	}
	
	Matrix4.prototype.invert = function() {
		return this.setInverseOf(this);
	};
	
	/**
	 * 设置投影矩阵，定义盒装可视空间
	 * orthographic projection	正射投影
	 * 可视空间由前后两个矩形表面确定，分别称近裁切面和远裁切面
	 * 近裁切面与远裁切面之间的盒形空间就是可视空间，只有在此空间内的物体才会被显示出来。
	 * left,right	指定近裁切面的左右边界，left和right不相等
	 * bottom,top	指定近裁切面的上下边界，bottom和top不相等
	 * near,far		指定近裁切面和远裁切面的位置，即可视空间的近边界和远边界,near和far不相等
	 */
	Matrix4.prototype.setOrtho = function(left, right, bottom, top, near, far) {
		if(left == right || bottom == top || near == far) {
			throw 'setOrtho(left == right ? ' + left + ' : ' + right + ', ' 
						+ 'bottom == top ? ' + bottom + ' : ' + top + ', '
						+ 'near == far ? ' + near + ' : ' + far + ')';
		}
		
		var e = this.elements,
		// 宽度
		w = 1 / (right -left),
		// 高度
		h = 1 / (top - bottom),
		// 深度为负数
		d = 1 / (far - near);
		
		e[ 0] = 2 * w;		e[ 1] = 0;			e[ 2] = 0;			e[ 3] = 0;
		e[ 4] = 0;			e[ 5] = 2 * h;		e[ 6] = 0;			e[ 7] = 0;
		e[ 8] = 0;			e[ 9] = 0;			e[10] = - 2 * d;	e[11] = 0;
		e[12] = -(right + left) * w;
		e[13] = -(top + bottom) * h;
		e[14] = -(far + near) * d;
		e[15] = 1;
		
		return this;
	}

	Matrix4.prototype.ortho = function(left, right, bottom, top, near, far) {
		return this.concat(new Matrix4().setOrtho(left, right, bottom, top, near, far));
	};
	
	// 透视
	Matrix4.prototype.setFrustum = function(left, right, bottom, top, near, far) {
		if(left == right || top == bottom || near == far) {
			throw 'setFrustum(left == right ? ' + left + ' : ' + right + ', ' 
						+ 'bottom == top ? ' + bottom + ' : ' + top + ', '
						+ 'near == far ? ' + near + ' : ' + far + ')';
			
			if(near <= 0) {
				throw 'near <= 0';
			}
			if(far <= 0) {
				throw 'far <= 0';
			}
			
			var e = this.elements,
			// 宽度
			w = 1 / (right -left),
			// 高度
			h = 1 / (top - bottom),
			// 深度为负数
			d = 1 / (far - near);
			
			e[ 0] = 2 * near * w;
			e[ 1] = 0;
			e[ 2] = 0;
			e[ 3] = 0;
			
			e[ 4] = 0;
			e[ 5] = 2 * near * h;
			e[ 6] = 0;
			e[ 7] = 0;
			
			e[ 8] = (right + left) * w;
			e[ 9] = (top + bottom) * h;
			e[10] = (far + near) * d;
			e[11] = -1;
			
			e[12] = 0;
			e[13] = 0;
			e[14] = -2 * near * far * d;
			e[15] = 0;
		}
	};
	
	Matrix4.prototype.frustum = function(left, right, bottom, top, near, far) {
		return this.concat(new Matrix4().setFrustum(left, right, bottom, top, near, far));
	};
	
	/**
	 * 通过视野角度设置行列式
	 * fovy		垂直视野角度	可以理解为眼睛睁开的角度，值越大，视野范围内的物体物体相对就小了
	 * aspect	视野宽高比(canvas.width / canvas.height)
	 */
	Matrix4.prototype.setPerspective = function(fovy, aspect, near, far) {
		if(near == far || aspect == 0) {
			throw 'setFrustum(near == far ? ' + near + ' : ' + far + ', ' 
						+ 'aspect == 0 ? ' + aspect + ' : 0)';
		}
		if(near <= 0) {
			throw 'near <= 0';
		}
		if(far <= 0) {
			throw 'far <= 0';
		}
		
		fovy = Math.PI * fovy / 180 / 2;
		var s = Math.sin(fovy);
		if(s == 0) {
			throw 'null frustum';
		}
		
		var e = this.elements,
		d = 1 / (far - near),
		ct = Math.cos(fovy) / s;
		
		e[ 0] = ct / aspect;
		e[ 1] = 0;
		e[ 2] = 0;
		e[ 3] = 0;
		
		e[ 4] = 0;
		e[ 5] = ct;
		e[ 6] = 0;
		e[ 7] = 0;
		
		e[ 8] = 0;
		e[ 9] = 0;
		e[10] = -(far + near) * d;
		e[11] = -1;
		
		e[12] = 0;
		e[13] = 0;
		e[14] = -2 * near * far * d;
		e[15] = 0;
		
		return this;
	};

	Matrix4.prototype.perspective = function(fovy, aspect, near, far) {
		return this.concat(new Matrix4().setPerspective(fovy, aspect, near, far));
	};
	
	/**
	 * 行列式缩放
	 * @param x	X轴的倍数
	 * @param y	Y轴的倍数
	 * @param z	Z轴的倍数
	 */
	Matrix4.prototype.setScale = function(x, y, z) {
		var e = this.elements;
		e[0] = x;	e[4] = 0;	e[ 8] = 0;	e[12] = 0;
		e[1] = 0;	e[5] = y;	e[ 9] = 0;	e[13] = 0;
		e[2] = 0;	e[6] = 0;	e[10] = z;	e[14] = 0;
		e[3] = 0;	e[7] = 0;	e[11] = 0;	e[15] = 1;
		
		return this;
	};
	
	Matrix4.prototype.scale = function(x, y, z) {
		var e = this.elements;
		e[ 0] *= x;	e[ 1] *= x;	e[ 2] *= x;	e[ 3] *= x;
		e[ 4] *= y;	e[ 5] *= y;	e[ 6] *= y;	e[ 7] *= y;
		e[ 8] *= z;	e[9] *= z;	e[10] *= z;	e[11] *= z;
		return this;
	};
	
	/**
	 * 平移矩阵
	 * @param x	X轴增量
	 * @param y	Y轴增量
	 * @param z	Z轴增量
	 */
	Matrix4.prototype.setTranslate = function(x, y, z) {
		var e = this.elements;
		e[0] = 1;	e[4] = 0;	e[ 8] = 0;	e[12] = x;
		e[1] = 0;	e[5] = 1;	e[ 9] = 0;	e[13] = y;
		e[2] = 0;	e[6] = 0;	e[10] = 1;	e[14] = z;
		e[3] = 0;	e[7] = 0;	e[11] = 0;	e[15] = 1;
		return this;
	};
	
	/**
	 * 平移矩阵
	 * @param x	X轴增量
	 * @param y	Y轴增量
	 * @param z	Z轴增量
	 */
	Matrix4.prototype.translate = function(x, y, z) {
		var e = this.elements;
		e[12] += e[0] * x + e[4] * y + e[ 8] * z;
		e[13] += e[1] * x + e[5] * y + e[ 9] * z;
		e[14] += e[2] * x + e[6] * y + e[10] * z;
		e[15] += e[3] * x + e[7] * y + e[11] * z;
		return this;
	};
	
	/**
	 * 
	 * @param angle	角度
	 * @param x		
	 * @param y
	 * @param z
	 */
	Matrix4.prototype.setRotate = function(angle, x, y, z) {
		var e = this.elements,
		s, c,  len, rlen, nc, xy, yz, zx, xs, ys, zs;
		
		angle = Math.PI * angle / 180;
		s = Math.sin(angle);
		c = Math.cos(angle);
		
		if(0 != x && 0 == y && z == 0) {
			if(x < 0) {
				s = -s;
			}
			e[0] = 1;	e[4] = 0;	e[ 8] = 0;	e[12] = 0;
			e[1] = 0;	e[5] = c;	e[ 9] = -s;	e[13] = 0;
			e[2] = 0;	e[6] = s;	e[10] = c;	e[14] = 0;
			e[3] = 0;	e[7] = 0;	e[11] = 0;	e[15] = 1;
		} else if (0 == x && 0 != y && 0 == z) {
			if(y < 0) {
				s = -s;
			}
			e[0] = c;	e[4] = 0;	e[ 8] = s;	e[12] = 0;
			e[1] = 0;	e[5] = 1;	e[ 9] = 0;	e[13] = 0;
			e[2] = -s;	e[6] = 0;	e[10] = c;	e[14] = 0;
			e[3] = 0;	e[7] = 0;	e[11] = 0;	e[15] = 1;
		} else if (0 == x && 0 == y && 0 != z) {
			if(z < 0) {
				s = -s;
			}
			e[0] = c;	e[4] = -s;	e[ 8] = 0;	e[12] = 0;
			e[1] = s;	e[5] = c;	e[ 9] = 0;	e[13] = 0;
			e[2] = 0;	e[6] = 0;	e[10] = 1;	e[14] = 0;
			e[3] = 0;	e[7] = 0;	e[11] = 0;	e[15] = 1;
		} else {
			// 任意轴旋转
			len = Math.sqrt(x * x + y * y + z * z);
			if(len != 1) {
				rlen = 1 / len;
				x *= rlen;
				y *= rlen;
				z *= rlen;
				
				nc = 1 - c;
				xy = x * y;
				yz = y * z;
				zx = z * x;
				xs = x * s;
				ys = y * s;
				zs = z * s;
				
				e[ 0] = x * x * nc + c;
				e[ 1] = xy * nc + zs;
				e[ 2] = zx * nc - ys;
				e[ 3] = 0;
				
				e[ 4] = xy * nc - zs;
				e[ 5] = y * y * nc + c;
				e[ 6] = yz * nc + xs;
				e[ 7] = 0;
				
				e[ 8] = zx * nc + ys;
				e[ 9] = yz * nc - xs;
				e[10] = z * z * nc + c;
				e[11] = 0;
				
				z[12] = 0;
				z[13] = 0;
				z[14] = 0;
				z[15] = 1;
			}
		}
		return this;
	};
	
	Matrix4.prototype.rotate = function(angle, x, y, z) {
		return this.concat(new Matrix4().setRotate(angle, x, y, z));
	};
	
	/**
	 * 视野变换矩阵
	 * @param eyeX		视野位置
	 * @param eyeY		
	 * @param eyeZ		
	 * @param centerX	中心位置
	 * @param centerY
	 * @param centerZ
	 * @param upX		上方向
	 * @param upY
	 * @param upZ
	 */
	Matrix4.prototype.setLookAt = function(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
		var e = this.elements,
		fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;
		
		fx = centerX - eyeX;
		fy = centerY - eyeY;
		fz = centerZ - eyeZ;
		
		rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
		fx *= rlf;
		fy *= rlf;
		fz *= rlf;
		
		sx = fy * upZ - fz * upY;
		sy = fz * upX - fx * upZ;
		sz = fx * upY - fy * upX;
		
		rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
		sx *= rls;
		sy *= rls;
		sz *= rls;
		
		ux = sy * fz - sz * fy;
		uy = sz * fx - sx * fz;
		uz = sx * fy - sy * fx;
		
		e[ 0] = sx;		e[ 1] = ux;		e[ 2] = -fx;	e[ 3] = 0;
		e[ 4] = sy;		e[ 5] = uy;		e[ 6] = -fy;	e[ 7] = 0;
		e[ 8] = sz;		e[ 9] = uz;		e[10] = -fz;	e[11] = 0;
		e[12] = 0;		e[13] = 0;		e[14] = 0;		e[15] = 1;
		return this.translate(-eyeX, -eyeY, -eyeZ);
	};
	
	Matrix4.prototype.lookAt = function(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
		return this.concat(new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
	};

	Matrix4.prototype.dropShadow = function(plane, light) {
		var mat = new Matrix4(),
		e = mat.elements,
		dot = plane[0] * light[0] + plane[1] * light[1] + plane[2] * light[2] + plane[3] * light[3];
		
		e[ 0] = dot - light[0] * plane[0];
		e[ 1] = 	- light[1] * plane[0];
		e[ 2] = 	- light[2] * plane[0];
		e[ 3] = 	- light[3] * plane[0];
		
		e[ 4] = 	- light[0] * plane[1];
		e[ 5] = dot	- light[1] * plane[1];
		e[ 6] = 	- light[2] * plane[1];
		e[ 7] = 	- light[3] * plane[1];
		
		e[ 8] = 	- light[0] * plane[2];
		e[ 9] = 	- light[1] * plane[2];
		e[10] = dot - light[2] * plane[2];
		e[11] = 	- light[3] * plane[2];
		
		e[12] = 	- light[0] * plane[3];
		e[13] = 	- light[1] * plane[3];
		e[14] = 	- light[2] * plane[3];
		e[15] = dot - light[3] * plane[3];
		return this.concat(mat);
	};
	
	/**
	 * 平行广元定点在平面上的投影
	 * @param normX		法线(归一化)
	 * @param normY
	 * @param normZ
	 * @param planeX	平面上的点
	 * @param planeY
	 * @param planeZ
	 * @param lightX	
	 * @param lightY
	 * @param lightZ
	 */
	Matrix4.prototype.dropShadowDirectionally = function(normX, normY, normZ, planeX, planeY, planeZ, lightX, lightY, lightZ) {
		var a = planeX * normX + planeY * normY + planeZ * normZ;
		return this.dropShadow([normX, normY, normZ, -a], [lightX, lightY, lightZ, 0]);
	};
	
	var Vector3 = function(opt_src) {
		var v = new Float32Array(3);
		if(opt_src && typeof opt_src == 'object') {
			v[0] = opt_src[0];
			v[1] = opt_src[2];
			v[2] = opt_src[3];
		}
		this.elements = v;
	};
	
	/**
	 * 归一化
	 */
	Vector3.prototype.normalize = function() {
		var v = this.elements,
		c = v[0],
		d = v[1],
		e = v[2],
		g = Math.sqrt(c * c + d * d + e * e);
		if(g) {
			if(g == 1) {
				return this;
			} else {
				v[0] = 0;
				v[1] = 0;
				v[2] = 0;
				return this;
			}
		}
		g = 1 / g;
		v[0] = c * g;
		v[1] = d * g;
		v[2] = e * g;
		return this;
	};
	
	var Vector4 = function(opt_src) {
		var v = new Float32Array(4);
		if(opt_src && opt_src == 'object') {
			v[0] = opt_src[0];
			v[1] = opt_src[1];
			v[2] = opt_src[2];
			v[4] = opt_src[3];
		}
		this.elements = v;
	};

	window.noop = function() {};
	window.WebGL = WebGL;
	window.Vector3 = Vector3;
	window.Vector4 = Vector4;
	window.Matrix4 = Matrix4;
})(window);