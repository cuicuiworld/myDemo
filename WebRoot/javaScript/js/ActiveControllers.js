var logintype = globalConfig.LoginType == null || globalConfig.LoginType == undefined ? 'default' : globalConfig.LoginType.toLowerCase();//notload是无登录态
var marketJS = globalConfig.ISMarketJS == null || globalConfig.ISMarketJS == undefined ? 'default' : globalConfig.ISMarketJS.toLowerCase();//false是不加载有关市场的JS
var envir = globalConfig.Environment == null || globalConfig.Environment == undefined ? 'other' : globalConfig.Environment.toLowerCase();
var according = globalConfig.According == null || globalConfig.According == undefined ? 'other' : globalConfig.According.toLowerCase();

//google ad
function setGoogleAnalytics() {
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-3748357-1', 'auto');
    ga('send', 'pageview');
};
//UBT 记录Metric
var setMetric = function (name, typeValue) {
    if (typeof window['__bfi'] == 'undefined') window['__bfi'] = [];   //一个页面只需要判断一次
    window.__bfi.push(['_trackMetric', {
        name: name,    //{string} metric name 需要申请
        value: 1,       //{number} metric value 只能是数字
        tag: { type: typeValue },       //可选配置,{object} Metric Tag，Tag的Key只能是字符串,tag的值长度不能超过200，数量不能超过8个
        sample: 100,    //可选配置,数据抽样率，默认100，基于访客抽样
        callback: null  //可选配置,用于开发调试，提供status参数【1：发送成功, 8: tag数量超过限制, 110 tag的值不合法】
    }]);
};
//获取js的参数
var getArgs = function (args) {
    var Jsargs = "";
    if (args == null || args == 'undefined' || args == "") {
    }
    else {
        Jsargs = args;
    }
    return Jsargs;
};
//获取js的时间戳
var getTimeSpan = function () {
    var result = "?v=";
    try {
        var dom = document.getElementById("timespan");
        if (!!dom) {
            result = result + dom.getAttribute("value");
        }
    }
    catch (e) { }
    return result;
};
//设置时间戳变量
var tp = getTimeSpan();
//加载js 
var loadJS = function (url) {
    var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
    script.src = url + tp;
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);
}
//加载css
var loadCss = function (url, domid) {
    var css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('type', 'text/css');
    css.setAttribute('href', url + tp);
    var obj = document.getElementById(domid);
    if (!!obj) {
        obj.appendChild(css);
    }
}
if (!!(document.getElementById("jsMark"))) {//is js code
    //鼠标hover导航栏触发
    (function () {
        ; window.replace = function () { return '' }; window.replace = function () { return "" };
        !function () {
            window.replace = function () { return "" }; (function () {
                var h = document, c = function (a) { return h.getElementById(a) }, k = null, l = null, m = 0, d = [c("cui_nav_destination"), c("cui_nav_hotel"), c("cui_nav_vac"), c("cui_nav_flight"), c("cui_nav_more"), c("cui_nav_car"), c("cui_nav_trains"), c("cui_nav_tuan"), c("cui_nav_lpk"), c("cui_nav_ticket"), c("cui_nav_sl"), c("cui_nav_g")], g = {
                    onmouseenter: function (a, b) {
                        (h.all ? a.onmouseenter = b : a.onmouseover = function (a) {
                            (null == a.relatedTarget ? b() : this !== a.relatedTarget && 20 != this.compareDocumentPosition(a.relatedTarget) &&
                            b())
                        })
                    }, onmouseout: function (a, b) { (h.all ? a.onmouseleave = b : a.onmouseout = function (a) { (null == a.relatedTarget ? b() : this !== a.relatedTarget && 20 != this.compareDocumentPosition(a.relatedTarget) && b()) }) }, addEvent: function (a, b, f) { (a.addEventListener ? a.addEventListener(b, f, !1) : (a.attachEvent ? a.attachEvent("on" + b, f) : a["on" + b] = f)) }
                }, e = {
                    setTime: function () { g.onmouseenter(c("cui_nav"), function () { setTimeout(function () { m = 150 }, 30) }); g.onmouseout(c("cui_nav"), function () { m = 0 }) }, initEvent: function () {
                        for (var a = 0, b = d.length; b > a; a++) (function () {
                            var b =
                            a; g.onmouseenter(d[b], function () { e.interFn(d[b]) }); g.onmouseout(d[b], function () { e.outerFn(d[b]) })
                        })(a)
                    }, reset: function () { for (var a = 0, b = d.length; b > a; a++) d[a].className = (-1 < d[a].className.indexOf("cui_nav_current") ? "cui_nav_current" : "") }, padReset: function (a) { for (var b = 0, f = d.length; f > b; b++) (-1 < d[b].className.indexOf("cui_nav_current") ? d[b].className = "cui_nav_current" : b !== a && (d[b].className = "")) }, interFn: function (a) {
                        for (var b = document.getElementById("cui_nav").getElementsByTagName("li"), f = "", d = 0; d < b.length; d++) b[d].className.match((/cui_nav_current/)) &&
                        (f = b[d]); null != l && (clearTimeout(l), l = null); k = setTimeout(function () { e.reset(); (-1 < a.className.indexOf("cui_nav_current") ? f.className = "cui_nav_current" : (a.className = "cui_nav_o", f.className = "cui_nav_current cui_nav_unhover")) }, m)
                    }, outerFn: function (a) {
                        for (var b = document.getElementById("cui_nav").getElementsByTagName("li"), d = "", c = 0; c < b.length; c++) b[c].className.match((/cui_nav_current/)) && (d = b[c]); null != k && (clearTimeout(k), k = null); l = setTimeout(function () {
                            e.reset(); (-1 < a.className.indexOf("cui_nav_current") ?
                            d.className = "cui_nav_current" : (a.className = "", d.className = "cui_nav_current"))
                        }, 250)
                    }, initMobile: function () {
                        for (var a = 0, b = d.length; b > a; a++) (function () {
                            var b = a, c = d[b].getElementsByTagName("A")[0]; c.href = "###"; c.onmousedown = function () {
                                e.padReset(b); -1 === d[b].className.indexOf("cui_nav_current") && ((-1 < d[b].className.indexOf("cui_nav_o") ? (d[b].className = "", document.getElementsByClassName("cui_nav_current")[0].className = "cui_nav_current", c.style.visibility = "hidden", setTimeout(function () {
                                    c.style.visibility =
                                    "visible"
                                }, 10)) : (d[b].className = "cui_nav_o", document.getElementsByClassName("cui_nav_current")[0].className = "cui_nav_current", document.getElementsByClassName("cui_nav_current")[0].className += " cui_nav_unhover")))
                            }
                        })(a)
                    }, contains: function (a) { for (var b = 0, c = d.length; c > b; b++) if (0 < d[b].compareDocumentPosition(a) - 19) return !0; return !1 }
                }; c("headStyleId") && c("headStyleId").parentNode.removeChild(c("headStyleId")); ((/ip(hone|od)|ipad/i).test(navigator.userAgent) ? (e.initMobile(), g.addEvent(h.body, "click", function (a) {
                    e.contains(a.target ||
                    a.srcElement) || e.reset()
                })) : (e.setTime(), e.initEvent()))
            })()
        }();
    })();
}
//load headFloatJs
if ('http:' == document.location.protocol) {
    loadJS("http://webresource.c-ctrip.com/ResUnionOnline/R3/float/pcfloat.min.js");
    loadJS("http://webresource.c-ctrip.com/ResCRMOnline/R1/js/float/headFloat.min.js");
}
if ('https:' == document.location.protocol) {
    loadJS("https://webresource.c-ctrip.com/ResCRMOnline/R1/js/float/headFloat.min.js");
	loadJS("https://webresource.c-ctrip.com/ResUnionOnline/R3/float/pcfloat.min.js");
}

