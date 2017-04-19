/**
 * 
 */

// common util

var baseUrl="../../";

/**
 * get screen height
 */
function getTotalHeight(){  
    if($.browser.msie){
        return document.compatMode == "CSS1Compat"? document.documentElement.clientHeight :
                 document.body.clientHeight;
    }else{
        return self.innerHeight;
    }
}

/**
 * get screen width
 */
function getTotalWidth(){  
    if($.browser.msie){
        return document.compatMode == "CSS1Compat"? document.documentElement.clientWidth :
                 document.body.clientWidth;
    }else{
        return self.innerWidth;
    }
}

/**
 * get body height
 */
function getBodyTotalHeight(){  
		if($.browser.msie){
				return document.body.scrollHeight+1;
		}else if($.browser.mozilla){
				return document.documentElement.scrollHeight+1;
		}else if($.browser.webkit){
				return document.documentElement.scrollHeight+1;
		}else {
				return document.documentElement.scrollHeight+1;
		}
}


/**
 * get Screen Scroll Top
 */
function getScreenScrollTop(){ 
	 if($.browser.msie){
		 return document.documentElement.scrollTop;
	 }else if($.browser.mozilla){
		 return document.documentElement.scrollTop;
	 }else{
		 return document.body.scrollTop;
	 } 
}

/**
 * get Screen Scroll left
 */
function getScreenScrollLeft(){ 
/* 
	 if($.browser.msie){
		 return document.documentElement.scrollLeft;
	 }else if($.browser.mozilla){
		 return document.documentElement.scrollLeft;	 
	 }else {
		 return document.body.scrollLeft;
	 } 
		*/
		return document.body.scrollLeft;
}

/**
 * process request result data
 * */
var RESULT_OK=0;
var RESULT_NOK=1;
var LOG_LEVEL='DEBUG';
var LOG_LEVEL_I='INFO';
var LOG_LEVEL_D='DEBUG';
function Result(code,data){
	this.code = code;
	this.data = data;
}

function processResult(data) {
	try {
		data = jQuery.trim(data);
		data = eval('(' + data + ')');
		return new Result(data.code, data.data);
	} catch (e) {
		if(LOG_LEVEL==LOG_LEVEL_D){
			 showMessageDialog(data,'Error');
		}else { 
		  showSystemProcessDataError(data);
		}
		return null;
	}
}

/**
 * show System Process DataError
 * */
function showSystemProcessDataError(data){
	 var html='<div>';
		html = html+'<h1>Dear visitors,</h1>';
		html = html+'<h2>Our hosting server is experiencing some errors. Please refresh the Page or click <a href="javascript:location.reload(true);" >here</a>.</h2>';
		html = html+'</div>';
		showMessageDialog(html,'Error');
}

/**
 * get url perametes;
 * */
function getQueryString(name)
{
    // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
    if(location.href.indexOf("?")==-1 || location.href.indexOf(name+'=')==-1)
    {
        return '';
    }
 
    // 获取链接中参数部分
    var queryString = location.href.substring(location.href.indexOf("?")+1);
				
				if(queryString.indexOf("#")>0)
    {
       queryString= queryString.substring(0, queryString.indexOf("#"));
    }
 
    // 分离参数对 ?key=value&key2=value2
    var parameters = queryString.split("&");
 
    var pos, paraName, paraValue;
    for(var i=0; i<parameters.length; i++)
    {
        // 获取等号位置
        pos = parameters[i].indexOf('=');
        if(pos == -1) { continue; }
 
        // 获取name 和 value
        paraName = parameters[i].substring(0, pos);
        paraValue = parameters[i].substring(pos + 1);
 
        // 如果查询的name等于当前name，就返回当前值，同时，将链接中的+号还原成空格
        if(paraName == name)
        {
            return unescape(paraValue.replace(/\+/g, " "));
        }
    }
    return '';
};

/**
 * get url Back String;
 * */
function getPageBackUrlString(name){
	if(location.href.indexOf("?")==-1 || location.href.indexOf(name+'=')==-1)
	{
					return '';
	}

	var queryString = location.href.substring(location.href.indexOf(name)+name.length+1);
	return queryString;
}

/**
 * get checkBoxValue
 * */
function getCheckboxChooseBase(name){
	var ids= "";
	var list = document.getElementsByName(name);
	for(var i=0;i<list.length;i++){
		if(list[i].checked){
			ids=ids+list[i].value+",";
		} 
	}
	if(ids.length>1){
		ids = ids.substring(0,ids.length-1);
	}
	return ids;
}

/**
 * get checkBox Choose
 * */
