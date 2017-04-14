
(function(){
	init = function(){
		if (checkBrowser() === !1) {
	        var e = document.createElement("div");
	        e.setAttribute("id", "browserTips"),
	        e.style.position = "absolute",
	        e.style.display = "inline-block",
	        e.style.width = "100% ",
	        e.style.top = "0px",
	        e.style.left = "0px",
	        $("body").append(e),
	        $(template).appendTo(e),
	        $(".brower-close").click(function() {
	            $(this).parent().remove()
	        })
	    }
	},
	template = '<div class="browser-box"><div class="browser-mid-con"><div class="browser-txt">亲，您的浏览器太古老了，为了更好的体验我们的服务，请升级您的浏览器！</div><div class="brower-link"><a href="//www.baidu.com/s?wd=chrome" class="brower-goole">谷歌浏览器</a><a href="//www.firefox.com.cn/" class="brower-firefox">火狐浏览器</a><a href="//www.baidu.com/s?wd=ie11" class="brower-ie">IE浏览器</a></div></div><div class="brower-close"></div></div>	',
	checkBrowser = function(){
		 var e = !0;
	     return navigator.userAgent.indexOf("MSIE") > 0 && (navigator.userAgent.indexOf("MSIE 6.0") > 0 && (e = !1),
	     navigator.userAgent.indexOf("MSIE 7.0") > 0 && (e = !1),
	     navigator.userAgent.indexOf("MSIE 8.0") > 0 && (e = !1)),
	     e
	},
	$(window).load(function(){
		init();
	})
})()