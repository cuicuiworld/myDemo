/**
 * 简单封装类似于jQuery的库
 * createBy cuicuiworld
 */

/**
 * 封装事件绑定 el argument type 事件类型 fn callback
 */
function addEvent(el, type, fn) {
	if (el.addEventListener) {
		el.addEventListener(type, function(event) {
			/**
			 * addEventListener绑定事件,return false
			 * 阻止默认事件不起作用,借助event.preventDefault();
			 * event.cancelBubble = true;阻止冒泡
			 */
			if (false == fn.call(el)) {
				event.cancelBubble = true;
				event.preventDefault();
				return false;
			}
		}, false);
	} else {
		el.attachEvent('on' + type, function() {
			if (false == fn.call(el)) {
				event.cancelBubble = true;
				return false;
			}
		});
	}
}

/**
 * 封装获取class类的函数
 */
function getByClass(oParent, sClass) {
	var aEle = oParent.getElementsByTagName('*');
	var aResult = [];
	var reg = new RegExp('\\b' + sClass + '\\b', 'i');
	var i = 0;

	for (i = 0; i < aEle.length; i++) {
		if (reg.test(aEle[i].className)) {
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

/**
 * 封装获取样式
 * 
 * @param obj
 *            对象
 * @param attr
 *            属性
 */
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return obj.getComputedStyle(obj, false)[attr];
	}
}

/**
 * 解决concat不能加入数组函数
 * 
 * @param arr1
 * @param arr2
 * @returns
 */
function appendArr(arr1, arr2) {
	var i = 0;

	for (i = 0; i < arr2.length; i++) {
		arr1.push(arr2[i]);
	}
	return arr1;
}

function getIndex(obj) {
	var aBrother = obj.parentNode.children;
	var i = 0;

	for (i = 0; i < aBrother.length; i++) {
		if (aBrother[i] == obj) {
			return i;
		}
	}
}
/**
 * VQuery 封装自己的js库
 */
function VQuery(el) {

	this.elements = [];
	var res = null;
	switch (typeof el) {
	case 'function':
		addEvent(window, 'load', el);
		break;
	case 'string':
		switch (el.charAt(0)) {
			case '#':
				if(!res){	//没有结果,即为顶层过滤
					var obj = document.getElementById(el.substring(1));
					this.elements.push(obj);
				}else{
					//有结果,即向下层过滤
				}
				break;
			case '.':
				if(!res){	//没有结果,即为顶层过滤
					this.elements = getByClass(document, el.substring(1));
					break;
				}else{
					//有结果,即向下层过滤
				}
			default:
				if(!res){	//没有结果,即为顶层过滤
					this.elements = document.getElementsByTagName(el);
					break;
				}else{
					//有结果,即向下层过滤
				}
		}
		break;
	case 'object':
		this.elements.push(el);
		break;
	default:
		break;
	}
}

VQuery.prototype = {
	'click' : function(fn) {
		var i = 0;
		for (i = 0; i < this.elements.length; i++) {
			addEvent(this.elements[i], 'click', fn);
		}
		return this;
	},
	'hover' : function(fnOver, fnOut) {
		var i = 0;
		for (i = 0; i < this.elements.length; i++) {
			addEvent(this.elements[i], 'mouseover', fnOver);
			addEvent(this.elements[i], 'mouseout', fnOut);
		}
		return this;
	},
	'show' : function() {
		var i = 0;
		for (i = 0; i < this.elements.length; i++) {
			this.elements[i].style.display = 'block';
		}
		return this;
	},
	'hide' : function() {
		var i = 0;
		for (i = 0; i < this.elements.length; i++) {
			this.elements[i].style.display = 'none';
		}
		return this;
	},
	'css' : function(attr, value) {
		if (arguments.length == 2) { // set
			var i = 0;
			for (i = 0; i < this.elements.length; i++) {
				this.elements[i].style[attr] = value;
			}
		} else { // get

			if (typeof attr == 'string') {
				return getStyle(this.elements[0], attr);
			} else {
				for (i = 0; i < this.elements.length; i++) {
					var k = '';

					for (k in attr) {
						this.elements[i].style[k] = attr[k];
					}
				}
			}
		}
		return this;
	},
	'attr' : function(attr, value) {

		if (arguments.length == 2) {
			var i = 0;
			for (i = 0; i < this.elements.length; i++) {
				this.elements[i][attr] = value;
			}
		} else {
			return this.elements[0][attr];
		}
		return this;
	},
	'toggle' : function() {

		var i = 0;
		var _arguments = arguments;

		for (i = 0; i < this.elements.length; i++) {
			addToggle(this.elements[i]);
		}

		function addToggle(obj) {
			var count = 0;
			addEvent(obj, 'click', function() {
				_arguments[count++ % _arguments.length].call(obj);
			})
		}
		return this;
	},
	'eq' : function(n) {
		return $(this.elements[n])
	},
	'find' : function(str) {
		var i = 0;
		var aResult = [];

		for (i = 0; i < this.elements.length; i++) {
			switch (str.charAt(0)) {
			case '.':
				var aEle = getByClass(this.elements[i], str.substring(1));
				aResult = aResult.concat(aEle);
				break;
			default:
				var aEle = this.elements[i]
						.getElementsByTagName(this.elements[i]);
				appendArr(aResult, aEle);
			}
		}
		var newVquery = $();
		newVquery.elements = aResult;
		return newVquery;
	},
	'index' : function() {
		return getIndex(this.elements[0]);
	},
	'bind' : function(type, fn) {
		var i = 0;
		for (i = 0; i < this.elements.length; i++) {
			addEvent(this.elements[i], type, fn);
		}
	},
	'extend' : function(name, fn) {
		VQuery.prototype[name] = fn;
	}

}

function $(el) {
	return new VQuery(el);
}

/**
 * 四种情况不能用 this 行间 定时器 绑定 套一层 call方法可以解决
 * 
 * 原生js在获取style会有问题，只能获取到行间样式，但是在赋值style时可以 通常会用到两个方法
 * 
 * return false 原生js的只能阻止默认事件 jquery中即阻止默认事件，又阻止冒泡。
 */