function getCheckboxChoose(name){
	var ids= "";
		$("input[name='"+name+"']").each( function() {
			if($(this).attr("checked"))
			    ids=ids+$(this).attr("value")+",";
		});
		if(ids.length>1){
			ids = ids.substring(0,ids.length-1);
		}
	return ids;
}

/**
 * get checkBox Choose Other
 * */
function chooseCheckboxOther(name) {
	$("input[name='"+name+"']").each( function() {
		$(this).attr("checked", !$(this).attr("checked"));
	});
}

/**
 * get checkBox Choose All
 * */
function chooseCheckboxAll(name) {
	$("input[name='"+name+"']").each( function() {
		$(this).attr("checked", "checked");
	});
}

/**
 * Set CheckBox Choose All
 * */
function setCheckboxAll(p_id,name) {
	$('#'+p_id+'>'+"input[name='"+name+"']").each( function() {
		$(this).attr("checked", "checked");
	});
}

/**
 * choose Checkbox None
 * */
function chooseCheckboxNone(name) {
	$("input[name='"+name+"']").each( function() {
		//$(this).attr("checked", "");
		$(this).removeAttr("checked");
	});
}

/**
 * change Checkbox None
 * */
function changeCheckboxNone(id) {
	// 
	//alert(document.getElementById(id).checked);
	if(document.getElementById(id).checked){
		$('#'+id).attr("checked", "checked");
	}else {
		$('#'+id).removeAttr("checked");
	}
}

/**
 * set Checkbox Choose
 * */
function setCheckboxChoose(name,val) {
	 if(null!=val&&val!=''){
			 var data = val.split(',');
				if(null!=data&&data.length>0){
					 var val='';
					 for(var i=0;i<data.length;i++){  
								setRadioChoose(name,data[i]); 
						}
				}
		}
}

/**
 * Get radio Choose
 * */
function getRadioChoose(name){
	var ids= "";
		$("input[name='"+name+"']").each( function() {
				if($(this).attr("checked")){
						ids=$(this).attr("value");
				}
		});
	return ids;
}

/**
 * Set radio Choose
 * */
function setRadioChoose(name,val){
	$("input[name='"+name+"']").each( function() {
		if($(this).val()==val){
			document.getElementById($(this).attr('id')).checked = true;
		}
	}); 
}

/**
 * auto SetSelect Default Value
 * */
function autoSetSelectDefaultValue(id){
	 var c = 0; 
		var f = 0;
		var fv = 0;
		$('#'+id+' >option').each( function() {
			if(stringToInt($(this).val())>0){
				c = c +1;
				if(f==0){
					f = c;
					fv = $(this).val();
				}
			}
		});  
		if(c==1){ 
				 $('#'+id).val(fv);
		}
}
//muti selector


/****
 * get MultSelect Choose
 * @param id
 * @returns ids
 */
function getMultSelectChoose(id){
		var ids= "";
		$('#'+id+' >option').each( function() {
				if($(this).attr("selected")){
						ids= ids + $(this).attr("value")+",";
				}
		});
		if(ids.length>1){
			ids = ids.substring(0,ids.length-1);
		}	
		return ids;
}

/****
 * set MultSelect Choose
 * @param id
 * @param valList
 */
function setMultSelectChoose(id,valList){
		for(var i=0;i<valList.length;i++){
			 try{
						if(null!=document.getElementById($('#'+id+" >option[value='"+valList[i]+"'] ").attr('id'))){
								document.getElementById($('#'+id+" >option[value='"+valList[i]+"'] ").attr('id')).selected = true;
						}
				}catch(e){
					
				}
				//$('#'+id+" >option[value='"+valList[i]+"'] ").attr("selected","selected");
		}
}

/***
 * get Select Option Text
 * @param sid
 * @param oval
 * @returns
 */
function getSelectOptionText(sid,oval){
		return $('#'+sid+" >option[value='"+oval+"']").text();
}

/****
 * get MultSelect Choose
 * @param id
 * @returns {String}
 */
function getMultSelectChoose(id){
		var ids= "";
		$('#'+id+' >option').each( function() {
				if($(this).attr("selected")){
						ids= ids + $(this).attr("value")+",";
				}
		});
		if(ids.length>1){
			ids = ids.substring(0,ids.length-1);
		}	
		return ids;
}


/***
 * loading css list
 */
function loadCssList(cssList){
		var cssTag = document.getElementById('loadCss');
		var head = document.getElementsByTagName('head').item(0);
		if(cssTag) head.removeChild(cssTag);
		for ( var i = 0; i < cssList.length; i++) {
				css = document.createElement('link');
				css.href = cssList[i];
				css.rel = 'stylesheet';
				css.type = 'text/css';
				css.id = 'loadCss'+i;
				head.appendChild(css);
		}
}

