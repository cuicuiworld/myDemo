
/**
 * 
 * @param str
 * @returns {Boolean}
 */
function isInteger(str) {
	if (str.length != 0) {
		reg = /^[-+]?\d*$/;
		if (reg.test(str)) {
			return true;
		}
	}
	return false;
}

function isDouble(str)    
{    
    if(str.length!=0){   
	    reg=/^[-\+]?\d+(\.\d+)?$/;   
	    if(reg.test(str)){   
	       return true;
	    }   
    }   
    return false;
}  

/**
 * 检验是否是中文
 * @param str
 * @returns {Boolean}
 */
function isChinese(str)    
{    
    if(str.length!=0){   
	    reg=/^[\u0391-\uFFE5]+$/;   
	    if(reg.test(str)){   
	      return true;
	    }   
    }   
    return false;
}  

/**
 * 检验是否含有中文
 * @param str
 * @returns {Boolean}
 */
function hasChinese(str)    
{    
    if(str.length!=0){   
	    reg=/^[\u0391-\uFFE5]+$/;   
		if(/.*[\u4e00-\u9fa5]+.*$/.test(str)){
			 return true;
		}
    }   
    return false;
}    

function isZIP(str)    
{    
    if(str.length!=0){   
	    reg=/^\d{6}$/;   
	    if(reg.test(str)){   
	      return true;
	    }   
    }   
    return false;
}   

/**
 * isPhoneNumber
 * @param String
 * @returns {Boolean}
 */
function isPhoneNumber(String) {
	var Letters = "1234567890-"; //可以自己增加可输入值
	var i;
	var c;
	if (String.charAt(0) == '-')
		return false;
	if (String.charAt(String.length - 1) == '-')
		return false;
	for (i = 0; i < String.length; i++) {
		c = String.charAt(i);
		if (Letters.indexOf(c) < 0)
			return false;
	}
	return true;
}

/**
 * isEmail
 * @param strEmail
 * @returns {Boolean}
 */
function isEmail(strEmail) {
	if (strEmail
			.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
		return true;
	else
		return false;
}

function isIP(ipStr) {
	var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var reg = ipStr.match(exp);

	if (reg == null) {
		return false;
	} else {
		return true;
	}
}

function isEmpty(s) {
	if ((s == null) || (s.length == 0))
		return true;
	else
		return false;
}

function isImgEmpty(s) {
	if ((s == null) || (s.length == 0)||s=='')
		return true;
	else
		return false;
}


//onkeypress="return isNumberKey(event)"
function isNumberKey(evt)
{
 var charCode = (evt.which) ? evt.which : event.keyCode;
 if (charCode > 31 && (charCode < 48 || charCode > 57))
	return false;

 return true;
}

//onkeypress="return isNumberKey(event)"
function isMnyValKey(evt)
{
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode == 46 || charCode == 110|| charCode == 190) {
	 
	  return true;
  }else {
	  if (charCode > 31 && (charCode < 48 || charCode > 57)){  
	 	 return false;
	  }
	  return true;
  }
}
//onkeydown="onlyNum();"
function onlyNum() {
	if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)))
		//考虑小键盘上的数字键
		window.event.returnvalue = false;
}

function onlyEn() {
	if (!(event.keyCode >= 65 && event.keyCode <= 90))
		window.event.returnvalue = false;
}

function checkInputCount(id,size,msgId){
	var s = $('#'+id).val();
	if(hasChinese(s)){
		size = size/4;
	}
	var len = s.length;
	if(len<=size){
		$('#'+msgId).text(len+'/'+size);
	}else {
		$('#'+id).val(s.substring(0,size));
	}
}

function checkElementDisplay(eobj){
	 var rs = true;
		try{
				if(null!=eobj){
						eobj.parents('div').each(function(){ 
							//alert($(this).attr('id')+' '+$(this).css('display'));
							if($(this).css('display')=='none'){
								 rs = false;
									return rs;
							}
						}); 
						
						eobj.parents('tr').each(function(){ 
							//alert($(this).attr('id')+' '+$(this).css('display'));
							if($(this).css('display')=='none'){
								 rs = false;
									return rs;
							}
						});
				}else {
						rs = false;
				} 
		}catch(e){
			
		}
		return rs;
}

