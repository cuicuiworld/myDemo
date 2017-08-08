
/*******************************************************************************************************
 * 小技巧，提高js效率
 * 
 * 三元表达式
 * var a === b ? c : b;
 * 
 * 短路求值(判断某个值不为空，null，undefined)
 * var a = b || '';
 * 
 * *****************************************************************************************************
 */


/**
 * 设置全局参数
 */
var _global_settings = {
		id: Math.random(),
		js_path: '/js',
		html_path: '/page',
		service: {
			url: ''
		},
		owner: {
			username: '',
			name: '',
			id: '',
			userid :'',
			employeeCode: '',
			companyName: '',
			roleName : '',
			roleNameCN : ''
		}
}


/**
 * BrowserInfo 终端器信息
 */
var BrowserInfo = {
	userAgent : navigator.userAgent.toLowerCase(),
	isAndroid : Boolean(navigator.userAgent.match(/android/ig)),
	isIphone : Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
	isIpad : Boolean(navigator.userAgent.match(/ipad/ig)),
	isWeixin : Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
}

/**
 * 通过ua判断是不是m站
 */
function isMweb() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag;
}

/**
 * 
 * @param str
 * @returns {Number}
 */
function strLength(str) {
	var a = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 255)
			a += 2;// 按照预期计数增加2
		else
			a++;
	}
	return a;
}

/**
 * addEvent 绑定任何事件
 * 
 * @param el
 *            页面元素
 * @param type
 *            事件类型
 * @param fn
 *            回调函数
 */
function addEvent(el, type, fn) {
	if (el.addEventListener) {
		el.addEventListener(type, function(event) {
			/**
			 * addEventListener绑定事件,return false
			 * 阻止默认事件不起作用,借助event.preventDefault(); event.cancelBubble =
			 * true;阻止冒泡
			 */
			if (false == fn.call(el)) {
				event.cancelBubble = true;
				event.preventDefault();
				return false;
			}
		}, false);
	} else {
		el.attachEvent('on' + type, function() {
			if (false == fn.call(el)) {
				event.cancelBubble = true;
				return false;
			}
		});
	}
}

/**
 * getUrlParam 获取url问号后面的参数
 * 
 * @param name
 *            参数名 key
 * @returns value
 */
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

/**
 * 下载app
 */
function downApp() {
	var u = navigator.userAgent, isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
		isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
		urls = {
			'android' : 'http://ftp-apk.pcauto.com.cn/pub/autoclub-5000-autowapDL1.apk',
			'ios' : 'https://itunes.apple.com/cn/app/zhong-guo-che-you-hui/id640447959',
			'other' : 'http://www1.pcauto.com.cn/app/20141120/pcautoapp/index.html'
		};
	
	window.location.href = isAndroid ? urls.android : isiOS ? urls.ios : urls.other;
}


/**
 * 判断是否是 IE 浏览器
 */
if (document.all) {
	//alert('IE浏览器');
} else {
	//alert('非IE浏览器');
}
if (!!window.ActiveXObject) {
	//alert('IE浏览器');
} else {
	//alert('非IE浏览器');
}
// 判断是IE几
var isIE = !!window.ActiveXObject;
var isIE6 = isIE && !window.XMLHttpRequest;
var isIE8 = isIE && !!document.documentMode;
var isIE7 = isIE && !isIE6 && !isIE8;
if (isIE) {
	if (isIE6) {
		alert('ie6');
	} else if (isIE8) {
		alert('ie8');
	} else if (isIE7) {
		alert('ie7');
	}
}

/**
 * 回车事件
 */
$("id").onkeypress = function (event) {
    event = (event) ? event : ((window.event) ? window.event : "")
    keyCode = event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode);
    if (keyCode == 13) {
        $("id").onclick();
    }
} 

/**
 * ArrayOf
 * 将多个字符串转化成数组
 * @returns
 */
function ArrayOf(){
	//[].slice.call(obj); {} => []
	return [].slice.call(arguments);
}

//去左空格; 
function ltrim(s){ 
    return s.replace( /^\s*/, ""); 
} 
//去右空格; 
function rtrim(s){ 
    return s.replace( /\s*$/, ""); 
} 
//去左右空格; 
function trim(s){ 
    return rtrim(ltrim(s)); 
}	
//去所有的空格; 
function trimAll(s){ 
    return rtrim(ltrim(s)); 
}

//禁止copy
function noCopy(){	   
   document.selection.empty();
   alert('禁止copy!');
}		

//禁止cut
function noCut(){	   
   document.selection.empty();
   alert('禁止cut!');
}

//检查textarea的长度。
/**
 * Obj 文本框
 * len 长度
 * 
 */
function chkLen(Obj,len,T)
{
    if (typeof(T) == "undefined"){T='';}
	var desc=T+"长度不能超过"+len+"!";
    if (typeof(Obj) == "undefined") 
	{
       alert("目标不存在。");
       return true;
    }
    var str=Obj.value;
    if (str==''){return true;}

    if(str.length<len){
        return true;
    }else{
       alert(desc);
	   return false;
	}
}

//使组件可见
function visible(){
   for (var i=0;i<arguments.length;i++){
     var ob = document.getElementById(arguments[i]);
     ob.style.display='inline';
     //document.getElementById(arguments[i]).disabled=false;
     var oChild=ob.childNodes;
     for (var j=0;j<oChild.length;j++){
	      if (oChild[j].nodeType == 1 && oChild[j].type=='input')
     	  oChild[j].disabled=false;
     }	     
   }
}

