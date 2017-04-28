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
downApp();


/**
 * 判断是否是 IE 浏览器
 */
if (document.all) {
	alert('IE浏览器');
} else {
	alert('非IE浏览器');
}
if (!!window.ActiveXObject) {
	alert('IE浏览器');
} else {
	alert('非IE浏览器');
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
       Obj.focus();
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
 * 根据需要确定是否精确到秒
 * 
 * @returns {String}
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
/** 
 * 依据当前月份，获取改变的时间，
 * 
 * 获取下一个月 ，上一个月，下一个季度，下半年，一年
 * 
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25 
 */ 
function getChangeDate(date,num) {  
    var arr = date.split('-');  
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);  
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;  
    var month2 = parseInt(month) + Number(num);  
    if (month2 > 12) {  
        year2 = parseInt(year2) + 1;  
        month2 = 1;  	
    }
    if(month2 < 1 ){
    	year2 = parseInt(year2) - 1;
    	month2 = 12;
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