function isEmptyFile(id){
	var files = $('#'+id);
	//alert(files.val());
	if(null==files||files.length<=0||null==files.val()||files.val()==''){
		 return true;
	}else {
		 return false;
	}
}

//form validation
function checkFieldNotEmpty(did,estyle,msg){
	 var val = $('#'+did).val();
		if(isEmpty(val)){
			 //alert(msg);
				$('#'+did+'_msg').text(msg);
			 return false;
		} 
		if(null!=estyle&&estyle!=''){
			 $('#'+did).removeClass(estyle);
		}
		return true;
}

function checkFieldIsInteger(did,estyle,msg){
	 var val = $('#'+did).val();
		if(!isInteger(val)){
			 //alert(msg);
				$('#'+did+'_msg').text(msg);
			 return false;
		}
		if(null!=estyle&&estyle!=''){
			 $('#'+did).removeClass(estyle);
		}
		return true;
}

function checkFieldIsEmail(did,estyle,msg){
	 var val = $('#'+did).val();
		if(!isEmail(val)){
			 //alert(msg);
				$('#'+did+'_msg').text(msg);
			 return false;
		}
		if(null!=estyle&&estyle!=''){
			 $('#'+did).removeClass(estyle);
		}
		return true;
}

function checkFieldIsIP(did,estyle,msg){
	 var val = $('#'+did).val();
		if(!isIP(val)){
			 //alert(msg);
				$('#'+did+'_msg').text(msg);
			 return false;
		}
		if(null!=estyle&&estyle!=''){
			 $('#'+did).removeClass(estyle);
		}
		return true;
}

function checkValExist(v,vlist){
		if(null!=vlist&&''!=vlist){
			 var data = vlist.split(',');
				if(data.length>0){
					 for(var i=0;i<data.length;i++){
							 if(v==data[i]){
									 return true;
								}
						}
				}
		}
		return false;
}

function isChrome(){
	var os = $.client.os; 
	try{
		if(null!=os||os=='Chrome'){
				return true;
		}else {
				return false;
		}
	}catch(e){
		return false;
	}
	
}

/**
 * 是否是英文或数字
 */
function IsEnOrNum(input, commit) {
	if(/[\u4E00-\u9FA5]/g.test(input.val())){
		return false;
	}else{
		return true;
	}
}

/**
 * 判断是否email
 * @param str
 * @returns
 */
function isEmail(str,commit){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
}

/**
 * 是否是数字, 包括整数、小数
 * @param input
 * @param commit
 * @returns {Boolean}
 * 
 * add by qct
 */
function IsNum(input, commit) {
	if(input.val()=='-') return false;
	if(/^(\-?\d*)(\.\d+)?$/g.exec(input.val())) {
		return true;
	}else {
		return false;
	}
}

/**
 *  是否是符合对应的整数位数和小数位数的数字,只能为正数
 * @param maxLengthOfInt 最大整数位数
 * @param maxLengthOfDec 最大小数位数
 * @param input
 * @param commit
 * @returns {Boolean}
 * 
 */
function isPositiveNumWithDecimal(input, maxLengthOfInt, maxLengthOfDec, commit) {
	var pattern = new RegExp('^(\\d{1,'+maxLengthOfInt+'})(\\.\\d{1,'+maxLengthOfDec+'})?$', 'g');
	if(pattern.exec(input.val())){
		return true;
	}else{
		return false;
	}
}

/**
 * 是否是正整数
 */
function IsPositiveInteger(input, commit) {
	var patrn = /^\d*$/;
	if(patrn.exec(input.val())){
		return true;
	}else{
		return false;
	}
}

/**
 * 是否邮政编码-中国6为数字
 */
function isZipCode(input, commit) {
	if(input.val()=="") return true;
	var patrn = /^\d{6}$/;
	if(patrn.exec(input.val())){
		return true;
	}else{
		return false;
	}
}

/**
 * 0到100的正浮点数，小数部分最多保留两位
 */
function IsFloat(input, commit) {
	var patrn = /^([1-9]\d?(\.\d{1,2})?|0\.\d{1,2}|100|100.0|100.00)$/;
	if(patrn.exec(input.val())){
		return true;
	}else{
		return false;
	}
}

/**
 * 是否是电话号码
 * 
 */
function IsMobile(input, commit) {
	var patrn = /^0?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/;
	if(patrn.exec(input.val())){
		return true;
	}else{
		return false;
	}
}
/**
 * 是否相等
 */