//使组件不可见
function invisible(){
   for (var i=0;i<arguments.length;i++){
     var ob = document.getElementById(arguments[i]);
     ob.style.display='none';
     //document.getElementById(arguments[i]).disabled=true;
     //不可用
     var oChild=ob.childNodes;
     for (var j=0;j<oChild.length;j++){
	      if (oChild[j].nodeType == 1 && oChild[j].type=='input')
     	  oChild[j].disabled=true;
     }
   }	
}

//随机码
function rnd(){
	var random = Math.floor(Math.random() * 10001);
  	var id = (new Date().getTime()*random).toString();
  	id = id.split('').reverse().join('');
  	return '&'+random+'random'+random+'id='+id;
  	// &4630random4630id=0626299186003196
}

/**
 * Dight 数字
 * how 位数
 */
function ForDight(Dight,How)
{
	Dight = Math.round (Dight*Math.pow(10,How))/Math.pow(10,How);
	return Dight;
} 

//打开窗口。full：是否隐藏工具栏
function openWindow(URL,W,H,full){

   	var	top =Math.floor((screen.availHeight-H)/2);
   	var	left =Math.floor((screen.availWidth-W)/2);
    if (typeof(full) == "undefined"||full==true){	
       window.open(URL, '', 'height='+H+', width='+W+', top='+top+', left='+left+', toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=no', false);
    }else{
       window.open(URL, '', 'height='+H+', width='+W+', top='+top+', left='+left+', toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes,location=no, status=no', false);	    
    }
}

//获取radio的值
function getRadioValue(radioName,pid){
   //$("div#divPosType input[@name=chkJobType][@checked]").each(function(){
   var ob;
   if (pid) {
      ob = $('#'+pid+' input[name='+radioName+']:checked');
   }else{
      ob = $('input[name='+radioName+']:checked');
   }
   if (ob.val()){
       return ob.val();
   }else{
       //alert('请选择一条记录！');
       return false;
   }
}

//获取checkbox的值,返回以豆号分隔的形式1,2,3
function getCheckboxValue(chkName){
   //$("div#divPosType input[@name=chkJobType][@checked]").each(function(){
   //var ob = $('input[@type=checkbox][@name='+chkName+'][@checked]');
   var ob = $('input[name='+chkName+']:checked');
   var rs='';
   ob.each(function(){
         if (rs!='') {rs+=',';}
         rs+=this.value;
   });
   return rs;
}

//获取checkbox选中的数目
function getCheckCount(chkName){
   //$("div#divPosType input[@name=chkJobType][@checked]").each(function(){
   return $('input[@type=checkbox][@name='+chkName+'][@checked]').length;
}

/**
 * 控件enter事件
 * 
 * @param parentId
 * 				父级id或class
 * @param submitId
 * 				提交按钮id或class
 */
function enterSubmit(parentId,submitId){
	$(parentId).keydown(function(e){
		if(e.keyCode==13){
			$(submitId).click();
		}
	});
}

/**
 * 获取当前时间
 * 
 * 根据需求传参数确定是否精确到秒
 * 
 * @param bool
 * 			传true，时间精确到分秒
 * 			不传时间到具体天数
 * @returns {String}
 * 			返回当前时间
 */
function getNowFormatDate(bool) {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    
    if(bool == true){
    	var	strMinutes = date.getMinutes(),
    		strSecond = date.getSeconds();
    }
    
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    if(bool == true){
    	currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + strMinutes
        + seperator2 + strSecond;
    }
    return currentdate;
}

/**
 * 依据当前月份，获取改变的时间
 * 
 * @param date
 * 			当前时间，格式为yyyy-mm-dd
 * @param num
 * 			改变的时长，可为正负整数
 * @returns {String}
 * 			改变之后的时间
 */
function getChangeDate(date,num) {  
    var arr = date.split('-');  
    var year = arr[0]; 	//获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; 	//获取当前日期的日  
    var days = new Date(year, month, 0);  
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;  
    var month2 = parseInt(month) + Number(num);  
    
    if (month2 > 12) {  
        year2 = parseInt(year2) + 1;  
        month2 = Number(month2 - 12);  	
    }
    
    if(month2 < 0 ){
    	year2 = parseInt(year2) - 1;
    	month2 = 12 + month2;
    }
    var day2 = day;  
    var days2 = new Date(year2, month2, 0);  
    days2 = days2.getDate();  
    
    if (day2 > days2) {  
        day2 = days2;  
    }  
    
    if (month2 < 10) {  
        month2 = '0' + month2;  
    }  
  
    var t2 = year2 + '-' + month2 + '-' + day2;  
    return t2;  
} 

/**
 * getFixedNumber
 * 
 * 保留几位小数封装
 * 
 * @param num
 * 			输入数字
 * @param n
 * 			要保留几位小数
 * @returns {Number}
 * 			返回保留几位小数之后的数字
 */
function getFixedNumber(num, n) {
	return num.toFixed(n);
}

window.prefixURL;

/**
 * getRandomColor
 * 
 * 随机获取颜色
 * 
 * 两种方式
 */
function getRandomColor() {
	return '#'+(function(h){
		return new Array(7-h.length).join("0")+h
	})((Math.random()*0x1000000<<0).toString(16))
}

function randomColor(opacity){
    var opacity = opacity || 1;
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return "rgba("+r+','+g+','+b+','+opacity+")";
}

/**
 * removeByValue
 * 
 * 删除数组指定元素
 * 
 * @param arr
 * 			要操作的数组
 * @param val
 * 			要删除的元素
 */
function removeByValue(arr, val) {
	for(var i = 0; i<arr.length; i++){
		if(arr[i] == val){
			arr.splice(i, 1);
			break;
		}
	}
}

