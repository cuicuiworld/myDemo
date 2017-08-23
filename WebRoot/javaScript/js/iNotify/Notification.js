/**
 * Notification
 * 语音消息提醒和弹框提醒
 * 此方法涉及到用户是否愿意开启桌面通知，不可强制性，用户有完全主动性
 * 部分浏览器不支持桌面通知，就只支持语音提醒。
 * 浏览器越新，用户体验越好
 */


/***************************************************************
	window.webkitNotifications.checkPermission()
		返回三个值
		0-PERMISSION_ALLOWED-允许
		1-PERMISSION_NOT_ALLOWED-不允许
		2-PERMISSION_DENIED-拒绝
	
	window.webkitNotifications.requestPermission()
		调用该方法将会在浏览器的信息栏弹出一个是否允许桌面通知的提醒，该方法只能由用户主动事件触发
	
	window.webkitNotifications.createNotification('icon-url','title', 'body' )
		返回一个实例化的webkitNotifications对象
		
		notificationInstance.show()		弹出一个通知窗口
		notificationInstance.cancel()	关闭通知窗口
		
	Notification.Permission
		default-拒绝
		denied-用户不想要通知或支持但是没有开通
		granted-同意启用通知
		
	Notification.dir    //
	Notification.Body   //通知的具体内容
	Notification.tag    //实例化的notification的id
	Notification.icon   //通知的缩略图
	
	Notification对象四个事件：
		onshow()
		onclick()
		onclose()
		onerror()
	
	window.focus();//如果通知消息被点击,通知窗口将被激活，即可在其他页面时点击后浏览器切换到我们的页面！

 
****************************************************************/

var popNotice = function(url) {
	//通用情况下
	var audioElm = document.createElement('audio'), 
		source;
	
	//多个audio情况下
	if (Object.prototype.toString.call(url) === '[object Array]' && url.length > 0) {
		for (var i = 0; i < url.length; i++) {
			source = document.createElement('source');
			source.src = url[i];
			source.type = 'audio/' + url[i].match(/\.([^\.]+)$/)[1];
			audioElm.appendChild(source);
		}
	} else {
		//单个audio情况下
		audioElm.src = url;
	}
	
	if(url!=undefined){
		audioElm.play();
	}
	
	//在浏览器支持的情况下
	var Notification = window.Notification || window.mozNotification || window.webkitNotification;
	if (Notification) {
		if (Notification.permission == "granted") {//同意启用通知
			var notification = new Notification("新通知", {
				body : '您有新的单子来了,请留意总览信息！',
				icon : document.querySelectorAll('link[rel~=shortcut]')[0].href
			});

			notification.onshow = function() {
				setTimeout(function(){
					notification.close();
				}, 10000);
			}
	
			notification.onclick = function() {
				window.focus();//如果通知消息被点击,通知窗口将被激活，即可在其他页面时点击后浏览器切换到我们的页面！
				setTimeout(function(){
					notification.close();
				}, 5000);
			};
		} else if (Notification.permission != "denied") {//用户不想要通知 或者 支持Notification但未开启桌面提醒
			//调用该方法将会在浏览器的信息栏弹出一个是否允许桌面通知的提醒，该方法只能由用户主动事件触发
			Notification.requestPermission(function(permission) {
				if(Notification.permission !== permission){
					Notification.permission = permission;
				}
				var notification = new Notification("新通知", {
					body : '您有新的单子来了,请留意总览信息！',
					icon : document.querySelectorAll('link[rel~=shortcut]')[0].href
				});
			});
		}
	}
};

