(function() {
	function initWEBGL(id) {
		var canvas = document.getElementById(id),
		gl;
		try {
			gl = canvas.getContext('experimental-webgl') || canvas.getContext('webgl');
		} catch(e) {
			console.error('当前浏览器不支持webgl');
		}
		return gl;
	}
	
	function initViewPort(gl, canvas) {
		gl.viewport(0, 0, canvas.width, canvas.height);
	}
	
	// WebGL的绘制由图元（primitive）组成。图元的数据数组称为Buffer，它定义了顶点的位置
	function createSquare(gl) {
		var vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	}
	
})();