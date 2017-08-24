/**
 * websocket h5实时通讯接受消息进行数据处理
 */
var connectWebsocket = function(callback) {
	var reconnectTimer = null;
	var ws = null;
	var callback = callback || function() {};

	if (ws != null) {
		if (ws.readyState <= 1) {// 0 CONNECTING, 1 OPEN, 2 CLOSING, 3 CLOSED
			return;
		} else {
			ws = null;
		}
	}

	/*
	 * <% String cp = request.getServletContext().getContextPath(); if
	 * ("/".equals(cp)) cp=""; %>
	 */
	// 判断当前浏览器是否支持WebSocket
	var target = "ws://" + window.location.host + ws_url + "/websocket/ocrreq";
	if ('WebSocket' in window) {
		ws = new WebSocket(target);
	} else if ('MozWebSocket' in window) {
		ws = new MozWebSocket(target);
	} else {
		Core.alert({
			message : '请改用支持WebSocket的浏览器'
		});
		return;
	}

	// 连接成功建立的回调方法
	ws.onopen = function(obj) {
		console.info('open');
		console.info(obj);
		if (reconnectTimer) {
			clearInterval(reconnectTimer);
			reconnectTimer = null;
		}
	};

	// 连接关闭的回调方法
	ws.onclose = function(obj) {
		console.info('close');
		console.info(obj);
		if (reconnectTimer == null) {
			reconnectTimer = setInterval("connectWebsocket()", 3000);
		}
	};

	// 连接发生错误的回调方法
	ws.onerror = function(err) {
		console.info('error');
		console.info(err);
		if (reconnectTimer == null) {
			reconnectTimer = setInterval("connectWebsocket()", 3000);
		}
	}

	// 接收到消息的回调方法
	ws.onmessage = function(obj) {
		console.info('message');
		console.info(obj);
		if (reconnectTimer) {
			clearInterval(reconnectTimer);
			reconnectTimer = null;
		}
		var msg = JSON.parse(obj.data);
		if ("error" == msg.type) {
			Core.alert({
				message : msg.data.errorMsg
			});
			if (msg.data.errorCode == 401) {
				window.location.href = ws_url + "/page/login/login.jsp";
				return;
			} else {
				Core.alert({
					message : msg.data.errorMsg
				});
			}
		} else if ("newOcrReq" == msg.type) {
			callback(obj);
		}
	}

	// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
	window.onbeforeunload = function() {
		ws.close();
	}

	// ws.send(message)发送消息
};

//处理WebSocket的超时
//通常情况下，WebSocket连接创建后，如果30秒内没有任何活动，服务器端会对连接进行超时处理，防火墙也可以对单位周期没有活动的连接进行超时处理。
//为了防止这种情况的发生，可以每隔一定时间，往服务器发送一条空的消息

var timerId = 0;
function keepAlive() {//onOpen()方法最后面
	var timeout = 15000;
	if (webSocket.readyState == webSocket.OPEN) {
		webSocket.send('');
	}
	timerId = setTimeout(keepAlive, timeout);
}

function cancelKeepAlive() {//onClose()方法最后面
	if (timerId) {
		cancelTimeout(timerId);
	}
}