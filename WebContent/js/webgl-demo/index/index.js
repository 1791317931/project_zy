'use strict';

//选中状态添加的class
var active = ' active',
menus = [{
	title : '准备工作',
	className : active
}, {
	title : '图片与纹理'
}, {
	title : '碧波荡漾效果'
}, {
	title : '3D效果'
}], 
iframe = getDomById('iframe'),
items = null;
window.curPart = getAttr('curPart');

function getAttr(name) {
	var searchStr = location.search || '';
	searchStr = searchStr.replace('?', '');
	var arr = searchStr.split('&');
	for(var i = 0, length = arr.length; i < length; i++) {
		var keyAndValue = arr[i].split('=');
		if(keyAndValue[0] == name) {
			return keyAndValue[1];
		}
	}
}

function getDomById(id) {
	var dom = document.getElementById(id);
	if(!dom) {
		console.error('没有找到id=' + id + '的元素');
	}
	return dom;
}

function removeClass(obj, className) {
	if(obj) {
		var length = obj.length;
		if(length) {
			for(var i = 0; i < length; i++) {
				var item = obj[i];
				item.className = item.className.replace(className, '');
			}
		} else {
			obj.className.replace(className, '');
		}
	}
}

// 下一章节
function nextPart() {
	curPart = parseInt(window.curPart) + 1;
	items[curPart - 1].click();
}

// 上一章节
function prePart() {
	curPart = parseInt(window.curPart) - 1;
	items[curPart - 1].click();
}

document.body.onload = function() {
	
	function initMenu(id) {
		var menuContainer = getDomById(id),
		i = 0,
		length = menus.length,
		menuStr = '';
		for(; i < length; i++) {
			var menu = menus[i],
			title = menu.title;
			menuStr += '<div data-index="' + (i + 1) + '" title="' + title + '" class="text-left ml15 mt5 item pointer ' + (menu.className || '') + '">'
			+ title + '</div>';
		}
		menuContainer.innerHTML = menuStr;
		items = document.querySelectorAll('#menu .item');
		for(i = 0, length = items.length; i < length; i++) {
			var item = items[i],
			index  = i + 1;
			if(!window.curPart && item.className.indexOf(active) != -1) {
				window.curPart = index;
				iframe.setAttribute('src', '../part' + index + '/index.jsp');
			}
			item.onclick = function() {
				var className = this.className || '';
				// 选中状态的菜单项不能点击
				if(!className.indexOf(active) != -1) {
					removeClass(items, active);
					this.className += active;
					var index = this.getAttribute('data-index');
					// 记住当前章节
					window.curPart = index;
					iframe.setAttribute('src', '../part' + index + '/index.jsp');
				}
			};
		}
		window.curPart && items[window.curPart - 1].click();
	}
	initMenu('menu');
};