//加载市场相关的JS
var loadMarketJs = function () {
    try {
        if (marketJS != 'false') {
            //加载市场相关JS
            var protocolpefix = "https://";
            if ('http:' == document.location.protocol) {
                protocolpefix = "http://";
            }
            loadJS(protocolpefix + "webresource.c-ctrip.com/ResUnionOnline/R1/remarketing/js/remarketing.js");
        }
    }
    catch (e) { };
}
//delay load
setTimeout("setGoogleAnalytics();loadMarketJs();", 3000);

//加载版权信息
(function () {
    var crId = document.getElementById('copyright');
    if (crId != undefined) {
        var currdate = new Date();
        crId.insertAdjacentHTML("afterend", "1999-" + currdate.getFullYear());
    }
})();
//内页ie低版本窄屏样式
(function () {
    var ua = navigator.userAgent.toLowerCase();
    if ((ua.indexOf("msie 7") > -1 || ua.indexOf("msie 8") > -1) && screen.width <= 1200) {
        loadCss(document.location.protocol + "//webresource.c-ctrip.com/ResCRMOnline/R1/pageheader/css/PageHeader_1000_V2.css", "base_ft");
    }
})();
(function () {
    var config = {
        url: {
            loginAjax: 'https://' + globalConfig.AjaxUrl + '/member/ajax/AjaxGetCookie.ashx'
        },
        H1: globalConfig.H1 == null || globalConfig.H1 == undefined ? 'https' : globalConfig.H1,
        H3: globalConfig.H3 == null || globalConfig.H3 == undefined ? 'my.ctrip.com' : globalConfig.H3,
        AjaxUrl: globalConfig.AjaxUrl == null || globalConfig.AjaxUrl == undefined ? 'accounts.ctrip.com' : globalConfig.AjaxUrl,
        Lang: globalConfig.Lang == null || globalConfig.Lang == undefined ? 'gb2312' : globalConfig.Lang
    };
    var addClass = function (id, className) {
        var element = document.getElementById(id);
        if (element.className == "") {
            element.className = className;
        } else {
            element.className += " " + className;
        }
    };
    //绘制头部URL
    var createScript = function (url, isAsync) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = isAsync;
        s.src = url;
        var h = document.getElementsByTagName('head')[0];
        h.appendChild(s);
    };
    //生成backUrl
    var backUrl;
    try {
        backUrl = escape(decodeURIComponent(location.href)).replace(/\//g, "%2F");
    } catch (e) {
        backUrl = "";
    }

    var newHeaderFlag = function () {
        var flag = document.getElementById("_newHeaderFlag_");
        if (flag != undefined && flag.value === "true") {
            return true;
        }
        else {
            return false;
        }
    }();
    //创建登录态Jsonp请求
    window.GetUserHTML = function () {
        var temp = Math.random();
        //international hotel utf8 issue
        var isUncode;
        if (document.getElementById('bsType')) {
            isUncode = document.getElementById('bsType').value == "1" ? 1 : 0;
        }
        initHeader();
        var ajaxUrl1 = 'https://' + config.AjaxUrl + '/member/ajax/AjaxGetCookie.ashx?jsonp=BuildHTML&r=' + temp + '&encoding=' + isUncode;
        createScript(ajaxUrl1, true);
    };
    //初始化头部
    var initHeader = function () {
        if (newHeaderFlag) {
            var strhtml = "";
            var strhtml = "";
            var vstrshow = "";
            var pstrshow = "";
            var fstrshow = "";
            var vconfig = { "v2": "未提交订单", "v3": "未出行订单", "v4": "待点评订单", "v14": "我的携程", "v15": "全部订单", "v16": "会员", "loginname": "登录", "registeredname": "注册" }
            if (config.Lang.toLowerCase() == 'big5') {
                vconfig = { "v2": "未提交訂單", "v3": "未出行訂單", "v4": "待點評訂單", "v14": "我的攜程", "v15": "全部訂單", "v16": "會員", "loginname": "登錄", "registeredname": "註冊" }
            }
            strhtml += "<a rel=\"nofollow\" id=\"c_ph_login\" class=\"cui_links_login\" rel=\"nofollow\" href=\"" + config.H1 + "://" + config.AjaxUrl + "/member/login.aspx?BackUrl=" + backUrl + "&responsemethod=get\">" + vconfig.loginname + "</a>";
            strhtml += "<span>|</span>";
            strhtml += "<a rel=\"nofollow\" id=\"c_ph_register\" href=\"" + config.H1 + "://" + config.AjaxUrl + "/member/emailregist.aspx\" class=\"cui_links_reg\">" + vconfig.registeredname + "</a>";
            pstrshow += "<a rel=\"nofollow\" id=\"c_ph_myhome\" href=\"http://" + config.H3 + "/home/myinfo.aspx#ctm_ref=ssc_hp_myctrip_a\" class=\"cui_myctrip_status\">" + vconfig.v14 + "<b class=\"arrow\"></b></a>";
            vstrshow += "<input type=\"button\" onclick=\"DoLogin()\" id = \"myctripButton\" class=\"basebtns_01\" value=\"" + vconfig.loginname + "\" />";
            //vstrshow += "<li class=\"cui_account_info\"><a rel=\"nofollow\" href=\"http://" + config.H3 + "/home/Order/AllOrder.aspx\">" + vconfig.v15 + "</a></li>";
            //vstrshow += "<li class=\"divider\"></li>";
            document.getElementById("div_User").innerHTML = strhtml;
            document.getElementById("div_MyCtrip").innerHTML = pstrshow;
            //document.getElementById("div_Loginbtn").innerHTML = vstrshow;
            document.getElementById("div_MyCTMessages").innerHTML = fstrshow;
        }
        else {
            var strhtml = "";
            var vstrshow = "";
            var vconfig = { "v2": "未提交订单", "v3": "未出行订单", "v4": "待点评订单", "v14": "我的携程", "v15": "全部订单", "v16": "会员", "loginname": "登录", "registeredname": "注册" }
            if (config.Lang.toLowerCase() == 'big5') {
                vconfig = { "v2": "未提交訂單", "v3": "未出行訂單", "v4": "待點評訂單", "v14": "我的攜程", "v15": "全部訂單", "v16": "會員", "loginname": "登錄", "registeredname": "註冊" }
            }
            strhtml += "<a rel=\"nofollow\" id=\"c_ph_myhome\" href=\"http://" + config.H3 + "/home/myinfo.aspx#ctm_ref=ssc_hp_myctrip_a\" class=\"cui_myctrip_status\">" + vconfig.v14 + "</a><b></b>";
            strhtml += "<div class=\"cui_myctrip_lr\">";
            strhtml += "<a rel=\"nofollow\" id=\"c_ph_login\" class=\"cui_links_login\" rel=\"nofollow\" href=\"" + config.H1 + "://" + config.AjaxUrl + "/member/login.aspx?BackUrl=" + backUrl + "&responsemethod=get\">" + vconfig.loginname + "</a>";
            strhtml += "|";
            strhtml += "<a rel=\"nofollow\" id=\"c_ph_register\" href=\"" + config.H1 + "://" + config.AjaxUrl + "/member/emailregist.aspx\" class=\"cui_links_reg\">" + vconfig.registeredname + "</a>";
            strhtml += "</div>";
            vstrshow += "<input type=\"button\" onclick=\"DoLogin()\" id = \"myctripButton\" class=\"basebtns_01\" value=\"" + vconfig.loginname + "\" />";
            vstrshow += "<a rel=\"nofollow\" href=\"http://" + config.H3 + "/home/Order/AllOrder.aspx\">" + vconfig.v15 + "</a>";
            document.getElementById("notLogin").innerHTML = strhtml;
            document.getElementById("div_user").innerHTML = vstrshow;
        }

    };

    //登录方法
    window.DoLogin = function () {
        window.location.href = config.H1 + "://" + config.AjaxUrl + "/member/login.aspx?BackUrl=" + backUrl + "&responsemethod=get#ctm_ref=c_ph_login_buttom";
    };

    window.BuildHTML = function (data) {
        var thisURL = document.URL;
        var userhtml = "";
        var strhtml = "";
        var vstrshow = "";
        var pstrshow = "";
        var fstrshow = "";
        var remindhtml = "";
        //min func my ctrip menu node
        var elMinMyCtrip = document.getElementById("ulCTMinMC");
        //full func my ctrip menu node
        var elFullMyCtrip = document.getElementById("ulCTFullMC");

        var vconfig = { "v2": "未提交订单", "v3": "未出行订单", "v4": "待点评订单", "v14": "我的携程", "v15": "全部订单", "v16": "会员", "loginname": "登录", "registeredname": "注册" }
        if (config.Lang.toLowerCase() == 'big5') {
            vconfig = { "v2": "未提交訂單", "v3": "未出行訂單", "v4": "待點評訂單", "v14": "我的攜程", "v15": "全部訂單", "v16": "會員", "loginname": "登錄", "registeredname": "註冊" }
        }
        if (newHeaderFlag) {
            if (data == null) {
                //商旅平台移除我携登陆 modified by Joey.Zhang 20141105
                if (document.domain == "ct.ctrip.com" || document.domain == "ct.uat.qa.nt.ctripcorp.com") {
                    document.getElementById("loginDivLi").style.display = 'none';
                }
                //show min func my ctrip menu
                if (elFullMyCtrip != null) { elFullMyCtrip.parentNode.removeChild(elFullMyCtrip); elMinMyCtrip.style.display = "block"; };
            }
            else {
                if (data.hascookieuser == "F") {
                    //show min func my ctrip menu
                    if (elFullMyCtrip != null) { elFullMyCtrip.parentNode.removeChild(elFullMyCtrip); elMinMyCtrip.style.display = "block"; };

                    strhtml += "<a rel=\"nofollow\" id=\"c_ph_login\" class=\"cui_links_login\" rel=\"nofollow\" href=\"" + config.H1 + "://" + config.AjaxUrl + "/member/login.aspx?BackUrl=" + backUrl + "&responsemethod=get\">" + vconfig.loginname + "</a>";
                    strhtml += "<span>|</span>";
                    strhtml += "<a rel=\"nofollow\" id=\"c_ph_register\" href=\"" + config.H1 + "://" + config.AjaxUrl + "/member/emailregist.aspx\" class=\"cui_links_reg\">" + vconfig.registeredname + "</a>";
                    pstrshow += "<a rel=\"nofollow\" id=\"c_ph_myhome\" href=\"http://" + config.H3 + "/home/myinfo.aspx#ctm_ref=ssc_hp_myctrip_a\" class=\"cui_myctrip_status\">" + vconfig.v14 + "<b class=\"arrow\"></b></a>";
                    vstrshow += "<input type=\"button\" onclick=\"DoLogin()\" id = \"myctripButton\" class=\"basebtns_01\" value=\"" + vconfig.loginname + "\" />";
                    //商旅平台移除我携登陆 modified by Joey.Zhang 20141105
                    if (document.domain == "ct.ctrip.com" || document.domain == "ct.uat.qa.nt.ctripcorp.com") {
                        document.getElementById("loginDivLi").style.display = 'none';
                    }
                    document.getElementById("div_User").className = "userLogin";
                }
                else {
                    //show full func my ctrip menu
                    if (elMinMyCtrip != null) { elMinMyCtrip.parentNode.removeChild(elMinMyCtrip) };

                    strhtml = "<ul>";
                    if (data.usershortname != "") {
                        if (data.usershortname != data.username) {
                            data.usershortname = data.username.substring(0, 7) + "…";
                        }
                        //样式控制长度
                        strhtml += "<li><p class=\"user_name\" title=\"" + data.username + "\">" + data.username + "</p></li>";
                    }
                    else {
                        if (data.vipgradename == "普通会员" || data.vipgradename == "普通會員") {
                            data.vipgradename = vconfig.v16;
                        }
                        strhtml += "<li class=\"user\"><p class=\"user_name\" title=\"" + "尊敬的" + data.vipgradename + "\">" + "尊敬的" + data.vipgradename + "</p></li>";
                    }
                    strhtml += "<li class=\"logout\"><a rel=\"nofollow\" id=\"c_ph_logout\" href=\"" + config.H1 + "://" + config.AjaxUrl + "/member/logout.aspx\" class=\"cui_links_exit\">退出</a></li>";
                    strhtml += "</ul>";
                    pstrshow += "<a rel=\"nofollow\" id=\"c_ph_myhome\" href=\"http://" + config.H3 + "/home/myinfo.aspx#ctm_ref=ssc_hp_myctrip_a\" class=\"cui_myctrip_status\">" + vconfig.v14 + "<b class=\"arrow\"></b></a>";

                    if (data.noreadmessagecount != "0") { //短信不为零，既要显示信封图标，又要显示短信个数
                        fstrshow += "<a rel=\"nofollow\" href=\"http://" + config.H3 + "/message/message/messagelist.aspx?status=F#ctm_ref=ssc_hp_myctrip_message_a\" class=\"badge\">(" + data.noreadmessagecount + ")</a>";
                    }
                    else {//短信为零时，只显示信封标签
                        fstrshow += "<a rel=\"nofollow\" href=\"http://" + config.H3 + "/message/message/messagelist.aspx?status=F#ctm_ref=ssc_hp_myctrip_message_a\" class=\"badge\"></a>";
                    }
                    //vstrshow += "<a rel=\"nofollow\" href=\"http://" + config.H3 + "/home/Order/AllOrder.aspx\">" + vconfig.v15 + "</a><li class=\"divider\"></li>";
                    addClass("loginDivLi", "cui_myctrip_hover");
                    document.getElementById("div_User").className = "user";
                    document.getElementById("div_Loginbtn").parentNode.style.display = "none";
                    var oNext = document.getElementById("div_User").nextElementSibling || document.getElementById("div_User").nextSibling;//ie8 fix
                    oNext.style.marginTop = "-2px";
                }
                document.getElementById("div_User").innerHTML = strhtml;
                document.getElementById("div_MyCtrip").innerHTML = pstrshow;
                document.getElementById("div_Loginbtn").innerHTML = vstrshow;
                document.getElementById("div_MyCTMessages").innerHTML = fstrshow;
            }
        }
        else {
            if (data == null) {
                //商旅平台移除我携登陆 modified by Joey.Zhang 20141105
                if (document.domain == "ct.ctrip.com" || document.domain == "ct.uat.qa.nt.ctripcorp.com") {
                    document.getElementById("loginDivLi").style.display = 'none';
                }
            }
            else {
                if (data.hascookieuser == "F") {
                    strhtml += "<a rel=\"nofollow\" id=\"c_ph_myhome\" href=\"http://" + config.H3 + "/home/myinfo.aspx#ctm_ref=ssc_hp_myctrip_a\" class=\"cui_myctrip_status\">" + vconfig.v14 + "</a><b></b>";
                    strhtml += "<div class=\"cui_myctrip_lr\">";
                    strhtml += "<a rel=\"nofollow\" id=\"c_ph_login\" class=\"cui_links_login\" rel=\"nofollow\" href=\"" + config.H1 + "://" + config.AjaxUrl + "/member/login.aspx?BackUrl=" + backUrl + "&responsemethod=get\">" + vconfig.loginname + "</a>";
                    strhtml += "|";
                    strhtml += "<a rel=\"nofollow\" id=\"c_ph_register\" href=\"" + config.H1 + "://" + config.AjaxUrl + "/member/emailregist.aspx\" class=\"cui_links_reg\">" + vconfig.registeredname + "</a>";
                    strhtml += "</div>";

                    vstrshow += "<input type=\"button\" onclick=\"DoLogin()\" id = \"myctripButton\" class=\"basebtns_01\" value=\"" + vconfig.loginname + "\" />";
                    vstrshow += "<a rel=\"nofollow\" href=\"http://" + config.H3 + "/home/Order/AllOrder.aspx\">" + vconfig.v15 + "</a>";

                    //商旅平台移除我携登陆 modified by Joey.Zhang 20141105
                    if (document.domain == "ct.ctrip.com" || document.domain == "ct.uat.qa.nt.ctripcorp.com") {
                        document.getElementById("loginDivLi").style.display = 'none';
                    }
                }
                else {
                    strhtml += "<a rel=\"nofollow\" id=\"c_ph_myhome\" href=\"http://" + config.H3 + "/home/myinfo.aspx#ctm_ref=ssc_hp_myctrip_a\" class=\"cui_myctrip_status\">" + vconfig.v14 + "</a>";
                    if (data.usershortname != "") {
                        if (data.usershortname != data.username) {
                            data.usershortname = data.username.substring(0, 7) + "…";
                        }
                        //样式控制长度
                        strhtml += "<div class=\"cui_myctrip_username\" title=\"" + data.username + "\">" + data.username + "</div>";
                    }
                    else {
                        if (data.vipgradename == "普通会员" || data.vipgradename == "普通會員") {
                            data.vipgradename = vconfig.v16;
                        }
                        strhtml += "<div class=\"cui_myctrip_username\" title=\"" + "尊敬的" + data.vipgradename + "\">" + "尊敬的" + data.vipgradename + "</div>";
                    }
                    strhtml += "<b></b>";
                    strhtml += "<a rel=\"nofollow\" id=\"c_ph_logout\" href=\"" + config.H1 + "://" + config.AjaxUrl + "/member/logout.aspx\" class=\"cui_links_exit\">退出</a>";
                    if (data.noreadmessagecount != "0") {//短信不为零
                        strhtml += "<a rel=\"nofollow\" href=\"http://" + config.H3 + "/message/message/messagelist.aspx?status=F#ctm_ref=ssc_hp_myctrip_message_a\" class=\"cui_links_msg\">" + data.noreadmessagecount + "</a>";
                    }
                    else {//短信为零，则只显示信封图标
                        strhtml += "<a rel=\"nofollow\" href=\"http://" + config.H3 + "/message/message/messagelist.aspx?status=F#ctm_ref=ssc_hp_myctrip_message_a\" class=\"cui_links_msg\"></a>";
                    }

                    vstrshow += "<a rel=\"nofollow\" href=\"http://" + config.H3 + "/home/Order/AllOrder.aspx\">" + vconfig.v15 + "</a>";
                    addClass("loginDivLi", "cui_myctrip_hover");
                }
                document.getElementById("notLogin").innerHTML = strhtml;
                document.getElementById("div_user").innerHTML = vstrshow;
            }
        }
    };

    var addFloatEventHandler = function (obj, eventName, fun) {
        var fn = fun;
        if (obj.attachEvent) {
            obj.attachEvent('on' + eventName, fn);
        } else if (obj.addEventListener) {
            obj.addEventListener(eventName, fn, false);
        } else {
            obj["on" + eventName] = fn;
        }
    };
    var doLangEvent = function () {
        addFloatEventHandler(document.getElementById('cui_lang_cn'), 'click', function (e) {
            setLangCookie({ "Customer": "HAL=ctrip_cn" }, "");
            setLangCookie({ "_ctm_t": "ctrip" }, "off");
        });
        var cui_langlist = document.getElementById("cui_lang_list");
        languageClick(cui_langlist.getElementsByTagName("a"));
        //var langbot = document.getElementById("cui_lang_bottom");
        //languageClick(langbot.getElementsByTagName("a"));
    };
    var languageClick = function (langlis) {
        for (var i = 0, len = langlis.length; i < len; i++) {
            addFloatEventHandler(langlis[i], 'click', function (e) {
                var _this = e.srcElement || e.target;//_this重新指向事件
                var lang = _this.id;
                if (_this.id == "") {
                    lang = _this.className.replace('language', 'ctrip');
                }
                setLangCookie({ "Customer": "HAL=" + lang }, "");
                setLangCookie({ "_ctm_t": "ctrip" }, "off");
            });
        }
    };
    var setLangCookie = function (keyMap, keyType) {
        var sub_domain = (document.domain || "").replace(/^[\w\W]*\.ctrip(travel)??\.com(.hk)??/, "ctrip$1.com$2");
        var a = [];
        for (var k in keyMap) {
            var s = keyMap[k] === null ? "" : keyMap[k];
            a.push(k + "=" + s);
        }
        var expdate = new Date();
        expdate.setDate(expdate.getDate() + 7);
        if (keyType == "") {
            document.cookie = a.join("&") + "; expires=" + expdate.toGMTString() + "; domain=" + sub_domain + ";path=/;";
        } else {
            document.cookie = a.join("&") + "; domain=" + sub_domain + ";path=/;";
        }
    };

    GetUserHTML();
    //登录模块
    var ctripLogin = function () {
        var that = this;
        var isLogin = false,
        Event = {
            onmouseenter: function (o, f) {
                if (document.all) {
                    o.onmouseenter = function (e) {
                        f();
                    };
                } else {
                    o.onmouseover = function (e) {
                        e.relatedTarget == null ? f() : (!(this === e.relatedTarget || this.compareDocumentPosition(e.relatedTarget) == 20) && f());
                    };
                }
            },
            onmouseout: function (o, f) {
                if (document.all) {
                    o.onmouseleave = f;
                } else {
                    o.onmouseout = function (e) {
                        e.relatedTarget == null ? f() : (!(this === e.relatedTarget || this.compareDocumentPosition(e.relatedTarget) == 20) && f());
                    }
                }
            },
            bindLogin: function () {
                if (newHeaderFlag) {
                    this.onmouseenter(document.getElementById('loginDivLi'), function () {
                        document.getElementById('loginDivLi').getElementsByTagName('b')[0].className = "arrow b_h";
                        document.getElementById('loginDiv').style.display = 'block';
                    });
                    this.onmouseout(document.getElementById('loginDivLi'), function () {
                        document.getElementById('loginDivLi').getElementsByTagName('b')[0].className = "arrow";
                        document.getElementById('loginDiv').style.display = 'none';
                    });
                }
                else {
                    this.onmouseenter(document.getElementById('loginDivLi'), function () {
                        document.getElementById('loginDivLi').getElementsByTagName('b')[0].className = "b_h";
                        document.getElementById('loginDivLi').getElementsByTagName('b')[1].className = "b_h";
                        document.getElementById('loginDiv').style.display = 'block';
                    });
                    this.onmouseout(document.getElementById('loginDivLi'), function () {
                        document.getElementById('loginDivLi').getElementsByTagName('b')[0].className = "";
                        document.getElementById('loginDivLi').getElementsByTagName('b')[1].className = "";
                        document.getElementById('loginDiv').style.display = 'none';
                        document.getElementById('notLoginDiv').style.display = 'none';
                    });
                }

            }
        },
        Func = {
            request: function (url) {
                request(url, {
                    async: true,
                    method: 'POST',
                    onsuccess: function (response) {
                        var isLogin = response.responseText.split('@@')[0];
                        var userName = response.responseText.split('@@')[1];
                        that.isLogin = (new Function("return (" + isLogin + ');'))();
                        if (that.isLogin) {
                            document.getElementById('yetLogin').style.display = '';
                            document.getElementById('notLogin').style.display = 'none';
                            document.getElementById('usernameId').innerHTML = userName + '<br/>我的携程';
                            Func.requestOrder();
                        }
                    }
                });
            },
            requestOrder: function () {
                request(config.url.orderAjax, {
                    async: true,
                    method: 'POST',
                    onsuccess: function (response) {
                        var res = (new Function("return (" + response.responseText + ');'))();
                        document.getElementById('notSubmitBtn').innerHTML = res.UnSubmitOrder;
                        document.getElementById('notTravelBtn').innerHTML = res.WaitAllReviewCount;
                        document.getElementById('notSayBtn').innerHTML = res.NotravelOrder;
                    }
                });
            }
        };
        Event.bindLogin();
        //Func.request(config.url.loginAjax);
    }();
    doLangEvent();
})();