/**
 * downloadFile
 * 
 * @param filename
 * 			保存的文件名
 * @param content
 * 			保存的文件内容
 */
function downloadFile(filename, content) {
    var blob = new Blob([content], {type: 'text/plain'});
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');

    a.style = "display: none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 5);
}

/**
 * formatTime
 * 
 * 格式化的时间格式
 * 
 * @param time
 * 			当前时间
 * @param time
 * 			要格式化的时间格式
 * @returns {String}
 * 
 * 调用方式----应用到各个场景
 * format(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss');
 * format(new Date().getTime(), 'yyyy年MM月dd日 HH时mm分ss秒');
 * format(new Date().getTime(), 'MM-dd');
 * format(new Date().getTime(), 'HH:mm:ss');
 * format(new Date().getTime(), 'yyyy-MM-dd);
 */
function formatTime(time, time) {
    var t = new Date(time);//time.replace(/-/g, "/")
    var tf = function(i){
    	return (i < 10 ? '0' : '') + i;
    }
    
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
	            return tf(t.getFullYear());
	            break;
            case 'MM':
	            return tf(t.getMonth() + 1);
	            break;
            case 'mm':
	            return tf(t.getMinutes());
	            break;
            case 'dd':
	            return tf(t.getDate());
	            break;
            case 'HH':
	            return tf(t.getHours());
	            break;
            case 'ss':
	            return tf(t.getSeconds());
	            break;
        }
    });
}

/**
 * 自定义alert窗口
 * 
 * @param {String}
 *            settings.width 		窗口宽度
 * @param {String}
 *            settings.height 		窗口高度
 * @param {String}
 *            settings.title 		窗口标题
 * @param {String}
 *            settings.message 		显示信息
 * @param {String}
 *            settings.okBtn 		确定按钮名称
 * @param {String}
 *            settings.closeBtn 	关闭按钮
 * @param {String}
 *            settings.type 		提示类型(info, warning, error)
 * @param {Function}
 *            settings.callback 	确定按钮回调函数
 * @param {Function}
 *            settings.hide 		确认后窗口关闭
 */

var Core = {};

