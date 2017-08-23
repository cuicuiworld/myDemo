/**
 * 方法一
 * 
 * https://segmentfault.com/a/1190000007526917
 */
;
(function(doc, win, undefined) {
	var docEl = doc.documentElement, 
		resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize', 
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (clientWidth === undefined)
				return;
			docEl.style.fontSize = 20 * (clientWidth / 640) + 'px';
		};
	if (doc.addEventListener === undefined)
		return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);