(function () {
    var checkOnlineDate = function (onlinetime) {
        var datelist = onlinetime.split('$');
        var dn = new Date();
        var online = new Date(Date.parse(datelist[0]));
        var offline = new Date(Date.parse(datelist[1]));
        if (dn >= online && dn < offline) {
            return true;
        }
        else {
            return false;
        }
    };
    var activityController = function () {
        try {
            for (var i = configArr.length - 1; i >= 0; i--) {
                var num = Number(configArr[i].id);
                if (!isNaN(num)) {
                    var dom = document.getElementById("ACT_Label_" + configArr[i].id);
                    if (!!dom && checkOnlineDate(configArr[i].onlinetime)) {
                        dom.style.display = "";
                    }
                }
                else {
                    var node = document.getElementById(configArr[i].id);
                    if (!!node) {
                        if (configArr[i].id == "ctrip_doodle") {
                            if (checkOnlineDate(configArr[i].onlinetime)) {
                                node.style.display = "";
                            }
                        }
                        else {
                            var divnode = node.parentNode.previousElementSibling || node.parentNode.previousSibling;
                            var parentnode = node.parentNode.parentNode;
                            if (!!parentnode && (parentnode.children[0].children[0].id == configArr[i].id)) {
                                divnode = node.parentNode.nextElementSibling || node.parentNode.nextSibling;
                            }

                            if (!!divnode && checkOnlineDate(configArr[i].onlinetime)) {
                                divnode.style.display = "";
                                node.style.display = "";
                            }
                        }
                    }

                }
            }
        }
        catch (e) {
        }
    }

    var configArr = "";
    var activityConfig = document.getElementById("ActConfig_ID").textContent || document.getElementById("ActConfig_ID").innerText;
    if (!!activityConfig) {
        configArr = eval('(' + activityConfig + ')');
        activityController();
    }
})();