Core.alert = function(settings) {
	var width = settings.width === undefined ? 550 : settings.width,
		height = settings.height === undefined ? 300 : settings.height,
		title = settings.title === undefined ? '提示信息' : settings.title,
		message = settings.message === undefined ? '操作成功！' : settings.message,
		okBtn = settings.okBtn === undefined ? '确认' : settings.okBtn,
		closeBtn = settings.closeBtn === undefined ? '' : settings.closeBtn,
		callback = settings.callback === undefined ? function(){} : settings.callback,
		colseCallback = settings.colseCallback === undefined ? function(){} : settings.colseCallback,
		type = settings.type === undefined ? 'info' : settings.type,
		hide = settings.hide === undefined ? true : settings.hide;
	
	this.init = function() {
		this.initModal();
		this.initDomStyle();
		this.initHideAlertTime();
		this.bindAlertEvent();
	}
	this.initModal = function() {
		var html = $('<div id="alertWindow">'
				+ '<div id="alertWindowHeader">'
				+ '<span id="captureContainer">'+title+'</span>'
				+ '<span id="alertCloseBtn">×</span>'
				+ '</div>'
				+ '<div id="alertWindowContent"><p style="line-height: 100px;">'+message+'</p></div>'
				+ '<div id="alertWindowFooter" style="border-top: solid 1px #eef0f1;">'
				+ '<div id="alertWindowGroup" style="float:right;">'
				+ '<a id="alertWindowOkBtn" >'+okBtn+'</a>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '<div id="alertLayer"></div>');
		html.appendTo($("body"));
	}
	this.initDomStyle = function() {
		$('#alertWindow').css({
		    position: 'fixed',
		    left: '50%',
		    top: '50%',
		    'background-color': '#ffffff',
		    'z-index': '2147000001',
		    width: settings.width +'px',
		    height: settings.height+'px',
		    'margin-left': '-285px',
		    'margin-top': '-150px',
		    'border-radius': '5px',
		    'font-weight': 'bold',
		    color: '#535e66'
		});
		
		$('#alertCloseBtn').css({
			cursor: 'pointer',
		    width: '12px',
		    height: '12px',
		    float: 'right',
		    'text-align': 'center',
			'font-size': '30px',
			color: 'rgb(0, 149, 217)'
		})
		
		$('#alertLayer').css({
		    position: 'fixed',
		    top: 0,
		    left: 0,
		    width: '100%',
		    height: '100%',
		    'background-color': '#666666',
		    opacity: '0.5',
		    'z-index': '2147000000',
		    border: 'solid 1px #333'
		});
		
		$('#alertWindowHeader').css({
		    height: '30px',
		    'line-height': '30px',
		    padding: '14px 30px',
		    'border-bottom': 'solid 1px #eef0f1'
		})
		
		$('#captureContainer').css({
			'font-size': '18px',
		    display: 'block',
		    float: 'left',
		    height: '30px',
		    position: 'relative'
		});
		
		$('#alertWindowContent').css({
		    height: '100px',
		    overflow: 'hidden',
		    'text-align':'center',
		    padding: '40px 0'
		});
		
		$('#alertWindowOkBtn').css({
		    display: 'block',
		    cursor: 'pointer',
		    float: 'left',
		    width: '95px',
		    height: '35px',
		    'line-height': '35px',
		    'text-align': 'center',
		    color: '#FFFFFF',
		    'border-radius': '5px',
		    'background-color': '#0095d9',
		    color: '#FFFFFF',
		    margin:'14px 14px 0 0'
		});
	}
	
	this.initHideAlertTime = function() {
		var _hideAlert;
		if(hide){
			_hideAlert = setTimeout(function(){
				if($('#alertWindowOkBtn')) $('#alertWindowOkBtn').trigger('click');
			},5000);
		}
		if(settings.hide){
			_hideAlert = setTimeout(function(){
				if($('#alertWindowOkBtn')) $('#alertWindowOkBtn').trigger('click');
			},settings.hide);
		}
	}
	this.bindAlertEvent = function() {
		$('#alertCloseBtn').off('click').on('click',function(){
			$('#alertWindow').css('display','none');
			$('#alertLayer').css('display','none');
			
			if (typeof colseCallback=='function') {
				colseCallback();
			}
		});
		
		$('#alertWindowOkBtn').off('click').on('click',function(){
			$('#alertWindow').css('display','none');
			$('#alertLayer').css('display','none');
			
			if (typeof callback=='function') {
				callback();	
			}
		})
	}
	this.init();
}

Core.alert({
	message:'操作成功',
	callback:function(){
		console.log('成功回调函数')
	},
	colseCallback:function(){
		console.log('关闭回调函数')
	},
	hide:'5000'
});


Core.AjaxRequest = function(settings) {
	
}

Core.console = function(settings) {
	var text = (settings.text === undefined || settings.text === null || settings.text === '') ? 'this is console!' : settings.text;
	var isOneLine = (settings.isOneline === undefined || settings.isOneline === null || settings.isOneline === '') ? 'one' : settings.text;
	var author = (settings.author === undefined || settings.author === null || settings.author === '') ? '                           by cuicuiworld' : settings.text;

	if(isOneLine === 'one'){
		console.log('%c'+text+' '+author+'', "background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjAuNSIgeDI9IjEuMCIgeTI9IjAuNSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY2Y2NjYyIvPjxzdG9wIG9mZnNldD0iMjAlIiBzdG9wLWNvbG9yPSIjMzM5OTk5Ii8+PHN0b3Agb2Zmc2V0PSI0MCUiIHN0b3AtY29sb3I9IiNjY2NjOTkiLz48c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iIzk5Y2NmZiIvPjxzdG9wIG9mZnNldD0iODAlIiBzdG9wLWNvbG9yPSIjY2NjY2ZmIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmY5OWNjIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');background-size: 100%;background-image: -webkit-gradient(linear, 0% 50%, 100% 50%, color-stop(0%, #66cccc), color-stop(20%, #339999), color-stop(40%, #cccc99), color-stop(60%, #99ccff), color-stop(80%, #ccccff), color-stop(100%, #ff99cc));background-image: -moz-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: -webkit-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: linear-gradient(to right, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);padding:20px 40px;color:#fff;font-size:12px;");
		console.log('');
	}else if(isOneLine === 'more'){
		console.log('%c'+text+' '+author+'', "background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjAuNSIgeDI9IjEuMCIgeTI9IjAuNSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY2Y2NjYyIvPjxzdG9wIG9mZnNldD0iMjAlIiBzdG9wLWNvbG9yPSIjMzM5OTk5Ii8+PHN0b3Agb2Zmc2V0PSI0MCUiIHN0b3AtY29sb3I9IiNjY2NjOTkiLz48c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iIzk5Y2NmZiIvPjxzdG9wIG9mZnNldD0iODAlIiBzdG9wLWNvbG9yPSIjY2NjY2ZmIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmY5OWNjIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');background-size: 100%;background-image: -webkit-gradient(linear, 0% 50%, 100% 50%, color-stop(0%, #66cccc), color-stop(20%, #339999), color-stop(40%, #cccc99), color-stop(60%, #99ccff), color-stop(80%, #ccccff), color-stop(100%, #ff99cc));background-image: -moz-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: -webkit-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: linear-gradient(to right, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);padding:0;color:#fff;font-size:12px;");
		console.log('');
	}
}

//网页性能测试
Core.testConsole = function(){
	var t = performance.timing;
	var pageLoadTime = t.loadEventStart - t.navigationStart;
	var dnsTime = t.domainLookupEnd - t.domainLookupStart;
	var tcpTime = t.connectEnd - t.connectStart;
	var ttfbTime = t.responseStart - t.navigationStart;
/*	Core.console({
		text: '\n测试网站性能(毫秒:ms)\n\n\n页面加载的耗时:'+pageLoadTime  +
		'\n\n\n域名解析的耗时:'+ dnsTime  +'\n\n\nTCP连接的耗时:'+tcpTime  +
		'\n\n\n读取页面第一个字节之前的耗时:'+ttfbTime,
		isOneLine:'more'
	})*/
	
	console.log('测试网站性能(毫秒:ms)\n\n页面加载的耗时:'+pageLoadTime+
            '\n域名解析的耗时:'+ dnsTime +'\nTCP连接的耗时:'+tcpTime+
            '\n读取页面第一个字节之前的耗时:'+ttfbTime);
};

//点击触发背景色
Core.changeBgColor = function(settings) {
	var ele = (settings.ele === undefined || settings.ele === '' || settings.ele === null) ? 'body' : settings.ele;
	var beforeTouchColor = settings.beforeTouchColor || '#fff';
	var afterTouchColor = settings.afterTouchColor || '#eee';
	
	$(ele).on('touchstart mousedown', function (e) {
        var $this = $(this);
        e.stopPropagation();
        $this.css({background: afterTouchColor,'-webkit-transition':'background 0.3s ease','-moz-transition':'background 0.3s ease',transition:'background 0.3s ease'});
    }).on('touchend mouseup', function (e) {
        var $this = $(this);
        e.stopPropagation();
        $this.css({background: beforeTouchColor,'-webkit-transition':'background 0.3s ease','-moz-transition':'background 0.3s ease',transition:'background 0.3s ease'});
    });
}


//版本号
var version_js='2017-04-25_v1';

var version_html='2017-04-25_v1';

//异步加载html
$.loadModal = function(html_url,callback){			
	$('<div></div>').load( html_url+'?v='+version_html, function(res) {
		callback(res);
	});
};

//异步加载js
$.loadScript = function(js_url, callback){
	callback === undefined ? function(res){} : callback;
	var flag = false,
		js_array = [];
	$.each(js_array, function(i, v) {
		console.log(v);
		if(v === js_url){
			flag = true;
			console.log(v);
		}else{
			console.log(v);
		}
	})
	if(!flag){
		$.getScript(js_url, function(){
			callback();
		})
	}else{
		callback();
	}
	return false;
}

//监测登录超时。
//退出登录事件
//退出登录
function logout(){
	window.onbeforeunload = function(event){   
	}		
	$.post('logout',function(res){
		$('body').html('').css('background-color', '#EAEBEC');
		$(res).appendTo($('body'));
	});
}

//阻止冒泡
function stopDouble(e) {
    if (e && e.stopPropagation) {
        e.stopPropagation();
    } else {
        window.event.cancelBubble = true;
    }
}

//阻止默认事件
function stopDefault(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.cancelable = false;
    }
}