/***
 * loading css file
 */
function loadCssFile(file){
		var head = document.getElementsByTagName('head').item(0);
		css = document.createElement('link');
		css.href = file;
		css.rel = 'stylesheet';
		css.type = 'text/css'; 
		head.appendChild(css);
}

/***
 * loading css other list
 */
function loadCssOtherList(cssList){ 
	var head = document.getElementsByTagName('head').item(0);
	for ( var i = 0; i < cssList.length; i++) {
		css = document.createElement('link');
		css.href = cssList[i];
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.id = 'loadCss'+i;
		head.appendChild(css);
	}
}

/***
 * show alert msg
 */
var MSG_TYPE_I=0;
var MSG_TYPE_A=1;
var MSG_TYPE_C=2;
var MSG_TYPE_E =3;

function showMessage(type,msg){
	if(type==MSG_TYPE_I){
	  return showInfoMsg(msg);
	}else if(type==MSG_TYPE_A){
	  return alert(msg);
	}else if(type==MSG_TYPE_C){
	  return confirm(msg);
	}else if(type==MSG_TYPE_E){
	  return alert(msg);
	}
}
function showInfoMsg(msg){
	var div=$('<div/>');
	div.addClass('infomsg_div');
	$('body').append(div);
	div.append(msg);
	div.show();
	div.fadeOut(5000,function(){
			div.remove();
	});
}

/****
 * init Content Data
 * @param data
 * @returns {Array}
 */
function initContentData(data){
	var values = new Array();
	for(var i=0;i<9;i++){
	 	values[i] = data.substring(0,data.indexOf('|'));
	  data = data.substring(data.indexOf('|')+1,data.length);
	}
	values[9] = data;
	return values;
}

/***
 * init Description Data
 * @param data
 * @returns {Array}
 */
function initDescriData(data){
	var values = new Array();
	for(var i=0;i<2;i++){
		values[i] = data.substring(0,data.indexOf('|'));
	    data = data.substring(data.indexOf('|')+1,data.length);
	}
	values[2] = data;
	return values;
}

/***
 * changeJsonData
 * @param val
 * @returns
 */
function changeJsonData(val){
	val = fixedKeywordData(val);
	$('#cjd_d').remove();
	$('body').append('<div id=cjd_d style="display:none;position:absolute;"></div>');
	$('#cjd_d').html('');
	$('#cjd_d').html(val);
	return $('#cjd_d').html();
}

/***
 * changeJsonDataText
 * @param val
 * @returns
 */
function changeJsonDataText(val){
	val = fixedKeywordData(val);
	$('#cjd_d').remove();
	$('body').append('<div id=cjd_d style="display:none;position:absolute;"></div>');
	$('#cjd_d').html('');
	$('#cjd_d').html(val);
	return $('#cjd_d').text();
}

/***
 * get Current Year
 * @returns
 */
function getCurYear(){
	var myDate = new Date();
	return myDate.getFullYear();
}

/***
 * get Current Month
 * @returns
 */
function getCurMonth(){
	var myDate = new Date();
	return myDate.getMonth()+1;
}

/***
 * get Current Date
 * @returns
 */
function getCurDate(){
	var myDate = new Date();
	return myDate.getDate();
}

