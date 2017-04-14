/**
 * palindrome
 * @param str
 * @returns {Boolean}
 */
function palindrome(str){
	// \W匹配任何非单词字符。等价于“[^A-Za-z0-9_]”。
	var reg = /[\W_]/g;
	
	// 将字符串变成小写字符,并干掉除字母数字外的字符
	var lowRegStr = str.toLowerCase().replace(reg,'');
	
	// 如果字符串lowRegStr的length长度为0时，字符串即是palindrome
	if(lowRegStr.length===0) return true;
	
	// 如果字符串的第一个和最后一个字符不相同，那么字符串就不是palindrome
	if(lowRegStr[0]!=lowRegStr[lowRegStr.length-1]) return false;
	
	//递归
	return palindrome(lowRegStr.slice(1,lowRegStr.length-1));
}

/**
 * unique 数组去重
 * @param arr
 * @returns {Array}
 */
function unique(arr){
	var obj = {}
	var result = []
	for(var i in arr){
		if(!obj[arr[i]]){
			obj[arr[i]] = true;
			result.push(arr[i]);
		}
	}
	return result;
}