function formatNumber(num) {
	var num = parseInt(num).toString();
    var len = num.length;
    if (len <= 3) {
            return num;
    }
	var r = len % 3;
	r > 0 ? num.slice(0, r) + "," + num.slice(r, len).match(/\d{3}/g).join(",") : num.slice(r, len).match(/\d{3}/g).join(",");
}

var loadJS = function(url) {
	var script = document.createElement('script');
		script.type = "text/javascript";
		script.async = 'true';
		script.src = url;
	var s = document.getElementByTagName('script')[0];
		s.parentNode.insertBefore(script, s);
	
	//头部js插入
	//var h = document.getElementsByTagName('head')[0];
	//h.append(script)
}

//加载css
var loadCss = function (url, domid) {
    var css = document.createElement('link');
	    css.setAttribute('rel', 'stylesheet');
	    css.setAttribute('type', 'text/css');
	    css.setAttribute('href', url);
    var obj = document.getElementById(domid);
    if (!!obj) {
        obj.appendChild(css);
    }
}

//全局加载css
function LoadStyle(url) {
    try {
        document.createStyleSheet(url)
    } catch(e) {
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(cssLink)
    }
}


//另一种方式插入文本
var crId = document.getElementById('copyright');
if (crId != undefined) {
    var currdate = new Date();
    crId.insertAdjacentHTML("afterend", "1999-" + currdate.getFullYear());
}

//动态考虑兼容性
var ua = navigator.userAgent.toLowerCase();
if ((ua.indexOf("msie 7") > -1 || ua.indexOf("msie 8") > -1) && screen.width <= 1200) {
	//这里写兼容ie78的css或js或其他业务需要。
}

//将addclass封装
var addClass = function(id, className) {
	var el =  document.getElementById(id);
	if(el.className === ''){
		el.className = className;
	}else{
		el.className += ' '+ className;
	}
}

/*-----------------------------------------------------------------------
 * decodeURIComponent
 * 该函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
 * 
 * escape
 * 对字符串进行编码，使得所有计算机可以读取到这字符串
 * 
 */