/** 获取上一个月 
* 
* @date 格式为yyyy-mm-dd的日期，如：2014-01-25 
*/  
function getPreMonth(date) {  
   var arr = date.split('-');  
   var year = arr[0]; //获取当前日期的年份  
   var month = arr[1]; //获取当前日期的月份  
   var day = arr[2]; //获取当前日期的日  
   var days = new Date(year, month, 0);  
   days = days.getDate(); //获取当前日期中月的天数  
   var year2 = year;  
   var month2 = parseInt(month) - 1;  
   if (month2 == 0) {  
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

/** 
 * 获取下一个月 
 * 
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25 
 */ 
function getNextMonth(date) {  
    var arr = date.split('-');  
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);  
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;  
    var month2 = parseInt(month) + 1;  
    if (month2 == 13) {  
        year2 = parseInt(year2) + 1;  
        month2 = 1;  
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
 * 依据当前月份
 * 获取下一个季度
 * 
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25 
 */ 
function getNextQuarter(date) {  
    var arr = date.split('-');  
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);  
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;  
    var month2 = parseInt(month) + 3;  
    if (month2 >12) {  
        year2 = parseInt(year2) + 1;  
        month2 = month2 - 12;
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
 * 依据当前月份
 * 获取半年
 * 
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25 
 */ 
function getNextHalfYear(date) {  
    var arr = date.split('-');  
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);  
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;  
    var month2 = parseInt(month) + 6;  
    if (month2 >12) {  
        year2 = parseInt(year2) + 1;  
        month2 = month2 - 12;
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
 * 依据当前月份
 * 获取一年
 * 
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25 
 */ 
function getNextYear(date) {  
    var arr = date.split('-');  
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);  
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;  
    var month2 = parseInt(month) + 12;  
    if (month2 >12) {  
        year2 = parseInt(year2) + 1;  
        month2 = month2 - 12;
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

var V_K_W = ["'","\n"];
var V_K_R_W = ["&#39","<br>"];

function retriveKeyWords(val){
	for(var i=0;i<V_K_W.length;i++){
		while(val.indexOf(V_K_W[i])>=0){
			val = val.replace(V_K_W[i],V_K_R_W[i]);
		}	
	} 
	return val;	
}

function fixedKeywordData(val){
		try{
			while(null!=val&&val.indexOf('&#38#38')>=0){
				val = val.replace('&#38#38','&#38');
			}	
			while(null!=val&&val.indexOf('&#38#39')>=0){
				val = val.replace('&#38#39','&#39');
			}	
		}catch(e){
			
		}
		return val;
}
function retriveEmailHtml(email){
	var html='';
	html = '<a href="mailto:'+email+'">'+email+'</a>';
	return html;
}

var yf=1950;
var yt=2015;
function createSelectDate(){
		yf = getCurYear()-1;
		yt = getCurYear()+5;
		var html='';
		var yhtml = '<select id="sd_y" onchange=changeYear()>';
		for(var i=yf;i<yt;i++){
			yhtml = yhtml+'<option value='+i+'>'+i+'</option>';
		}
		yhtml = yhtml+'</select>';
		
		var mhtml = '<select id="sd_m" onchange=changeMonth()>';
		for(var i=1;i<=12;i++){
			mhtml = mhtml+'<option value='+i+'>'+i+'</option>';
		}
		mhtml = mhtml+'</select>';
		
		var dhtml = '<select id="sd_d" >';
		for(var i=1;i<=31;i++){
			dhtml = dhtml+'<option value='+i+'>'+i+'</option>';
		}
		dhtml = dhtml+'</select>';
		
		html = yhtml+mhtml+dhtml;
		return html;
}

function createSelectDateByYear(frYear,toYear){
		yf = frYear;
		yt = toYear;
		var html='';
		var yhtml = '<select id="sd_y" onchange=changeYear()>';
		for(var i=yf;i<=yt;i++){
			yhtml = yhtml+'<option value='+i+'>'+i+'</option>';
		}
		yhtml = yhtml+'</select>';
		
		var mhtml = '<select id="sd_m" onchange=changeMonth()>';
		for(var i=1;i<=12;i++){
			mhtml = mhtml+'<option value='+i+'>'+i+'</option>';
		}
		mhtml = mhtml+'</select>';
		
		var dhtml = '<select id="sd_d" >';
		for(var i=1;i<=31;i++){
			dhtml = dhtml+'<option value='+i+'>'+i+'</option>';
		}
		dhtml = dhtml+'</select>';
		
		html = yhtml+mhtml+dhtml;
		return html;
}

function changeYear(){
	var cd = parseInt($('#sd_d').val());
	reSetDate(cd);
}

function changeMonth(){
	var cd = parseInt($('#sd_d').val());
	reSetDate(cd);
}

function reSetDate(cd){
		var y=parseInt($('#sd_y').val());
		var m=parseInt($('#sd_m').val());
		var d = getMonthDay(y,m);
		$('#sd_d').empty();
		var dhtml ='';
		for(var i=1;i<=d;i++){
			if(i==cd){
				dhtml = dhtml+'<option value='+i+' selected="selected">'+i+'</option>';
			}else {
				dhtml = dhtml+'<option value='+i+' >'+i+'</option>';
			}
		}
		$('#sd_d').append(dhtml);
}
function initSelectDate(y,m,d){
		if(null==y){
			$('#sd_y').val(getCurYear());
		}else {
			$('#sd_y').val(y);
		}
		if(null==m){
			$('#sd_m').val(getCurMonth());
		}else {
			$('#sd_m').val(m);
		}
		if(null==d){
			$('#sd_d').val(getCurDate());
		}else {
			$('#sd_d').val(d);
		} 
}

function getSelectDate(){
	return $('#sd_y').val()+'-'+$('#sd_m').val()+'-'+$('#sd_d').val();
}

function getMonthDay(y,m){
	var d = 31;
 if(m==4||m==6||m==9||m==11){
		d = 30;
	}else if(m==2){
		if(y%4==0||y%100==0){
			d=29;
		}else {
			d=28;
		}
	}
	return d;
}

/***
 * string To Int
 * @param val
 * @returns
 */
function stringToInt(val){ 
	if(null==val||val==''){
		return 0;
	}
	val = val +'';
	if(val!='0'&&val!='00'){
		while(val.indexOf('0')==0){
			val = val.substring(1,val.length);
		}
	}
	try {
		val =  parseInt(val); 
		return val;
	} catch (e) { 
		return 0;
	}
}

/***
 * float To Int
 * @param val
 * @returns
 */
function floatToInt(val){ 
 val = val+'';
	if(val==''){
		return 0;
	}
	try {
		if(val.indexOf('.')>0){
			val = val.substring(0,val.indexOf('.'));
		}
		val =  parseInt(val); 
		return val;
	} catch (e) { 
		return 0;
	}
}

/***
 * string To Float
 * @param val
 * @returns
 */
function stringToFloat(val){ 
	if(null==val||val==''){
		return 0;
	}
	try {
		val =  parseFloat(val); 
		return val;
	} catch (e) { 
		return 0;
	}
}

/**
 * reSet  FloatVal
 * @param val
 * @returns {Number:保留两位小数}
 */
function reSetFloatVal(val){
	return Math.round(parseFloat(val) * Math.pow(10, 2)) / Math.pow(10, 2);
}

/**
 * reSet  FloatVal
 * @param val
 * @returns {Number:四舍五入}
 */
function reSetFloatVal2(val,l){
	return Math.round(parseFloat(val) * Math.pow(10, l)) / Math.pow(10, l);
}

/**
 * 金额转为带2位小数
 * @param val
 * @returns {Number}
 */
function floatToMoneyText(val) {
		val = reSetFloatVal(val);
		val = val + "";
		var l ='';
		if(val.indexOf('-')==0){
						l ='-';
						val = val.substring(1,val.length);
		}
		if (val.indexOf('.') > 0) {
						if (val.indexOf('.') == val.length - 2) {
										val = val + "0";
						}
		} else {
						val = val + ".00";
		}
		val = l+val;
		return val;
}

/**
 * 
 * @param val
 * @returns {Number}
 */

function getMoneyRoundOff(val){
	val = reSetFloatVal(val);
	var ro = Math.round(val*100);
	var roi= parseInt(ro)%10;
	if(roi>=5){
		ro = roi/100-0.05;
	}else {
		ro = roi/100;
	}
	
	return reSetFloatVal(ro);
}

function getDayFromDB(data){
		if(null!=data&&data!=''&&data.indexOf(' ')>0){
			return data.substring(0,data.indexOf(' '));
		}else {
			return data;
		} 
}

function getJSDateFromDB(data){
	 //var date = new Date();
		if(null!=data&&data!=''&&data.indexOf(' ')>0){
			 data = data.substring(0,data.indexOf(' '));
		}
		return new Date(data); 
}

function getTimeFromDB(data){
		if(null!=data&&data!=''&&data.indexOf(' ')>0){
				return data.substring(data.indexOf(' '),data.length);
		}else {
			return data;
		} 
}

function getTimeWithoutSecondFromDB(data){
		if(null!=data&&data!=''&&data.indexOf(' ')>0){
			 data = data.substring(data.indexOf(' ')+1,data.length);
				return data.substring(0,5);
		}else {
			 return data.substring(0,5);
		} 
}

function getJSDateTimeFromDB(data){ 
  data = data.replace(' ','T');
		return new Date(data);
}

function getMonthFromDB(data){
	if(!isEmpty(data)){
	 	data = data.substring(0,data.indexOf(' '));
  	data = data.substring(0,data.lastIndexOf('-'));
	}
	return data;
}

function initDateInput(id){
	 $('#'+id).val(getCurYear()+'-'+getCurMonth()+'-'+getCurDate());
}

function initPageTitle(val){
	window.document.title = val;
	$('#pc_title').text(val);
	$('#pg_title').text(val);
}

function updatePageTitle(val){
 $('title').text(val); 
}

function updatePageKeywords(val){
 $('meta[name=Keywords]').attr('content', val);
}

function updatePageDescription(val){
	$('meta[name=Description]').attr('content', val);
}

function openNewPage(url){
	window.open(url);
}

function gotoPage(url){
	window.location.href=url;
}

function getGSTLbl(){
	var gst = stringToFloat($('#trans_gst').val())*100;
	gst = gst+"";
	return gst.substring(0,gst.indexOf('.'))+'%';
}

function checkUrlReLocaction(){
   var hr = location.href;
   if(hr.indexOf('#')>0){
	   hr = hr.substring(0,hr.indexOf('#'));
	   window.location.href=hr;
   }
}
function setInputDisable(){
	$("input[type='text']").each( function() {
			$(this).attr("disabled","disabled");
	});	
	$("input[type='checkbox']").each( function() {
			$(this).attr("disabled","disabled");
	});	
 $("input[type='radio']").each( function() {
			$(this).attr("disabled","disabled");
	});	
	$("input[type='file']").each( function() {
			$(this).attr("disabled","disabled");
	});	
	
	$("select").each( function() {
			$(this).attr("disabled","disabled");
	});	
	$("textarea").each( function() {
			$(this).attr("disabled","disabled");
	});	
	$(".submitBtn").each( function() {
			$(this).remove();
	});
}

function setInputDisableAfterId(id){
	$('#'+id).find("input[type='text']").each( function() {
		  $(this).attr("disabled","disabled");
	});
	
	$('#'+id).find("select").each(function() {
			$(this).attr("disabled","disabled");
	});
	
	$('#'+id).find("input[type='checkbox']").each( function() {
		 $(this).attr("disabled","disabled");
	});
	
	$('#'+id).find("input[type='radio']").each( function() {
			 $(this).attr("disabled","disabled");
	});
	
	$('#'+id).find("textarea").each( function() {
		  $(this).attr("disabled","disabled");
	});
	
	$('#'+id).find(".c_input_file_d").each( function() {
		  $(this).attr("disabled","disabled");
	});
	$('#'+id).find(".c_input_photo_d").each( function() {
		 $(this).attr("disabled","disabled");
	});
	
	$('#'+id).find(".c_btn_submit").each( function() {
		 $(this).remove();
	});
}

function reSetInputDisable(id){
	$("input[type='text']").each( function() {
		 $(this).val('');
			//$(this).attr("disabled","disabled");
	});	
	$("input[type='checkbox']").each( function() {
		 $(this).attr("selected","");
	});	
 $("input[type='radio']").each( function() {
			$(this).attr("selected","");
	});	
	$("select").each( function() { 
			$(this).val('');
	});	
	$("textarea").each( function() {
			$(this).val('');
	});	
	/*
	$('#'+id+'>'+"input[type='text']").each( function() {
		 $(this).val('');
			//$(this).attr("disabled","disabled");
	});	
	$('#'+id+'>'+"input[type='checkbox']").each( function() {
			//$(this).attr("disabled","disabled");
		 $(this).attr("selected","");
	});	
 $('#'+id+'>'+"input[type='radio']").each( function() {
			//$(this).attr("disabled","disabled");
			$(this).attr("selected","");
	});	
	$('#'+id+'>'+"select").each( function() { 
			$(this).val('');
	});	
	$('#'+id+'>'+"textarea").each( function() {
			$(this).val('');
	});	
	*/
}

function reSetFormInputData(id){
	$('#'+id).find("input[type='text']").each( function() {
		  $(this).val('');
	});
	
	$('#'+id).find("input[type='password']").each( function() {
		  $(this).val('');
	});
	
	$('#'+id).find("input[type='file']").each( function() {
		  $(this).val('');
	});
	
	$('#'+id).find("select").each( function() {
		  $(this).val('');
	});
	
	$('#'+id).find("input[type='checkbox']").each( function() {
		  document.getElementById($(this).attr('id')).checked = false;
	});
	
	$('#'+id).find("input[type='radio']").each( function() {
			 document.getElementById($(this).attr('id')).checked = false;
	});
	
	$('#'+id).find("textarea").each( function() {
		  $(this).val('');
	});
	
	$('#'+id).find(".c_input_file_d").each( function() {
		  $(this).empty();
	});
	$('#'+id).find(".c_input_photo_d").each( function() {
		  $(this).empty();
	});
}

var V_K_W = ["'","\n"];
var V_K_R_W = ["&#39","<br>"];

function retriveKeyWords(val){
	try{
			for(var i=0;i<V_K_W.length;i++){
				while(val.indexOf(V_K_W[i])>=0){
					val = val.replace(V_K_W[i],V_K_R_W[i]);
				}	
			} 
	}catch(e){
		
	}
	return val;	
}

function retriveBackKeyWords(val){
	try{
		for(var i=0;i<V_K_R_W.length;i++){
			while(val.indexOf(V_K_R_W[i])>=0){
				val = val.replace(V_K_R_W[i],V_K_W[i]);
			}	
		}
	}catch(e){
		
	} 
	return val;	
}


function retriveBrKeyWords(val){ 
	while(val.indexOf('<br>')>=0){
		val = val.replace('<br>','\n');
	}
	return val;	
}

function retriveTextAreaKeyWords(val){
	return changeJsonDataText(retriveBackKeyWords(val));
	//return retriveBackKeyWords(changeJsonData(val));
}

function createEmailLink(email){
	return '<a href="mailto:'+email+'">'+email+'</a>';	
}

function calculateTextLength(id,sid){
	var data = $('#'+id).val(); 
	$('#'+sid).text('Current Count:'+data.length);
}

function changeJsonData(val){
	$('#jsonData').html('');
	$('#jsonData').html(val);  
	return $('#jsonData').html();
}
/*
function changeJsonDataText(val){
	$('#jsonData').html('')
	$('#jsonData').html(val);  
	return $('#jsonData').text();
}
*/

function removeLastComma(val){
		if(val.lastIndexOf(',')>0){
				val = val.substring(0,val.length-1);
		}
	 return val;
}

function removeEndLastComma(val){
		if(val.lastIndexOf(',')>0&&val.lastIndexOf(',')==val.length-1){
				val = val.substring(0,val.length-1);
		}
	 return val;
}

function removeLastSpace(val){
		if(val.lastIndexOf(' ')>val.length-1){
				val = val.substring(0,val.length-1);
		}
	 return val;
}

function jsTrim(x)
{
return x.replace(/^\s+|\s+$/gm,'');
} 

//comsn type
function getComsnTypeLabel(val){
	var label="";
	switch(parseInt(val)){
	  case 1 : label="Direct Referral";break;
	  case 2 : label="Differential Rebate";break;
	  case 3 : label="VIP(1) Family";break; 
	  case 4 : label="VIP(2) Family";break; 
	  case 5 : label="VIP(3) Family";break; 
	  case 6 : label="VIP(4) Family";break; 
	  case 10 : label="TOP 5 Family";break; 
	  default:break;
	}
	return label;
}

//prodCatgy type
function getProdCatgyTypeLabel(val){
	var label="";
	switch(parseInt(val)){
	  case PRODCATGY_T_PROD : label="Product";break;
	  case PRODCATGY_T_PACK : label="Package";break;
	  case PRODCATGY_T_SPECIAL : label="Tag";break;
			case PRODCATGY_T_TOUR_TAG : label="Tour Tag";break;
	  default:break;
	}
	return label;
}

function resetCaptchaImg(){
	var realoadRandom = Math.random();
	$('#captcha_img_d').empty();
	$('#captcha_img_d').html('<img id="jc_'+realoadRandom+'" src="'+$('#g_baseUrl').val()+'jcaptcha?now='+realoadRandom+'" >');
}

//comsn type
function getResultLabel(val){
	var label="";
	switch(parseInt(val)){
	  case 1 : label="Yes";break;
	  case 2 : label="No";break;
	  default:break;
	}
	return label;
}

function checkSystemImg(linkUrl){
	 if(null==linkUrl||linkUrl==''){
				linkUrl ="/images/nophoto.png";
		}
		return linkUrl;
}

function checkSystemCDImg(linkUrl){
	 if(null==linkUrl||linkUrl==''){
				linkUrl ="images/noimage.jpg";
		}
		return linkUrl;
}

function resetString(str,l){
	 if(null!=str){
				if(str.length>l){ 
							return str.substring(0,l)+' ...';
				}else {
							return str;
				}
		}
		return '';
}

function checkDataIsOthers(id){
	 var v = $('#'+id).val();
		if(null!=v&&''!=v){
			 v = v.toLowerCase();
				if(null!=v&&v=='others'){
						$('#'+id+'_others').show();
				}else {
						$('#'+id+'_others').hide();
				}
		}
	 
}

function replaceAllData(val,src,rsrc){ 
	while(val.indexOf(src)>=0){
		val = val.replace(src,rsrc);
	}
	return val;	
}

function retrivePrinterUrl(url){
	 return replaceAllData(url,'|','\\');
}

function initSystemFileUrl(fileUrl){
	 var burl = $('#g_baseUrl').val();
		if(burl=='/'){
			 return fileUrl;
		}else {
			 if(fileUrl.indexOf('/')==0){
					fileUrl = burl + fileUrl.substring(1,fileUrl.length);
				}else {
					fileUrl = burl + fileUrl;
				}
				//fileUrl = fileUrl.replace('//','/');
				return fileUrl;
		}
}

function initSystemFileDonwloadUrl(fileId){
	 var fileUrl = "/file/download.action?fileId="+fileId;
	 var burl = $('#g_baseUrl').val();
		if(burl=='/'){
			 return fileUrl;
		}else {
			 if(fileUrl.indexOf('/')==0){
					fileUrl = burl + fileUrl.substring(1,fileUrl.length);
				}else {
					fileUrl = burl + fileUrl;
				}
				//fileUrl = fileUrl.replace('//','/');
				return fileUrl;
		}
}

function autoCreateAliasName(frId,toId){
	 var data = $('#'+frId).val();
	 if(null!=data){
			while(data.indexOf(' ')>=0){
				data = data.replace(' ','_');
			}	
			$('#'+toId).val(data.toLowerCase());
		}
}

function loadingCustScripts(array,callback){  
	var loader = function(src,handler){  
		var script = document.createElement("script");  
		script.src = src;
		script.onload = script.onreadystatechange = function(){  
				script.onreadystatechange = script.onload = null;  
				if(/MSIE ([6-9]+\.\d+);/.test(navigator.userAgent))window.setTimeout(function(){handler();},10,this);  
				else handler();  
		};  
		var head = document.getElementsByTagName("head")[0];  
		(head || document.body).appendChild(script);  
	};  
	(function(){  
		if(array.length!=0){  
			loader(array.shift(),arguments.callee);  
		}else{  
			callback && callback();  
		}  
	})();  
}  

//<a href="javascript:setHomePage();" class="button blue">设为首页</a>
function setHomePage(obj,vrl){
		try{ obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl); }
		catch(e){
			if(window.netscape) {
				try { netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  }  
				catch (e) { 
					alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'");
				}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage',vrl);
			}
		}
}
//<a href="javascript:addFavoritePage('http://download.keqie.com','渴切-开源中文css框架');">加入收藏</a>

/**
 * addFavoritePage
 * @params sURL
 * @params sTitle
 */
function addFavoritePage(sURL, sTitle)
{
		try { window.external.addFavorite(sURL, sTitle); }
		catch (e)
		{
				try { window.sidebar.addPanel(sTitle, sURL, ""); }
				catch (e) {
								alert("加入收藏失败，请使用Ctrl+D进行添加");
				}
		}
}

function setElementScrollToButtom(id){ 
	document.getElementById(id).scrollTop = document.getElementById(id).scrollHeight - $('#'+id).height();
}

function getWebSiteLocation(){
	return location.protocol + "//" + location.host
}

/**
 * refresh Current Page
 */
function refreshCurrPage(){
		var href = location.href;
		if(href.indexOf('#')>0){
				href= href.substring(0, href.indexOf("#"));
		}
		window.location.href = href;
}

//yyyy-MM-dd
function caculateDays(start,end){ 
		if(start==null||start.length==0||end==null||end.length==0){ 
						return 0; 
		}
		var arr=start.split("-");  
		var starttime=new Date(arr[0],parseInt(arr[1]-1),arr[2]);  
		var starttimes=starttime.getTime(); 
			
		var arrs=end.split("-");  
		var endtime=new Date(arrs[0],parseInt(arrs[1]-1),arrs[2]);  
		var endtimes=endtime.getTime(); 
			
		var intervalTime = endtimes-starttimes;//两个日期相差的毫秒数 一天86400000毫秒 
		var Inter_Days = ((intervalTime).toFixed(2)/86400000)+1;//加1，是让同一天的两个日期返回一天 
			
		return Inter_Days; 
} 

function changeDateAddMonth(date,number) {
  date.setMonth(date.getMonth() + number);
  return date;
}

function getStringDateOffDays(date, days, format) {
		if (null == format || format === undefined) {
						format = 'YYYY-MM-DD';
		}
		var currDate = moment(date);
		return currDate.subtract(days, 'days').format(format);
};

function getMonthStartDate(date) { 
		var currDate = moment(date);
		return currDate.format('YYYY-MM')+'-01';
};

function getMonthEndDate(date) { 
		var currDate = moment(date); 
		return currDate.subtract(-1, 'months').format('YYYY-MM')+'-01';
};

//获取登录成功的域名
function getHostName(){
	var hostName='';
		hostName=window.location.hostname;
	return hostName;
}

function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg);  
	if (r!=null) return unescape(r[2]); 
	return null; 
}

/**
 * 重置页面所有id
 */
var idReset=function(el){
	console.time('重置id时间');
	var random=new Date().getTime();
	$('#'+el).find('*').each(function(){
		var attr_id = $(this).attr("id");
		if(attr_id!== undefined){
			$(this).attr("id", attr_id+random);
		}
	})
	$('#'+el).attr("id", el+random);
	console.timeEnd('重置id时间')
}