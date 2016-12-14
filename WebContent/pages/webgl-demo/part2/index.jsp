<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="../../../css/webgl.css?<%= new Date().getTime() %>">
<script src="../../../js/webgl-demo/webgl-utils.js?<%= new Date().getTime() %>"></script>
<!-- 原图 -->
<script type="x-shader/vertex-source" id="v-source">
	precision mediump float;
	attribute vec4 a_Position;
	varying vec2 v_textureCoordinate;
	void main() {
		gl_Position = a_Position;
		// 这是一种取巧的做法，强行把顶点坐标映射为纹理坐标，
    	// 但是仅适用于本章用到的刚好占满整个viewport的顶点
		// 纹理坐标的范围是0-1，并且和html坐标系相反		所以这里需要上下翻转
    	v_textureCoordinate = vec2((a_Position.x + 1.0) / 2.0, 1.0 - (a_Position.y + 1.0) / 2.0);
	}
</script>
<script type="x-shader/fragment-source" id="f-source-origin">
	precision mediump float;
	varying vec2 v_textureCoordinate;
	uniform sampler2D u_imgTexture;
	void main() {
		// texture2D(sampler2D sampler, vec2 coord) 使用纹理坐标coord，从当前绑定到sampler的二维纹理中读取相应的纹素（WEBGL编程指南-466）
		gl_FragColor = texture2D(u_imgTexture, v_textureCoordinate);
	}
</script>
<!-- 反色 -->
<script type="x-shader/fragment-source" id="f-source-inverse">
	precision mediump float;
	varying vec2 v_textureCoordinate;
	uniform sampler2D u_imgTexture;
	void main() {
		gl_FragColor = vec4(1.0 - texture2D(u_imgTexture, v_textureCoordinate).rgb, 1.0);
	}
</script>
<!-- 浮雕效果 -->
<script type="x-shader/fragment-source" id="f-source-emboss">
	precision mediump float;
	varying vec2 v_textureCoordinate;
	uniform sampler2D u_imgTexture;
	uniform vec2 u_steps;
	const float stride = 2.0;
	void main() {
		vec3 tmpColor = texture2D(u_imgTexture, v_textureCoordinate + u_steps * stride).rgb;
		// 对比度调整，最简单粗暴的方法当然莫过于将RGB值同时减去它们值域的一半（设为N，
		// 如果单通道的范围是[0, 1]那么N就是0.5），得到值(color-N)，然后乘以对比度值contrast之后再加回来，
		// 结果就是：(color-N) * contrast + N (即color * contrast + (1 - contrast) * N，
		// 相当于GLSL里面的mix(N, color, contrast))。其中contrast > 0。不难看出，当contrast=1时是原来的颜色，
		// 当contrast小于1时对比度减小，大于1时对比度增大
		tmpColor = texture2D(u_imgTexture, v_textureCoordinate).rgb - tmpColor + 0.5;
		// 饱和度调整，最简单粗暴的方法跟对比度类似，只不过用到的N不再是颜色值域的一半，而是RGB值的灰度(加权平均)或者说平均值(N = (R+G+B)/3)，
		// 最终结果为:mix(N, color, saturation)
		float f = (tmpColor.r + tmpColor.g + tmpColor.b) / 3.0;
		gl_FragColor = vec4(f, f, f, 1.0);
	}
</script>
<!-- 边缘效果 -->
<script type="x-shader/fragment-source" id="f-source-edge">
	precision mediump float;
	varying vec2 v_textureCoordinate;
	uniform sampler2D u_imgTexture;
	uniform vec2 u_steps;
	const float stride = 2.0;
	void main() {
		vec3 tmpColor = texture2D(u_imgTexture, v_textureCoordinate + u_steps * stride).rgb;
		tmpColor = abs(texture2D(u_imgTexture, v_textureCoordinate).rgb - tmpColor);
		gl_FragColor = vec4(tmpColor * 2.0, 1.0);
	}