//前端对密码强度验证
function checkStrong(sPW) {
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {
        //测试每一个字符的类别并统计一共有多少种模式
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}
function CharMode(iN) {
    if (iN >= 48 && iN <= 57) return 1; 	//数字		弱
    if (iN >= 65 && iN <= 90) return 2; 	//大写字母		中
    if (iN >= 97 && iN <= 122) return 4; 	//小写		强
    else return 8; 							//特殊字符
}
function bitTotal(num) {
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}

var CheckInput = {
    checkStrong: function (sPW) {
        Modes = 0;
        for (i = 0; i < sPW.length; i++) {
            //测试每一个字符的类别并统计一共有多少种模式
            Modes |= CheckInput.CharMode(sPW.charCodeAt(i));
        }
        return CheckInput.bitTotal(Modes);
    },
    CharMode: function (iN) {
        if (iN >= 48 && iN <= 57) return 1; 		//数字		弱
        if (iN >= 65 && iN <= 90) return 2; 		//大写字母		中
        if (iN >= 97 && iN <= 122) return 4; 		//小写		强
        else return 8; 								//特殊字符
    },
    bitTotal: function (num) {
        modes = 0;
        for (i = 0; i < 4; i++) {
            if (num & 1) modes++;
            num >>>= 1;
        }
        return modes;
    }
}

/*----------------------------运算符---------------------------------------
 * a != b  ----->  a = a | b  , a 或者 b 只要有一个为 1, 那么，a 的最终结果就为 1  
 * a &= b  ----->  a = a & b  , a 和 b 二者必须都为 1, 那么，a 的最终结果才为 1  
 * a ^= b  ----->  a = a ^ b  , 当且仅当 a 和 b 的值不一致时，a 的最终结果才为1，否则为0
 * a |= b  ----->  a = a | b  , 按位“或”赋值运算符 (|=)，并把结果返回左边的数,一般用于二进制
 * a >>>= b ---->  a = a >>> b, 无符号右移赋值操作,对变量值根据表达式值所规定的位数进行无符号右移，并将结果赋给该变量。
 * 
 * charCodeAt()	返回指定位置的字符的 Unicode 编码
 * 
 * ---------------------------------------------------------------------------
 */

//显示错误信息时。可以用于验证时出现错误信息。
var errorShow = function(obj, isShow, message) {
	if(isShow){
		//obj.parentElement.className = 'span_err';
		//obj.message = message;
	}else{
		//进行相应的业务逻辑处理
	}
}

/*------------------------------errorMessage----------------------------------------
 *	 一般注册手机号有一下几种错误
 * 		系统错误,请稍后再试
 * 		请输入手机号码。
 *		 请输入正确的手机号码。
 * 		该手机号码与上一次输入的手机号码重复，请更换其他手机号码。
 * 		该手机号码已于其他账号绑定，请更换其他手机号码。
 * 		您的操作过于频繁，请24小时后再试。
 * 		结合上面的额errorShow函数，显示在页面
 * 
 * 	
 * 
 * ---------------------------------------------------------------------------------
 */

var errorMsg = {
		sysError : {},
		emptyPhone : {},
		validPhone : {},
		existPhone : {},
		frequently : {},
}

/*---------------------------------------------------------------------------------
 * 通过缓存获取语言，并依次判断是否是大陆手机号码或者非大陆手机号码
 * 大陆		/^1([3578]\d{9}|4\d{9})$/
 * 非大陆		/^((852|853)(5|6|8|9)\d{7}|1[3458]\d{9}|659\d{7}|601[1-9]\d{7}|8869\d{8})$/
 * 
 * --------------------------------------------------------------------------------
 */


/*
公共属性： 【无】
公共方法：  ajax.get(url,status,callback);   使用get方法发送ajax请求。
                                             url : 请求的地址，不需要添加随机数。
                                             status :  true 时 为异步请求， false 时 为同步请求
                                             callback : 回调函数
            ajax.post(url,content,status,callback);  使用post方法发送ajax请求。
                                             url : 请求的地址
                                             content : 请求的参数
                                             status : true 时 为异步请求， false  时 为同步请求
                                             callback : 回调函数
说明： 此方法解决了 在Firefox下 ajax同步请求 不调用 onreadystatechange 的问题。
       可显视的指定为【同步方式】请求，可以并发执行。不会发生线程冲突
*/
var ajax = {
	xmlhttp : false,
	CreateXMLHttp : function() {
	    try{
	        ajax.xmlhttp = new XMLHttpRequest();
	    }
	    catch (e){
	        try{
	            ajax.xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); 
	        }
	        catch (e){
	            try{
	              ajax.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
	            }
	            catch (failed){
	                  ajax.xmlhttp = false;
	            }
	        }            
	    }
	    return ajax.xmlhttp;
	},
	get : function(url,status,callback) {
	    this.CreateXMLHttp();
	    if(!ajax.xmlhttp) return;
	    if(url.indexOf('?') !== -1) url += "&t"+ Math.floor(Math.random()*10000) + "=" + new Date();
	    else url += "?t" + Math.floor(Math.random()*10000) + "=" + new Date();
	    ajax.xmlhttp.open("GET",url,status);
	    ajax.xmlhttp.onreadystatechange = function() {
	        if(ajax.xmlhttp.readyState == 4) {
	            if(ajax.xmlhttp.status == 200) {
	                callback(ajax.getReturnValue());
	            }
	        }
	    }
	    ajax.xmlhttp.send(null);
	    if(!status) {
	        if(this.isFirefox())
	            callback(ajax.getReturnValue());
	    }
	},
	post : function(url,content,status,callback) {
	    var para="";
	    this.CreateXMLHttp();
	    if(!ajax.xmlhttp) return;
	    if(isJson(content)) {
	         var i=0;
	         for(var key in content){
	            if(i===0) para += key + "=" + content[key];
	            else para += "&" + key + "=" + content[key];
	            i++;
	         }
	         if(para.length === 0) para += "t" + Math.floor(Math.random()*10000) + "=" + new Date();
	         else para += "&t"+ Math.floor(Math.random()*10000) + "=" + new Date();
	    }
	    ajax.xmlhttp.open("POST",url,status);
	    ajax.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    ajax.xmlhttp.setRequestHeader("If-Modified-Since", new Date(0));
	    ajax.xmlhttp.onreadystatechange = function() {
	        if(ajax.xmlhttp.readyState == 4) {
	            if(ajax.xmlhttp.status == 200) {
	                callback(ajax.getReturnValue());
	            }
	        }
	    }
	    ajax.xmlhttp.send(para);
	    if(!status) {
	        if(this.isFirefox())
	            callback(ajax.getReturnValue());
	    }
	},
	getReturnValue : function() {
	    return ajax.xmlhttp.status == 200 ? /xml/i.test(ajax.xmlhttp.getResponseHeader("content-type")) ? ajax.xmlhttp.responseXML: ajax.xmlhttp.responseText: null
	},
	isFirefox : function() { 
	    if(isFirefox=navigator.userAgent.indexOf("Firefox") > 0){ 
	        return true
	    } 
	} 
}

/**
 * 判断对象是否是json
 */
var isJson = function(obj) {
	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;   
    return isjson;
}

