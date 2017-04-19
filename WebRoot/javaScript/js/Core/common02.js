/**
 * BrowserInfo 终端器信息
 */
var BrowserInfo = {
	userAgent : navigator.userAgent.toLowerCase(),
	isAndroid : Boolean(navigator.userAgent.match(/android/ig)),
	isIphone : Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
	isIpad : Boolean(navigator.userAgent.match(/ipad/ig)),
	isWeixin : Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
}

/**
 * 
 * @param str
 * @returns {Number}
 */
function strLength(str) {
	var a = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 255)
			a += 2;// 按照预期计数增加2
		else
			a++;
	}
	return a;
}

/**
 * addEvent 绑定任何事件
 * 
 * @param el
 *            页面元素
 * @param type
 *            事件类型
 * @param fn
 *            回调函数
 */
function addEvent(el, type, fn) {
	if (el.addEventListener) {
		el.addEventListener(type, function(event) {
			/**
			 * addEventListener绑定事件,return false
			 * 阻止默认事件不起作用,借助event.preventDefault(); event.cancelBubble =
			 * true;阻止冒泡
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
 * getUrlParam 获取url问号后面的参数
 * 
 * @param name
 *            参数名 key
 * @returns value
 */
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

/**
 * 下载app
 */
function downApp() {
	var u = navigator.userAgent, isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
		isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
		urls = {
			'android' : 'http://ftp-apk.pcauto.com.cn/pub/autoclub-5000-autowapDL1.apk',
			'ios' : 'https://itunes.apple.com/cn/app/zhong-guo-che-you-hui/id640447959',
			'other' : 'http://www1.pcauto.com.cn/app/20141120/pcautoapp/index.html'
		};
	
	window.location.href = isAndroid ? urls.android : isiOS ? urls.ios : urls.other;
}
downApp();


/**
 * 判断是否是 IE 浏览器
 */
if (document.all) {
	alert('IE浏览器');
} else {
	alert('非IE浏览器');
}
if (!!window.ActiveXObject) {
	alert('IE浏览器');
} else {
	alert('非IE浏览器');
}
// 判断是IE几
var isIE = !!window.ActiveXObject;
var isIE6 = isIE && !window.XMLHttpRequest;
var isIE8 = isIE && !!document.documentMode;
var isIE7 = isIE && !isIE6 && !isIE8;
if (isIE) {
	if (isIE6) {
		alert('ie6');
	} else if (isIE8) {
		alert('ie8');
	} else if (isIE7) {
		alert('ie7');
	}
}

/**
 * 回车事件
 */
$("id").onkeypress = function (event) {
    event = (event) ? event : ((window.event) ? window.event : "")
    keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
    if (keyCode == 13) {
        $("id").onclick();
    }
} 
