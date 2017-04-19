var moveBind = function(objId, eventType, callBack) {
	var obj = document.getElementById(objId);
	if (obj.removeEventListener) {
		obj.removeEventListener(eventType, callBack, false);
	} else if (window.detachEvent) {
		obj.detachEvent('on' + eventType, callBack);
	} else {
		obj['on' + eventType] = null;
	}
}