function IsEquals(input1, input2) {
	if(input1.val()==input2.val()){
		return true;
	}else{
		return false;
	}
}
/**
 * 中间值
 */
function IsMedian(min,max,n){
	if(min<=n && n<=max){
		return true;
	}else{
		return false;
	}
}
/**
 * 是否超过最大长度
 */
function isBeyondLeng(input,maxLen){
	var str = input.val();
	var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    if(len<=maxLen){
    	return true;
	}else{
		return false;
	}
}

/**
 *  是否是符合对应的整数位数和小数位数的数字
 * @param maxLengthOfInt 最大整数位数
 * @param maxLengthOfDec 最大小数位数
 * @param input
 * @param commit
 * @returns {Boolean}
 * 
 * add by qct 2014.07.21
 */
function isNumWithDecimal(input, maxLengthOfInt, maxLengthOfDec, commit) {
	var pattern = new RegExp('^(\\-?\\d{1,'+maxLengthOfInt+'})(\\.\\d{1,'+maxLengthOfDec+'})?$', 'g');
	if(pattern.exec(input.val())){
		return true;
	}else{
		return false;
	}
}

/**
 * 是否MAC地址
 */
function IsMac(input, commit) {
	var patrn = /[0-9A-Fa-f]{2}-[0-9A-Fa-f]{2}-[0-9A-Fa-f]{2}-[0-9A-Fa-f]{2}-[0-9A-Fa-f]{2}-[0-9A-Fa-f]{2}/;
	if(patrn.exec(input.val())){
		return true;
	}else{
		return false;
	}
}

/**
 *  开始时间不能大于结束时间
 * @param input
 * @param commit
 * @param endtimeSelector
 * @returns {Boolean}
 */
function timeCompare(input, commit, endtimeSelector) {
	if(input.val()===""){
		return true;
	}
	if(!$(endtimeSelector).val() || input.val() <= $(endtimeSelector).val()){
		return true;
	}else{
		return false;
	}
}

/**
 *  结束时间不能小于结束时间
 * @param input
 * @param commit
 * @param endtimeSelector
 * @returns {Boolean}
 */
function timeCompareEnd(input, commit, starttimeSelector) {
	
	if(input.val()===""){
		return true;
	}
	if(!$(starttimeSelector).val() || input.val() >= $(starttimeSelector).val()){
		return true;
	}else{
		return false;
	}
}

/**
 * 是否代码分类
 */
function IsCodeCategory(input, commit) {
	var patrn = /^([A-Z]+_?)*[A-Z]$/;
	if(patrn.exec(input.val())){
		return true;
	}else{
		return false;
	}
}

/**
 * 是否6位码
 */
function IsCouponCode(input, commit) {
	var patrn = /^([a-z]|[A-Z]|[0-9]){6}$/;
	if(patrn.exec(input.val())){
		return true;
	}else{
		return false;
	}
}

/**
 * 是否IP
 */
function IsIP(input) {
	var patrn = /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/;
	if(patrn.exec(input)){
		return true;
	}else{
		return false;
	}
}
/**
 * 非空校验
 * @param s
 */
function isRequired(s){
	if(s===null||s===''){
		return false;
	}else{
		return true;
	}
}
/**
 * 匹配无特殊字符且非空正式表达式
 * @param characters
 * @returns true pass validation,false fails to pass validation
 */
function validateAvoidSpecialCharacters(characters){
	var reg=/^[^`~!@#$%^&*\(\)\[\]{};':",\.\/\<\>\?\ ]+$/;
	return reg.test(characters);
 }

/**
 * 校验长度小于等于len
 * @param s 被校验的字符串 len 长度上限
 */
function validateLessAndEqualThanLength(s,len){
	if(s.length<=len){
		return true;
	}else{
		return false;
	}
}

/**
 * 大写字母加下划线
 * @returns {Boolean}
 */
function isCategoryCode(v){
 
	   var reg=/^[A-Z]+_(([A-Z]+)|(_[A-Z]+))+$/g;
	   if(reg.test(v)){
	 		return true;
	   }else{
	 		return false;
	   }
} 

/**
 * 正则表达式校验
 * @returns {Boolean}
 */
function isMatch(input, commit,reg){
	   if(reg.test(input.val())){
	 		return true;
	   }else{
	 		return false;
	   }
} 