//json格式化
function format(txt,compress/*是否为压缩模式*/){/* 格式化JSON源码(对象转换为JSON文本) */  
        var indentChar = '    ';   
        if(/^\s*$/.test(txt)){   
            alert('数据为空,无法格式化! ');   
            return;   
        }   
        try{var data=eval('('+txt+')');}   
        catch(e){   
            alert('数据源语法错误,格式化失败! 错误信息: '+e.description,'err');   
            return;   
        };   
        var draw=[],last=false,This=this,line=compress?'':'\n',nodeCount=0,maxDepth=0;   
           
        var notify=function(name,value,isLast,indent/*缩进*/,formObj){   
            nodeCount++;/*节点计数*/  
            for (var i=0,tab='';i<indent;i++ )tab+=indentChar;/* 缩进HTML */  
            tab=compress?'':tab;/*压缩模式忽略缩进*/  
            maxDepth=++indent;/*缩进递增并记录*/  
            if(value&&value.constructor==Array){/*处理数组*/  
                draw.push(tab+(formObj?('"'+name+'":'):'')+'['+line);/*缩进'[' 然后换行*/  
                for (var i=0;i<value.length;i++)   
                    notify(i,value[i],i==value.length-1,indent,false);   
                draw.push(tab+']'+(isLast?line:(','+line)));/*缩进']'换行,若非尾元素则添加逗号*/  
            }else   if(value&&typeof value=='object'){/*处理对象*/  
                    draw.push(tab+(formObj?('"'+name+'":'):'')+'{'+line);/*缩进'{' 然后换行*/  
                    var len=0,i=0;   
                    for(var key in value)len++;   
                    for(var key in value)notify(key,value[key],++i==len,indent,true);   
                    draw.push(tab+'}'+(isLast?line:(','+line)));/*缩进'}'换行,若非尾元素则添加逗号*/  
                }else{   
                        if(typeof value=='string')value='"'+value+'"';   
                        draw.push(tab+(formObj?('"'+name+'":'):'')+value+(isLast?'':',')+line);   
                };   
        };   
        var isLast=true,indent=0;   
        notify('',data,isLast,indent,false);   
        return draw.join('');   
    } 

/*
 * 修改、添加、删除地址栏参数
 * http://www.metinfo.cn
 * */
function replaceParamVal(paramName,replaceWith) {
	var newUrl=oldUrl=window.location.href,
        paramNames='&' + paramName + '=';
        re = eval('/('+paramNames+')([^&]*)/gi');
    if(replaceWith){
        if(oldUrl.indexOf(paramNames)>=0){
            newUrl = oldUrl.replace(re, paramNames + replaceWith);
        }else{
            newUrl = oldUrl+ paramNames + replaceWith;
        }
    }else if(oldUrl.indexOf(paramNames)>=0){
        newUrl = oldUrl.replace(re, '');
    }
	history.pushState('','',newUrl);
}

/**
 * 异步加载文件
 * 
 * file		文件名
 * fun		回调函数
 */
function include(file, fun) {
    var files = typeof file == "string" ? [file] : file;
    for (var i = 0; i < files.length; i++) {
        var name = files[i].replace(/^\s|\s$/g,""),
            att = name.split('.'),
            ext = att[att.length - 1].toLowerCase(),
            ext = ext.split('?');
        if (ext[0]=='js') {
            var filesi = document.createElement('script');
            filesi.src = name;
            filesi.type = "text/javascript";
            if (typeof filesi != "undefined") document.getElementsByTagName('html')[0].appendChild(filesi);
        } else if (ext[0] == 'css') {
            var filesi = document.createElement('link');
            filesi.href = name;
            filesi.type = 'text/css';
            filesi.rel = "stylesheet";
            if (typeof filesi != "undefined") document.getElementsByTagName('head')[0].appendChild(filesi);
        }
    }
    if (typeof fun === "function") {
        filesi.onload = filesi.onreadystatechange = function() {
            var r = filesi.readyState;
            if (!r || r === 'loaded' || r === 'complete') {
                filesi.onload = filesi.onreadystatechange = null;
                fun();
            }
        };
    }
}

//域名格式验证

function domain_verification(domain,suffix){
	var rtn = true;
	var maxlenth = 67 - suffix.length,//域名字节数不能超过67位（包含域名后缀.com...）
		regexp = new RegExp("^^[a-z0-9-]{1,"+maxlenth+"}$","i");

	if(!regexp.test(domain)){
		rtn = false;
	}

	//开头不能为 - 
	if(domain.indexOf('-')==0){
		rtn = false;
	}

	//结尾不能为 -
	if(domain.charAt(domain.length-1)=="-"){
		rtn = false;
	}
	return rtn;

}

