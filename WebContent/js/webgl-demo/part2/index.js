'use strict';

document.body.onload = function() {
	
	var vertices = new Float32Array([1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0]),
	img = document.querySelectorAll('#imgs img')[0],
	active = ' active',
	canvas = getDomById('webgl'),
	runningFn = noop,
	fnObj = {
		origin : renderOrigin,
		inverse : renderInverse,
		emboss : renderEmboss,
		edge : renderEdge,
		wave : renderWave
	};
	
	var prePartButton = getDomById('pre'),
	nextPartButton = getDomById('next');
	prePartButton.onclick = function() {
		window.parent.prePart();
	};
	nextPartButton.onclick = function() {
		window.parent.nextPart();
	};
	
	(function() {
		var imgs = document.querySelectorAll('#imgs img');
		for(var i = 0, length = imgs.length; i < length; i++) {
			var imgItem = imgs[i];
			imgItem.onclick = function() {
				img = this;
				window.parent.removeClass(imgs, active);
				img.className += active;
				waveObj.intervalId && clearInterval(waveObj.intervalId);
				runningFn();
			};
		}
	})();
	
	(function() {
		var buttons = document.querySelectorAll('#effects button');
		for(var i = 0, length = buttons.length; i < length; i++) {
			var button = buttons[i];
			button.onclick = function() {
				if(this.className.indexOf(active) != -1) {
					return false;
				}
				var dataIndex = this.getAttribute('data-index');
				window.parent.removeClass(buttons, active);
				this.className += active;
				waveObj.intervalId && clearInterval(waveObj.intervalId);
				runningFn = fnObj[dataIndex];
				runningFn();
			};
		}
	})();
	
	// 绘制原图
	function renderOrigin() {
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
		// 为了安全起见，在使用之前请绑定好纹理ID。虽然在createTextureByImgID函数里面已经绑定了，但是，那并不是必须的，这里才是必须的。
		gl.activeTexture(gl.TEXTURE0);
		var u_imgTexture = gl.getUniformLocation(gl.program, 'u_imgTexture');
		gl.uniform1i(u_imgTexture, 0);
		
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
	
	// 绘制反色
	function renderInverse() {
		var webGLInverse = new WebGL({
			id : 'webgl',
			vId : 'v-source',
			fId : 'f-source-inverse'
		}),
		gl = webGLInverse.gl,
		buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
		
		var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
		// 将缓冲区对象分配给a_Position变量
		gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
		// 连接a_Position变量和分配给它的缓冲区对象
		gl.enableVertexAttribArray(a_Position);
		
		// 把纹理对象交给webgl
		webGLInverse.createTextureByImg(img);
		// 为了安全起见，在使用之前请绑定好纹理ID。虽然在createTextureByImgID函数里面已经绑定了，但是，那并不是必须的，这里才是必须的。
		gl.activeTexture(gl.TEXTURE0);
		var u_imgTexture = gl.getUniformLocation(gl.program, 'u_imgTexture');
		gl.uniform1i(u_imgTexture, 0);
		
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
	
	// 绘制浮雕效果
	function renderEmboss() {
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
		// 为了安全起见，在使用之前请绑定好纹理ID。虽然在createTextureByImgID函数里面已经绑定了，但是，那并不是必须的，这里才是必须的。
		gl.activeTexture(gl.TEXTURE0);
		var u_imgTexture = gl.getUniformLocation(gl.program, 'u_imgTexture');
		gl.uniform1i(u_imgTexture, 0);
		
		//由于浮雕效果需要知道采样步长，所以传递此参数给shader。
		var u_steps = gl.getUniformLocation(gl.program, 'u_steps');
		gl.uniform2f(u_steps, 1.0 / canvas.width, 1.0 / canvas.height);
		
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
	
	// 绘制边缘效果
	function renderEdge() {
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
		// 为了安全起见，在使用之前请绑定好纹理ID。虽然在createTextureByImgID函数里面已经绑定了，但是，那并不是必须的，这里才是必须的。
		gl.activeTexture(gl.TEXTURE0);
		var u_imgTexture = gl.getUniformLocation(gl.program, 'u_imgTexture');
		gl.uniform1i(u_imgTexture, 0);
		
		//由于浮雕效果需要知道采样步长，所以传递此参数给shader。
		var u_steps = gl.getUniformLocation(gl.program, 'u_steps');
		gl.uniform2f(u_steps, 1.0 / canvas.width, 1.0 / canvas.height);
		
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
	
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
		// 为了安全起见，在使用之前请绑定好纹理ID。虽然在createTextureByImgID函数里面已经绑定了，但是，那并不是必须的，这里才是必须的。
		gl.activeTexture(gl.TEXTURE0);
		var u_imgTexture = gl.getUniformLocation(gl.program, 'u_imgTexture');
		/**
		 * 这里需要注意的是，和向着色器中传入矩阵和向量不同，因为需要传入纹理单位的编号。uniform1i函数是向着色器中传入一个整数的时候使用的。
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
};