</script>
<!-- 波纹效果 -->
<script type="x-shader/fragment-source" id="f-source-wave">
	precision mediump float;
	varying vec2 v_textureCoordinate;
	uniform sampler2D u_imgTexture;
	// amplitude 振幅		distortion 变形、扭曲
	uniform float u_amplitude;
	// 频率
	uniform float u_frequence;
	uniform float u_time;
	uniform float u_speed;
	void main() {
		vec2 tmp = v_textureCoordinate;
		// X轴左右波动
		tmp.x = tmp.x + sin(tmp.x * u_frequence + u_time * u_speed) * u_amplitude;
		// Y轴上下波动
		tmp.y = tmp.y + sin(tmp.y * u_frequence + u_time * u_speed) * u_amplitude;
		gl_FragColor = texture2D(u_imgTexture, tmp);
	}
</script>
</head>
<body class="p15 bg-gray">
	<p class="break ti1">本章节主要学习webgl的纹理效果。</p>
	<h2>第一步：获取纹理对象</h2>
	<pre>
		var gl = this.gl;
		// 把临时纹理绑定设定为0号
		gl.activeTexture(gl.TEXTURE0);
		
		// 创建纹理对象
		var textureObj = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, textureObj);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgObj);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		
		return textureObj;
	</pre>
	<p class="break ti1">
		首先准备几张图片供选择
	</p>
	<div class="p15">
		<div class="text-center img-group" id="imgs">
			<img src="../../../imgs/test-1/11.jpg" class=" active" />
			<img src="../../../imgs/test-1/2.jpg" />
			<img src="../../../imgs/test-1/3.jpg" />
			<img src="../../../imgs/test-1/4.jpg" />
		</div>
	</div>
	<canvas id="webgl" width="630px" height="630px" class="block"></canvas>
	<div class="p10 text-center" id="effects">
		<button class="btn" data-index="origin">原图效果</button>
		<button class="btn" data-index="inverse">反色效果</button>
		<button class="btn" data-index="emboss">浮雕效果</button>
		<button class="btn" data-index="edge">边缘效果</button>
		<button class="btn" data-index="wave">波纹效果</button>
	</div>
	<p class="red">顶点着色器代码：</p>
	<pre>
		precision mediump float;
		attribute vec4 a_Position;
		varying vec2 v_textureCoordinate;
		void main() {
			gl_Position = a_Position;
			// 这是一种取巧的做法，强行把顶点坐标映射为纹理坐标，
			// 但是仅适用于本章用到的刚好占满整个viewport的顶点
			// 纹理坐标的范围是0-1，并且和html坐标系相反		所以这里需要上下翻转
			v_textureCoordinate = vec2((a_Position.x + 1.0) / 2.0, 1.0 - (a_Position.y + 1.0) / 2.0);
		}
	</pre>
	<h3>原图效果：</h3>
	<pre>
		片元着色器代码:
		precision mediump float;
		varying vec2 v_textureCoordinate;
		uniform sampler2D u_imgTexture;
		void main() {
			// texture2D(sampler2D sampler, vec2 coord) 使用纹理坐标coord，
			// 从当前绑定到sampler的二维纹理中读取相应的纹素（WEBGL编程指南-466）
			gl_FragColor = texture2D(u_imgTexture, v_textureCoordinate);
		}
		
		js代码：
		var webGLOrigin = new WebGL({
			id : 'webgl',
			vId : 'v-source',
			fId : 'f-source-origin'
		}),
		gl = webGLOrigin.gl,
		buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
		
		var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
		// 将缓冲区对象分配给a_Position变量
		gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
		// 连接a_Position变量和分配给它的缓冲区对象
		gl.enableVertexAttribArray(a_Position);
		
		// 把纹理对象交给webgl
		webGLOrigin.createTextureByImg(img);
		// 为了安全起见，在使用之前请绑定好纹理ID。虽然在createTextureByImgID函数里面已经绑定了，
		// 但是，那并不是必须的，这里才是必须的。
		gl.activeTexture(gl.TEXTURE0);
		var u_imgTexture = gl.getUniformLocation(gl.program, 'u_imgTexture');
		// 这里需要注意的是，和向着色器中传入矩阵和向量不同，因为需要传入纹理单位的编号。
		// uniform1i函数是向着色器中传入一个整数的时候使用的。
		// 第二个参数就是要向着色器中传入的整数0。也就是说，这里传入的整数是和之前有效化的纹理单位相一致的
		gl.uniform1i(u_imgTexture, 0);
		
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	</pre>
	<h3>反色效果：</h3>
	<pre>
		片元着色器代码：
		precision mediump float;
		varying vec2 v_textureCoordinate;
		uniform sampler2D u_imgTexture;
		void main() {
			// 使用1.0 - rgb即反色
			gl_FragColor = vec4(1.0 - texture2D(u_imgTexture, v_textureCoordinate).rgb, 1.0);
		}
		
		js代码：
		var webGLInverse = new WebGL({
			id : 'webgl',
			vId : 'v-source',
			fId : 'f-source-inverse'
		}),
		...... // 同原图效果代码，只是fId-->'f-source-inverse'
	</pre>
	<h3>浮雕效果：</h3>
	<pre>
		片元着色器代码：
		precision mediump float;
		varying vec2 v_textureCoordinate;
		uniform sampler2D u_imgTexture;
		uniform vec2 u_steps;
		const float stride = 2.0;
		void main() {
			vec3 tmpColor = texture2D(u_imgTexture, v_textureCoordinate + u_steps * stride).rgb;
			// 对比度调整，最简单粗暴的方法当然莫过于将RGB值同时减去它们值域的一半（设为N，
			// 如果单通道的范围是[0, 1]那么N就是0.5），得到值(color-N)，然后乘以对比度值contrast之后再加回来，
			// 结果就是：(color-N) * contrast + N (即color * contrast + (1 - contrast) * N，
			// 相当于GLSL里面的mix(N, color, contrast))。其中contrast > 0。不难看出，当contrast=1时是原来的颜色，
			// 当contrast小于1时对比度减小，大于1时对比度增大
			tmpColor = texture2D(u_imgTexture, v_textureCoordinate).rgb - tmpColor + 0.5;
			// 饱和度调整，最简单粗暴的方法跟对比度类似，只不过用到的N不再是颜色值域的一半，
			// 而是RGB值的灰度(加权平均)或者说平均值(N = (R+G+B)/3)，最终结果为:mix(N, color, saturation)
			float f = (tmpColor.r + tmpColor.g + tmpColor.b) / 3.0;
			gl_FragColor = vec4(f, f, f, 1.0);
		}
		
		js代码：
		var webGLEmboss = new WebGL({
			id : 'webgl',
			vId : 'v-source',
			fId : 'f-source-emboss'
		}),
		gl = webGLEmboss.gl,
		buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
		
		var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
		// 将缓冲区对象分配给a_Position变量
		gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
		// 连接a_Position变量和分配给它的缓冲区对象
		gl.enableVertexAttribArray(a_Position);
		
		// 把纹理对象交给webgl
		webGLEmboss.createTextureByImg(img);
		gl.activeTexture(gl.TEXTURE0);
		var u_imgTexture = gl.getUniformLocation(gl.program, 'u_imgTexture');
		gl.uniform1i(u_imgTexture, 0);
		
		//由于浮雕效果需要知道采样步长，所以传递此参数给shader。
		var u_steps = gl.getUniformLocation(gl.program, 'u_steps');
		gl.uniform2f(u_steps, 1.0 / canvas.width, 1.0 / canvas.height);
		
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	</pre>
	<h3>边缘效果：</h3>
	<pre>
		片元着色器代码：
		precision mediump float;
		varying vec2 v_textureCoordinate;
		uniform sampler2D u_imgTexture;
		uniform vec2 u_steps;
		const float stride = 2.0;
		void main() {
			vec3 tmpColor = texture2D(u_imgTexture, v_textureCoordinate + u_steps * stride).rgb;
			tmpColor = abs(texture2D(u_imgTexture, v_textureCoordinate).rgb - tmpColor);
			gl_FragColor = vec4(tmpColor * 2.0, 1.0);
		}
		
		js代码：
		var webGLEdge = new WebGL({
			id : 'webgl',
			vId : 'v-source',
			fId : 'f-source-edge'
		}),
		gl = webGLEdge.gl,
		buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
		
		var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
		// 将缓冲区对象分配给a_Position变量
		gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
		// 连接a_Position变量和分配给它的缓冲区对象
		gl.enableVertexAttribArray(a_Position);
		
		// 把纹理对象交给webgl
		webGLEdge.createTextureByImg(img);
		gl.activeTexture(gl.TEXTURE0);
		var u_imgTexture = gl.getUniformLocation(gl.program, 'u_imgTexture');
		gl.uniform1i(u_imgTexture, 0);
		
		//由于浮雕效果需要知道采样步长，所以传递此参数给shader。
		var u_steps = gl.getUniformLocation(gl.program, 'u_steps');
		gl.uniform2f(u_steps, 1.0 / canvas.width, 1.0 / canvas.height);
		
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	</pre>
	<h3>波纹效果：</h3>
	<pre>
		片元着色器代码：
		precision mediump float;
		varying vec2 v_textureCoordinate;
		uniform sampler2D u_imgTexture;
		// amplitude 振幅		distortion 变形、扭曲
		uniform float u_amplitude;
		// 频率
		uniform float u_frequence;
		uniform float u_time;
		uniform float u_speed;
		void main() {
			vec2 tmp = v_textureCoordinate;
			// X轴左右波动
			tmp.x = tmp.x + sin(tmp.x * u_frequence + u_time * u_speed) * u_amplitude;
			// Y轴上下波动
			tmp.y = tmp.y + sin(tmp.y * u_frequence + u_time * u_speed) * u_amplitude;
			gl_FragColor = texture2D(u_imgTexture, tmp);
		}
		
		js代码：
		var waveObj = {};
		function redrawWave(gl) {
			gl.uniform1f(waveObj.u_time, waveObj.time += 1);
			gl.clearColor(0.0, 0.0, 0.0, 1.0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			if(waveObj.time >= 1.0e10) {
				waveObj.motion = 0.0;
			}
		}
		
		// 绘制波纹效果(X、Y轴都在扩散，即X、Y轴都有振幅)
		function renderWave() {
			var webGLWave = new WebGL({
				id : 'webgl',
				vId : 'v-source',
				fId : 'f-source-wave'
			}),
			gl = webGLWave.gl,
			buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
			
			var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
			// 将缓冲区对象分配给a_Position变量
			gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
			// 连接a_Position变量和分配给它的缓冲区对象
			gl.enableVertexAttribArray(a_Position);
			
			// 把纹理对象交给webgl
			webGLWave.createTextureByImg(img);
			gl.activeTexture(gl.TEXTURE0);
			var u_imgTexture = gl.getUniformLocation(gl.program, 'u_imgTexture');
			/**
			 * 这里需要注意的是，和向着色器中传入矩阵和向量不同，因为需要传入纹理单位的编号
			 * uniform1i函数是向着色器中传入一个整数的时候使用的。
			 * 第二个参数就是要向着色器中传入的整数0。也就是说，这里传入的整数是和之前有效化的纹理单位相一致的
			 */
			gl.uniform1i(u_imgTexture, 0);
			
			// wave效果需要使用u_motion和u_angle两个参数
			waveObj.u_motion = gl.getUniformLocation(gl.program, 'u_motion');
			waveObj.u_angle = gl.getUniformLocation(gl.program, 'u_angle');
			waveObj.motion = 0.0;
			
			var u_frequence = gl.getUniformLocation(gl.program, 'u_frequence');
			// u_frequence  值越大，越不清晰，会出现块状
			gl.uniform1f(u_frequence, 50.0);
			var u_amplitude = gl.getUniformLocation(gl.program, 'u_amplitude');
			// 振幅越大，看到的块状越大
			gl.uniform1f(u_amplitude, 0.003);
			var u_speed = gl.getUniformLocation(gl.program, 'u_speed');
			// 值越大，波纹晃动的越频繁
			gl.uniform1f(u_speed, 0.07);
			waveObj.u_time = gl.getUniformLocation(gl.program, 'u_time');
			waveObj.time = 0.0;
			
			// 尽量保证每秒60帧
			waveObj.intervalId = setInterval(redrawWave.bind(null, gl), 16.666);
		}
	</pre>
	<div class="text-center">
		<button class="btn" id="pre">上一节</button>
		<button class="btn" id="next">下一节</button>
	</div>
</body>
	<script src="../../../js/webgl-demo/part2/index.js?<%= new Date().getTime() %>"></script>
</html>