(function () {
    var replaceTelNum = function (telArr) {
        try {
            if (telArr == null || telArr.length == 0)
                return;

            var parentNode = document.getElementById("cui_service_cn"); //li标签
            if (!parentNode)
                return;

            var len = parentNode.children.length;   //未追加节点时的children数量,最后清除用到

            var telLen = telArr.length;
            if (telLen == 1) { //只有一行                        
                var telInfo = telArr[0];
                var formatTelNum = telInfo.formatTelNum;
                var prefix = telInfo.prefix;
                var suffix = telInfo.suffix;

                var newNode = generateFirstNode(formatTelNum, prefix, suffix);

                parentNode.appendChild(newNode);
            } else {
                //div下拉列表
                var div = document.createElement("div");
                div.className = "service_wrap drowndrop";
                div.onmouseover = function () {
                    document.getElementById('cui_service_cn').children[0].className = 'service_tel service_current';
                    this.style.display = 'block';
                };
                div.onmouseout = function () {
                    document.getElementById('cui_service_cn').children[0].className = 'service_tel';
                    this.style.display = 'none';
                };

                var ul = document.createElement("ul");
                ul.className = "service_list";

                var li = document.createElement("li");
                var dl = document.createElement("dl");

                div.appendChild(ul).appendChild(li).appendChild(dl);
                var newNode1;

                for (var i = 0; i < telLen; i++) {
                    var telInfo = telArr[i];
                    var formatTelNum = telInfo.formatTelNum;
                    var prefix = telInfo.prefix;
                    var suffix = telInfo.suffix; //"07-23";


                    if (i == 0) { //第一行节点
                        newNode1 = generateFirstNode(formatTelNum, prefix, suffix, true);
                        parentNode.appendChild(newNode1);
                    } else { //下拉的节点
                        var dd = document.createElement("dd");
                        dd.innerHTML = (prefix && prefix.indexOf("（或）") != -1 ? "<span style=\"color:#999\">（或）</span>" : prefix) + "<em>" + formatTelNum + (!!suffix ? " <i class=\"time\">" + suffix + "</i>" : "") + "</em>";
                        dl.appendChild(dd);
                    }
                }

                parentNode.appendChild(div);
            }

            //替换成功后,最后清除原有的对象
            for (var j = len - 1; j >= 0; j--) {
                parentNode.removeChild(parentNode.children[j]);
            }
        } catch (e) {

        }
    };

    //生成第一个节点
    var generateFirstNode = function (formatTelNum, prefix, suffix, hasArrow) {
        var hasPrefix = !!prefix;
        var pNode;
        if (hasArrow) {
            pNode = document.createElement("a");
            pNode.className = "service_tel";

            pNode.onmouseover = function () {
                this.className = 'service_tel service_current';
                document.getElementById('cui_service_cn').children[1].style.display = 'block';
            };
            pNode.onmouseout = function () {
                this.className = 'service_tel';
                document.getElementById('cui_service_cn').children[1].style.display = 'none';
            };
        }

        var em = document.createElement("em");
        em.className = "service_telnum";
        em.innerHTML = formatTelNum + (!hasPrefix && !!suffix ? " <i class=\"time\">" + suffix + "</i>" : "");  //前后缀同时存在,不显示后缀

        var node;
        if (hasPrefix || hasArrow) {
            var span = document.createElement("span");
            span.innerText = prefix;
            if (prefix.indexOf("国内") != -1)
                span.title = "免境内长话费";

            if (pNode) {
                pNode.appendChild(span);
            } else {
                pNode = span;
            }
            node = span;
        }
        if (node) {
            node.appendChild(em);
        } else {
            if (pNode) {
                pNode.appendChild(em);
                node = pNode;
            } else {
                pNode = node = em;
            }
        }

        if (hasArrow) {
            var arrow = document.createElement("b");
            arrow.className = "arrow";
            node.appendChild(arrow);
        }

        return pNode;
    };

    var formatTel = document.getElementById("formatTel");
    if (formatTel) {
        try {
            var telValue = formatTel.value;
            if (!!telValue && telValue != "#FormatTel#") {  //如果为空或者是默认值均不做替换动作
                var telArr = eval('(' + telValue + ')');
                replaceTelNum(telArr);
            }
        } catch (e) {

        }
    }
    
    /*! 2017-03-21_18:17:10 gao_w@ctrip.com */
    !function(){
    	var n = {
			loadJs:function(n,o){
				var t=document.createElement("script");
					t.type="text/javascript",
					t.async=!0,
					n.indexOf("?")>-1 ? t.src = n+"&v="+o : t.src=n+"?v="+o;
				var i=document.getElementsByTagName("script")[0];
					i.parentNode.insertBefore(t,i)},
					isHttps:function(n){
						var o=n.protocol;
						return"https:"==o
					}
    		},
    		o = { 
    			_config:{version:"20160707"
    		},
    		loadNts : function(o){
    			var t = window.location.protocol,
    			i = t+"//webresource.c-ctrip.com/ResUnionOnline/R1/remarketing/js/__nts.js";
    			n.loadJs(i,o)
    		},
    		loadThirdPart:function(o){
    			var t="http://webresource.c-ctrip.com/ResUnionOnline/R1/remarketing/js/thirdPart.js";
    			n.loadJs(t,o)
    		},
    		loadConvJs:function(o){
    			var t="http://webresource.c-ctrip.com/ResUnionOnline/R1/remarketing/js/conv.js";
    			n.loadJs(t,o)
    		},
    		init:function(){
    			var o=this,
    			t=window.location;
    			o.loadNts(o._config.version),
    			n.isHttps(t)||(o.loadThirdPart(o._config.version),
    			o.loadConvJs(o._config.version))
    		}
    	};
    	o.init()
    	}();
})();