//检测浏览器版本
var client = function() {
    //呈现引擎
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //完整的版本号
        ver: null
    };
    //浏览器
    var browser = {
        //主要浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        //具体的版本号
        ver: null
    };
    //平台、设备和操作系统
    var system = {
        win: false,
        mac: false,
        x11: false,
        //移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        //游戏系统
        wii: false,
        ps: false
    };
    //检测呈现引擎和浏览器
    var ua = navigator.userAgent;
    if (window.opera) {
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);
        //确定是 Chrome 还是 Safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
        } else {
            //近似地确定版本号
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }
            browser.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);
        //确定是不是 Firefox
        if (/Firefox\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }
    //检测浏览器
    browser.ie = engine.ie;
    browser.opera = engine.opera;
    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    //检测 Windows 操作系统
    if (system.win) {
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
            if (RegExp["$1"] == "NT") {
                switch (RegExp["$2"]) {
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    default:
                        system.win = "NT";
                        break;
                }
            } else if (RegExp["$1"] == "9x") {
                system.win = "ME";
            } else {
                system.win = RegExp["$1"];
            }
        }
    }
    //移动设备
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;
    //windows mobile
    if (system.win == "CE") {
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if (/Windows Phone OS (\d+.\d+)/.test(ua)) {;
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        }
    }
    //检测 iOS 版本
    if (system.mac && ua.indexOf("Mobile") > -1) {
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } else {
            system.ios = 2; //不能真正检测出来，所以只能猜测
        }
    }
    //检测 Android 版本
    if (/Android (\d+\.\d+)/.test(ua)) {
        system.android = parseFloat(RegExp.$1);
    }
    //游戏系统
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);
    //返回这些对象
    return {
        engine: engine,
        browser: browser,
        system: system
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

window.isflsgrn = false;//ie11以下是否进入全屏标志，true为全屏状态，false为非全屏状态
window.ieIsfSceen = false;//ie11是否进入全屏标志，true为全屏状态，false为非全屏状态
//跨浏览器返回当前 document 是否进入了可以请求全屏模式的状态
function fullscreenEnable(){
    var isFullscreen = document.fullscreenEnabled ||
    window.fullScreen ||
    document.mozFullscreenEnabled ||
    document.webkitIsFullScreen;
    return isFullscreen;
}
//全屏
var fScreen = function(){
    var docElm = document.documentElement;
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
        ieIsfSceen = true;
    }
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }else {//对不支持全屏API浏览器的处理，隐藏不需要显示的元素
        window.parent.hideTopBottom();
        isflsgrn = true;
        $("#fsbutton").text("退出全屏");
    }
}
//退出全屏
var cfScreen = function(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }else {
        window.parent.showTopBottom();
        isflsgrn = false;
        $("#fsbutton").text("全屏");
    }
}
//全屏按钮点击事件
$("#fsbutton").click(function(){
    var isfScreen = fullscreenEnable();
    if(!isfScreen && isflsgrn == false){
        if (ieIsfSceen == true) {
            document.msExitFullscreen();
            ieIsfSceen = false;
            return;
        }
        fScreen();
    }else{
        cfScreen();
    }
})
//键盘操作
$(document).keydown(function (event) {
    if(event.keyCode == 27 && ieIsfSceen == true){
        ieIsfSceen = false;
    }
});
//监听状态变化
if (window.addEventListener) {
    document.addEventListener('fullscreenchange', function(){ 
        if($("#fsbutton").text() == "全屏"){
            $("#fsbutton").text("退出全屏"); 
        }else{
            $("#fsbutton").text("全屏");
        }
    });
    document.addEventListener('webkitfullscreenchange', function(){ 
        if($("#fsbutton").text() == "全屏"){
            $("#fsbutton").text("退出全屏"); 
        }else{
            $("#fsbutton").text("全屏");
        }
    });
    document.addEventListener('mozfullscreenchange', function(){ 
        if($("#fsbutton").text() == "全屏"){
            $("#fsbutton").text("退出全屏"); 
        }else{
            $("#fsbutton").text("全屏");
        }
    });
    document.addEventListener('MSFullscreenChange', function(){ 
        if($("#fsbutton").text() == "全屏"){
            $("#fsbutton").text("退出全屏"); 
        }else{
            $("#fsbutton").text("全屏");
        }
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 验证url是否有效
 */
function checkUrlState(url) {
	var xmlHttp;
	try {
		xmlhttp = new XMLHttpRequest();
	}catch (e) {
		try {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e) {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	xmlhttp.open('GET', url, false);
	try{
		xmlhttp.send();	
	}catch(e){
	}finally{
		var result = xmlhttp.responseText;
		if(result) {
			if(xmlhttp.status === 200) {
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
}

/**
 * 判断是否为网址
 * @param strUrl
 * @returns {Boolean}
 */
function IsURL(strUrl) {
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    if (regular.test(strUrl)) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * 格式化css代码
 */
function formatCss(s){
	s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
	s = s.replace(/;\s*;/g, ";"); //清除连续分号
	s = s.replace(/\,[\s\.\#\d]*{/g, "{");
	s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
	s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
	s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
	return s;
}

/**
 * 压缩css代码
 */
function yasuoCss (s) {
	  s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //删除注释
	  s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
	  s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //容错处理
	  s = s.replace(/;\s*;/g, ";"); //清除连续分号
	  s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白
	  return (s == null) ? "" : s[1];
}

/**
 * base64解码
 * @param data
 * @returns
 */
function base64_decode(data){
	  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,ac = 0,dec = "",tmp_arr = [];
	  if (!data) { return data; }
	  data += '';
	  do {
	    h1 = b64.indexOf(data.charAt(i++));
	    h2 = b64.indexOf(data.charAt(i++));
	    h3 = b64.indexOf(data.charAt(i++));
	    h4 = b64.indexOf(data.charAt(i++));
	    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
	    o1 = bits >> 16 & 0xff;
	    o2 = bits >> 8 & 0xff;
	    o3 = bits & 0xff;
	    if (h3 == 64) {
	      tmp_arr[ac++] = String.fromCharCode(o1);
	    } else if (h4 == 64) {
	      tmp_arr[ac++] = String.fromCharCode(o1, o2);
	    } else {
	      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
	    }
	  } while (i < data.length);
	  dec = tmp_arr.join('');
	  dec = utf8_decode(dec);
	  return dec;
}

function utf8_decode(str_data){
	  var tmp_arr = [],i = 0,ac = 0,c1 = 0,c2 = 0,c3 = 0;str_data += '';
	  while (i < str_data.length) {
	    c1 = str_data.charCodeAt(i);
	    if (c1 < 128) {
	      tmp_arr[ac++] = String.fromCharCode(c1);
	      i++;
	    } else if (c1 > 191 && c1 < 224) {
	      c2 = str_data.charCodeAt(i + 1);
	      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
	      i += 2;
	    } else {
	      c2 = str_data.charCodeAt(i + 1);
	      c3 = str_data.charCodeAt(i + 2);
	      tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	      i += 3;
	    }
	  }
	  return tmp_arr.join('');
	}