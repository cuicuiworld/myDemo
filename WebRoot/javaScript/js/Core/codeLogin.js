$(function(){
    var getwxcodestatus = 0,
    	utimes = 0,
    	wx_url = '/run.html';

    //获取二维码
    function auToer(){
        $.ajax({
            url: wx_url,
            type: "POST",
            data: 'action=createQrcode',
            dataType: 'json',
            success: function (json){                    
                if(json['code'] == 10200){
                    $('#login_container').html( '<img class="ewm" src="'+json['url']+'"/>' );
                    getwxstatus(json['data']);
                }
            }
        });
    }
    auToer();

    //获取二维码状态
    function getwxstatus(data){
        $.ajax({
            url: wx_url,
            type: "POST",
            data: 'action=getwxstatus&wxcjid='+data,
            dataType: 'json',
            timeout:15000,
            success: function (json){       
                if(json.code == 10200){
                    getloginstatus(data);
                    $('.wl_font').hide();
                    $('.login_success').show(); 
                }else{
                    getwxcodestatus = getwxcodestatus + 1;
                    if(getwxcodestatus > 12){
                        $('.wl_font').hide();
                        $('.login_error').show(); 
                    }else{
                        getwxstatus(data);   
                    }
                }
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){      
                getwxcodestatus = getwxcodestatus + 1;
                if(getwxcodestatus > 12){
                    $('.wl_font').hide();
                    $('.login_error').show(); 
                }else{
                    getwxstatus(data);   
                }   
            }
        });  
    }

    //获取用户信息
    function getloginstatus(wxcjid){
        $.ajax({
            url: wx_url,
            type: "POST",
            data: 'action=getwxLoginSta&wxcjid='+wxcjid,
            dataType: 'json',
            timeout:15000,
            success: function (json) {       
                if(json.code == 10200){
                    window.location.href= '/wxlogin.html';
                }else{
                    if(utimes > 7){
                        $('.wl_font').hide();
                        $('.login_success').hide(); 
                        $('.login_error').show();
                    }else{
                        utimes = utimes + 1;
                        getloginstatus(wxcjid);
                    }
                }
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){      
                if(utimes > 7){
                    $('.wl_font').hide();
                    $('.login_success').hide(); 
                    $('.login_error').show();
                }else{
                    utimes = utimes + 1;
                    getloginstatus(wxcjid);
                }  
            }
        }); 
    }

    $(".close").click(function(){
        $(".alertbg").hide();
        $(".alert").hide();      
    })

    $('.grey').click(function(){
        $('.chongzhimm').css('display','none')
    })
    $(".showTab a").click(function(){
        var _this = $(this);
        Tab( _this,".showBox" );
    });


    /*Tab栏切换 */
    function Tab( obj,show ){    // obj为点击对象   show为显示对象
        var num = obj.index();
        obj.addClass("current").siblings().removeClass("current");
        $(show).eq(num).addClass("show").siblings().removeClass("show");
    }


    $("#captcha").click(function () {
        $(this).attr("src", "/Login/captcha?rank=" + Date.parse(new Date) / 1000)
    });

    $.formValidator.initConfig({
        formid: "myform",
        onerror: function (msg) {
        },
        onsuccess:function (){
            var zhanghao=$('#zhanghao').val();
            var password = $('#password').val();
            var code=$('#code').val();

            $.post("/Login/login", {zhanghao: zhanghao, password: password, code: code},
            function (data) {
                if(data == 'yz_code_error'){
                    alert('验证码错误！');
                    return false;
                }else if(data == 'userpass_error'){
                    alert('账号或密码错误!');
                    $('#captcha').trigger("click");
                    return false;
                }else{
                    window.location.href = '/index.html';
                }
            });
            return false;
        }
        
    });
    $("#zhanghao").formValidator({tipid: "zhanghao_error", onshow: " ", onfocus: "请输入手机号或者用户名"}).inputValidator({min:1, max: 20, onerror: "请输入手机号或者用户名"});
    $("#password").formValidator({tipid: "password_error", onshow: " ", onfocus: "请输入密码"}).inputValidator({min: 6, max: 20, onerror: "密码格式不对"});

    var code=$('#code').val();
    $("#code").formValidator({tipid: "yzcode_error", onshow: " ", onfocus: "请输入验证码"})
    .ajaxValidator({
        type: "GET",
        url: "/Login/checkyzm?code=" + code,
        async:false,
        success: function (data) {
            if ($.trim(data) == 'success') {
                return true;
            } else {
                return false;
            }
        },
        onerror: '验证码不正确！',
        onwait: "正在对验证码进行校验..."
    });
})