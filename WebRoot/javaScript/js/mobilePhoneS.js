/**
 * 判断手机处于横屏还是竖屏
 */
function hengshuping() {
	if (window.orientation == 180 || window.orientation == 0) {
		alert("竖屏状态！")
	}
	if (window.orientation == 90 || window.orientation == -90) {
		alert("横屏状态！")
	}
}

window.addEventListener("onorientationchange" in window ? "orientationchange"
		: "resize", hengshuping, false);

/**
 *  屏幕方向对应的window.orientation值：
 *	ipad： 90 或 -90 横屏
 *	ipad： 0 或180 竖屏
 *	Andriod：0 或180 横屏
 *	Andriod： 90 或 -90 竖屏
 */

/**
 * 
 * @returns {Boolean}
 */
function orient() {
	if (window.orientation == 90 || window.orientation == -90) {
		// ipad、iphone竖屏；Andriod横屏
		$("body").attr("class", "landscape");
		orientation = 'landscape';
		return false;
	} else if (window.orientation == 0 || window.orientation == 180) {
		// ipad、iphone横屏；Andriod竖屏
		$("body").attr("class", "portrait");
		orientation = 'portrait';
		return false;
	}
}
// 页面加载时调用
$(function() {
	orient();
});
// 用户变化屏幕方向时调用
$(window).bind('orientationchange', function(e) {
	orient();
});