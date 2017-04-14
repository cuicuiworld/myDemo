$(window).load(function() {
    recovery.init()
});
var errorInfo = {
    accountNotExist: "帐号不存在",
    accountNumberError: "请输入正确的手机号/邮箱"
}
  , passwordCheck = {
    lengthCheck: !1,
    blankCheck: !1,
    characterCheck: !1,
    againCheck: !1,
    passwordLevel: 1,
    oldSMSCode: "",
    oldAccountNumber: ""
}
  , htmlElement = {
    $account_number: $("#accountNumber"),
    $account_error_text: $("#accountErrorText"),
    $btn_step1: $("#btnStep1"),
    $btn_step2: $("#btnStep2"),
    $btn_step3: $("#btnStep3"),
    $slider_box: $("#sliderBox"),
    $csessionid: $("#csessionid"),
    $token: $("#token"),
    $sig: $("#sig"),
    $form_security_check: $("#securityCheck"),
    $form_code_check: $("#codeCheck"),
    $form_reset_password: $("#resetPassword"),
    $btn_send_code: $("#sendCode"),
    $ipt_sms_code: $("#smsCode"),
    $ipt_password_set: $("#passwordSet"),
    $ipt_password_check: $("#passwordCheck"),
    $ipt_password_level: $("#passwordLevel"),
    $ipt_password: $("#password"),
    $safe_txt1: $(".safe-txt1"),
    $safe_txt2: $(".safe-txt2"),
    $safe_txt3: $(".safe-txt3"),
    $safe_revise_box: $(".safe-revise-box"),
    $safe_bar_post: $(".safe-bar-post"),
    $div_input_group: $(".input-group"),
    $div_input_group_recise: $(".input-group-recise"),
    $ipt_uuid: $("#uuid"),
    $span_safe_txt: $(".safe-bar-txt-org"),
    $passwordErrorText: $("#passwordErrorText"),
    step1AllowClick: function() {
        !$(".btn-red-step1").size() > 0 && htmlElement.$btn_step1.addClass("btn-red-step1")
    },
    step1Disabled: function() {
        htmlElement.$btn_step1.removeClass("btn-red-step1")
    },
    step2AllowClick: function() {
        !$(".btn-red-step3").size() > 0 && (htmlElement.$btn_step2.addClass("btn-red-step2"),
        htmlElement.$btn_step2.addClass("step-btn"))
    },
    step2Disabled: function() {
        htmlElement.$btn_step2.removeClass("btn-red-step2"),
        htmlElement.$btn_step2.removeClass("step-btn")
    },
    step3AllowClick: function() {
        !$(".btn-red-step3").size() > 0 && (htmlElement.$btn_step3.addClass("btn-red-step3"),
        htmlElement.$btn_step3.addClass("step-btn"))
    },
    step3Disabled: function() {
        htmlElement.$btn_step3.removeClass("btn-red-step3"),
        htmlElement.$btn_step3.removeClass("step-btn")
    },
    sendSMSDisabled: function() {
        htmlElement.$btn_send_code.attr("disabled", "disabled"),
        htmlElement.$btn_send_code.addClass("btn-disabled"),
        htmlElement.$btn_send_code.addClass("code-gray")
    },
    sendSMSAllowClick: function() {
        htmlElement.$btn_send_code.removeAttr("disabled", "disabled"),
        htmlElement.$btn_send_code.removeClass("btn-disabled"),
        htmlElement.$btn_send_code.removeClass("code-gray")
    }
}
  , recovery = {
    "int": 0,
    aliCheck: !1,
    validateAccount: !1,
    accountExist: !1,
    accountChange: !1,
    accountBeforeChange: "",
    init: function() {
        this.bindEvent(),
        this.createUI()
    },
    bindEvent: function() {
        htmlElement.$account_number.on("change", function() {
            var e = $(this).val();
            htmlElement.$account_error_text.hide(),
            htmlElement.step1Disabled();
            if (!recovery.validateAccountNumber(e)) {
                recovery.validateAccount = !1,
                htmlElement.$account_error_text.show(),
                htmlElement.$account_error_text.text(errorInfo.accountNumberError);
                return
            }
            recovery.validateAccount = !0,
            recovery.aliCheck && htmlElement.step1AllowClick()
        }),
        htmlElement.$account_number.on("keyup", function() {
            var e = $(this).val();
            e != "" && recovery.aliCheck ? htmlElement.$btn_step1.addClass("step-btn") : htmlElement.$btn_step1.removeClass("step-btn"),
            recovery.validateAccountNumber(e) && (htmlElement.$account_error_text.hide(),
            recovery.validateAccount = !0)
        }),
        htmlElement.$account_number.on("paste", function() {
            var e = $(this).val();
            e != "" && recovery.aliCheck && htmlElement.$btn_step1.addClass("step-btn"),
            recovery.validateAccountNumber(e) && (htmlElement.$account_error_text.hide(),
            recovery.validateAccount = !0)
        }),
        htmlElement.$form_security_check.on("click", ".btn-red-step1", function() {
            htmlElement.$form_security_check.submit()
        }),
        htmlElement.$btn_send_code.on("click", function() {
            htmlElement.sendSMSDisabled(),
            $.post("/password/sendFindPasswordCode", {
                accountNumber: htmlElement.$account_number.val()
            }, function(e) {
                e = JSON.parse(e),
                e && e.result && (!e.errorCode || e.errorCode == "") ? recovery.timeKeeping(59) : e.errorCode == "20024" ? (htmlElement.$account_error_text.show(),
                htmlElement.$account_error_text.text("您已获取3次验证码，锁定帐号1小时")) : e.errorCode == "a00001" ? (htmlElement.$account_error_text.show(),
                htmlElement.$account_error_text.text("60秒内仅能获取一次"),
                recovery.timeKeeping(59)) : e.param != undefined && (htmlElement.$account_error_text.show(),
                htmlElement.$account_error_text.text(e.errorMessage))
            })
        }),
        htmlElement.$ipt_sms_code.on("paste", function() {
            htmlElement.$account_error_text.text(""),
            setTimeout(function() {
                htmlElement.$ipt_sms_code.val(htmlElement.$ipt_sms_code.val().trim()),
                htmlElement.$ipt_sms_code.val().trim() != "" ? htmlElement.step2AllowClick() : htmlElement.step2Disabled()
            }, 100)
        }),
        htmlElement.$ipt_sms_code.on("keyup", function() {
            htmlElement.$account_error_text.text(""),
            $(this).val($(this).val().trim()),
            $(this).val().trim() != "" ? htmlElement.step2AllowClick() : htmlElement.step2Disabled()
        }),
        htmlElement.$ipt_sms_code.on("change", function() {
            $(this).val().trim() != "" && $(this).val() != passwordCheck.oldSMSCode ? (htmlElement.step2AllowClick(),
            passwordCheck.oldSMSCode = $(this).val()) : htmlElement.step2Disabled()
        }),
        htmlElement.$form_code_check.on("click", ".btn-red-step2", function() {
            $.post("/password/checkFindPasswordCode", {
                accountNumber: htmlElement.$account_number.val(),
                code: htmlElement.$ipt_sms_code.val()
            }, function(e) {
                e = JSON.parse(e),
                e && e.result && (!e.errorCode || e.errorCode == "") && e.isValidCode == "1" ? (htmlElement.$ipt_uuid.val(e.uuid),
                htmlElement.$form_code_check.submit()) : e && e.isValidCode && e.isValidCode == "0" ? (htmlElement.$account_error_text.show(),
                htmlElement.$account_error_text.text("验证码错误")) : e && e.errorCode && e.errorCode == "20024" ? (htmlElement.$account_error_text.show(),
                htmlElement.$account_error_text.text("验证码已失效，请重新获取")) : (htmlElement.$account_error_text.show(),
                htmlElement.$account_error_text.text("安全校验错误，请刷新页面再试")),
                htmlElement.step2Disabled()
            })
        }),
        htmlElement.$ipt_password_set.on("keyup", function() {
            var e = new RegExp("^(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\\W).*$","g")
              , t = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[a-zA-Z])(?=.*[0-9]))|((?=.*\\W)(?=.*[a-zA-Z]))|((?=.*\\W)(?=.*[0-9]))).*$","g")
              , n = new RegExp("^(?=.{2,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[a-zA-Z])(?=.*[0-9]))|((?=.*\\W)(?=.*[a-zA-Z]))|((?=.*\\W)(?=.*[0-9]))).*$","g")
              , r = $(this).val();
            htmlElement.$ipt_password_check.val() != "" && htmlElement.$ipt_password_check.val() != r ? htmlElement.$account_error_text.show() : htmlElement.$account_error_text.hide(),
            htmlElement.step3Disabled(),
            r == "" ? (htmlElement.$passwordErrorText.hide(),
            htmlElement.$safe_revise_box.hide(),
            passwordCheck.lengthCheck = !1) : htmlElement.$ipt_password_check.val() != "" && htmlElement.$btn_step3.addClass("step-btn"),
            htmlElement.$safe_revise_box.show(),
            r.length >= 6 ? (htmlElement.$safe_txt1.addClass("icon-safe-right"),
            htmlElement.$safe_txt1.removeClass("icon-safe-erro"),
            passwordCheck.lengthCheck = !0) : (htmlElement.$safe_txt1.removeClass("icon-safe-right"),
            htmlElement.$safe_txt1.addClass("icon-safe-erro"),
            passwordCheck.lengthCheck = !1,
            passwordCheck.passwordLevel = 1,
            htmlElement.$span_safe_txt.text("低"),
            htmlElement.$span_safe_txt.css("color", "#ff4646"),
            htmlElement.$safe_bar_post.css("width", "33%"),
            htmlElement.$safe_bar_post.css("background", "#ff4646")),
            r.indexOf(" ") == -1 ? (htmlElement.$safe_txt3.addClass("icon-safe-right"),
            htmlElement.$safe_txt3.removeClass("icon-safe-erro"),
            passwordCheck.blankCheck = !0) : (htmlElement.$safe_txt3.removeClass("icon-safe-right"),
            htmlElement.$safe_txt3.addClass("icon-safe-erro"),
            passwordCheck.lengthCheck = !1),
            n.test(r) ? (htmlElement.$safe_txt2.addClass("icon-safe-right"),
            htmlElement.$safe_txt2.removeClass("icon-safe-erro"),
            passwordCheck.characterCheck = !0) : (htmlElement.$safe_txt2.removeClass("icon-safe-right"),
            htmlElement.$safe_txt2.addClass("icon-safe-erro"),
            passwordCheck.characterCheck = !1),
            t.test(r) ? (passwordCheck.passwordLevel = 2,
            htmlElement.$safe_bar_post.css("width", "66%"),
            htmlElement.$safe_bar_post.css("background", "#ff6600"),
            htmlElement.$span_safe_txt.text("中"),
            htmlElement.$span_safe_txt.css("color", "#ff6600")) : (passwordCheck.passwordLevel = 1,
            htmlElement.$safe_bar_post.css("width", "33%"),
            htmlElement.$safe_bar_post.css("background", "#ff4646"),
            htmlElement.$span_safe_txt.text("低"),
            htmlElement.$span_safe_txt.css("color", "#ff4646")),
            e.test(r) && (passwordCheck.passwordLevel = 3,
            htmlElement.$safe_bar_post.css("width", "100%"),
            htmlElement.$safe_bar_post.css("background", "#33bb66"),
            htmlElement.$span_safe_txt.text("高"),
            htmlElement.$span_safe_txt.css("color", "#33bb66"))
        }),
        htmlElement.$ipt_password_set.on("blur", function() {
            htmlElement.$safe_revise_box.hide();
            if ($(this).val() == "") {
                passwordCheck.lengthCheck = !1,
                htmlElement.$passwordErrorText.hide();
                return
            }
            passwordCheck.blankCheck && passwordCheck.characterCheck && passwordCheck.lengthCheck ? (htmlElement.$passwordErrorText.hide(),
            htmlElement.$ipt_password_set.val() == htmlElement.$ipt_password_check.val() && (htmlElement.$account_error_text.hide(),
            htmlElement.step3AllowClick())) : htmlElement.$passwordErrorText.show()
        }),
        htmlElement.$ipt_password_set.on("focus", function() {
            htmlElement.$safe_revise_box.show()
        }),
        htmlElement.$ipt_password_check.on("keyup", function() {
            htmlElement.step3Disabled(),
            $(this).val() != "" && htmlElement.$ipt_password_set.val() != "" && htmlElement.$btn_step3.addClass("step-btn"),
            $(this).val() != htmlElement.$ipt_password_set.val() ? $(this).val().length >= htmlElement.$ipt_password_set.val().length && htmlElement.$account_error_text.show() : passwordCheck.blankCheck && passwordCheck.characterCheck && passwordCheck.lengthCheck && (htmlElement.$account_error_text.hide(),
            htmlElement.step3AllowClick())
        }),
        htmlElement.$ipt_password_check.on("blur", function() {
            $(this).val() != htmlElement.$ipt_password_set.val() && $(this).val() != "" && htmlElement.$account_error_text.show()
        }),
        htmlElement.$form_reset_password.on("click", ".btn-red-step3", function() {
            var e = htmlElement.$ipt_password_set.val()
              , t = faultylabs.MD5(e);
            htmlElement.$ipt_password.val(t),
            htmlElement.$ipt_password_level.val(passwordCheck.passwordLevel),
            htmlElement.$form_reset_password.submit()
        }),
        htmlElement.$div_input_group.on("click", function() {
            $(this).find("input:text").focus()
        }),
        htmlElement.$div_input_group_recise.on("click", function() {
            $(this).find("input:password").focus()
        })
    },
    createUI: function() {
        htmlElement.$slider_box.size() > 0 ? recovery.createAliUI() : htmlElement.$btn_send_code.size() > 0 && recovery.createSendSMSUI()
    },
    createAliUI: function() {
        var e = new noCaptcha
          , t = new Date
          , n = t.getMilliseconds();
        e.init({
            renderTo: "sliderBox",
            appkey: basicInfo.aliKey,
            token: n,
            callback: function(e) {
                htmlElement.$csessionid.val(e.csessionid),
                htmlElement.$sig.val(e.sig),
                htmlElement.$token.val(n),
                recovery.aliCheck = !0,
                recovery.validateAccountNumber(htmlElement.$account_number.val()) && htmlElement.step1AllowClick(),
                htmlElement.$account_number.val() != "" ? htmlElement.$btn_step1.addClass("step-btn") : htmlElement.$btn_step1.removeClass("step-btn")
            }
        })
    },
    createSendSMSUI: function() {
        recovery.timeKeeping(59)
    },
    validateAccountNumber: function(e) {
        var t = /^1\d{10}$/
          , n = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        return t.test(e) || n.test(e)
    },
    timeKeeping: function(e) {
        recovery.int = window.setInterval(function() {
            e > 0 ? (htmlElement.$btn_send_code.html(e + "s"),
            e--) : (htmlElement.$btn_send_code.html("重新获取"),
            htmlElement.$account_error_text.hide(),
            htmlElement.sendSMSAllowClick(),
            window.clearInterval(recovery.int))
        }, 1e3)
    }
};
