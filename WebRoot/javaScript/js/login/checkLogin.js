var loginComponent = {
    ciaUrl: basicInfo.ciaUrl,
    logined: !1,
    clientId: basicInfo.clientId,
    callBackParam: "callback",
    actionParam: "action",
    accountParam: "account",
    defaultCallBack: basicInfo.officialUrl,
    authCode: undefined,
    testLogin: function() {
        $.ajax({
            url: loginComponent.ciaUrl + "/internal_api/authorizeByJsonp?client_id=" + loginComponent.clientId,
            type: "GET",
            dataType: "jsonp",
            data: {
                jsonp: !0
            },
            success: function(e) {
                e.code && loginComponent.jumpToCallback()
            }
        })
    },
    synCode: function(e) {
        var t = {};
        t.code = e,
        $.ajax({
            type: "POST",
            url: "/login/codeToken",
            data: t,
            dataType: "json",
            success: function(e) {
                e != 1 && loginComponent.jumpToCallback()
            },
            error: function() {
                loginComponent.jumpToCallback()
            }
        })
    },
    jumpToCallback: function() {
        var e = loginComponent.queryString(loginComponent.callBackParam);
        e ? (e.indexOf("http") != 0 && e.indexOf("//") != 0 && (e = "http://" + e),
        window.top.location.href = e) : window.top.location.href = loginComponent.defaultCallBack
    },
    queryString: function(e) {
        var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)","i")
          , n = window.location.search.substr(1).match(t);
        return n != null ? unescape(n[2]) : null
    },
    jumpToRegister: function() {
        window.top.location.href = basicInfo.registerUrl + "/register/register"
    },
    jumpToChanjetIndex: function() {
        window.top.location.href = loginComponent.defaultCallBack
    }
};
$(window).load(function() {
    loginComponent.testLogin()
});
