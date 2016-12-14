'use strict';

function getDom(selector) {
	return document.querySelectorAll(selector);
}

function Office(opt) {
	this.prepare(opt);
	this.initRenderer();
	this.initCamera();
	this.initScene();
	this.draw();
};

Office.prototype.prepare = function(opt) {
	// 创建canvas
	var selector = opt.selector,
	container = getDom(selector)[0];
	this.container = container;
	this.position = opt.position;
	this.up = opt.up;
	this.look = opt.look;
};

Office.prototype.initRenderer = function() {
	var renderer = new THREE.WebGLRenderer({
		// 抗锯齿
		antialias : true
	}),
	container = this.container,
	rect = container.getBoundingClientRect(),
	width = rect.width,
	height = rect.height;
	renderer.setSize(width, height);
	// --------------------------
//	renderer.setClearColor(0xffffff, 1);
	container.appendChild(renderer.domElement);
	
	this.width = width;
	this.height = height;
	this.renderer = renderer;
};

Office.prototype.initCamera = function() {
	var camera = new THREE.PerspectiveCamera(this.fovy, this.width / this.height, this.near, this.far),
	position = this.position,
	up = this.up,
	look = this.look;
	
	camera.position.x = position.x;
	camera.position.y = position.y;
	camera.position.z = position.z;
	camera.up.x = up.x;
	camera.up.y = up.y;
	camera.up.z = up.z;
	
	camera.lookAt(look);
	this.camera = camera;
};

/**
 *  AmbientLight: 环境光，基础光源，它的颜色会被加载到整个场景和所有对象的当前颜色上。
 *	PointLight：点光源，朝着所有方向都发射光线
 *	SpotLight ：聚光灯光源：类型台灯，天花板上的吊灯，手电筒等
 *	DirectionalLight：方向光，又称无限光，从这个发出的光源可以看做是平行光
 */
// 初始化场景  包括光线
Office.prototype.initScene = function() {
	var scene = new THREE.Scene(),
	renderer = this.renderer,
	camera = this.camera;
	
	// 正面--白色点光源，也就是大厦外面的光对内照射
	var pointLight = new THREE.PointLight(0xffffff, 1);
	pointLight.position.set(0, 0, -50);
	pointLight.distance = 10000;
	scene.add(pointLight);
	
	var ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);
	
	this.scene = scene;
};

// 获取材质
Office.prototype.getMaterial = function(param) {
	param = param || {};
	// 默认是白色
	param.color = param.color || 0xeeeeee;
	var typeObj = {
		lambert : THREE.MeshLambertMaterial,
		phong : THREE.MeshPhongMaterial
	},
	type = param.type || 'lambert',
	material = new typeObj[type](param);
	// 默认不透明
	material.opacity = param.opacity || 1;
	material.transparent = param.transparent || material.transparent;
	
	return material;
};

Office.prototype.getGeometry = function(type, width, height, deepth) {
	type = type || 'cube';
	var typeObj = {
		cube : THREE.CubeGeometry
	},
	geometry = new typeObj[type](width, height, deepth);
	
	return geometry;
};

Office.prototype.getMesh = function(geometry, material, param) {
	param = param || {};
	var mesh = new THREE.Mesh(geometry, material),
	position = param.position || {},
	rotation = param.rotation || {};
	mesh.position.set(position.x || 0, position.y || 0, position.z || 0);
	mesh.rotation.set(rotation.x || 0, rotation.y || 0, rotation.z || 0);
	
	return mesh;
};

Office.prototype.draw = function() {
	this.draw1058();
};

// 1058办公室
Office.prototype.draw1058 = function() {
	var renderer = this.renderer,
	camera = this.camera,
	scene = this.scene;
	
	// 右墙
	var rightOutWallGeometry = this.getGeometry(null, 300, 120, 10),
	rightOutWallMaterial = this.getMaterial(),
	rightOutWall = this.getMesh(rightOutWallGeometry, rightOutWallMaterial, {
		position : {
			x : 190,
			y : 60
		}
	});
	scene.add(rightOutWall);
	
	// 左墙
	var leftOutWallGeometry = this.getGeometry(null, 300, 120, 10),
	leftOutWallMaterial = this.getMaterial(),
	leftOutWall = this.getMesh(leftOutWallGeometry, leftOutWallMaterial, {
		position : {
			x : -190,
			y : 60
		}
	});
	scene.add(leftOutWall);
	
	// 正面--玻璃门		!!!!!!!!!!!!!!!!!世界坐标原点
	var outGlassDoorGeometry = this.getGeometry(null, 76, 116, 5),
	outGlassMaterial = this.getMaterial({
		name : 'phong',
		opacity : 0.1,
		transparent : true
	}),
	outGlassDoor = this.getMesh(outGlassDoorGeometry, outGlassMaterial, {
		position : {
			x : -0.5,
			y : 60
		}
		/*rotation : {
			y : 70
		}*/
	});
	// 设置旋转基线---------------------------------------------------
//	outGlassDoor.rotateOnAxis(new THREE.Vector3(-38.5, 0, 0), 80);
//	outGlassDoor.rotateOnAxis.rotateY();
//	console.log(outGlassDoor.rotateY(30));
	scene.add(outGlassDoor);
	
	renderer.render(scene, camera);
};

var office = new Office({
	selector : '#container',
	// 眼睛睁开60deg
	fovy : 60,
	near : 1, 
	far : 5000,
	position : {
		x : 0,
		y : 0,
		z : 300
	},
	up : {
		x : 0,
		y : 1,
		z : 0
	},
	look : {
		x : 0,
		y : 0,
		z : 0
	}
});