
/**
 * 检查是否是字符串
 * @param s
 * @returns {Boolean}
 */
function isString(s) {
	return typeof s === 'string';
}

/**
 * 检查是否是数值型
 * @param n
 * @returns {Boolean}
 */
function isNumber(n) {
	return typeof n === 'number';
}

/**
 * 检查是否是undefined
 * @param v
 * @returns {Boolean}
 */
function isUndefined(v) {
	return typeof v === 'undefined';
}

/**
 * 获取图片名字，限于普通图片获取
 * @param url
 * @returns
 */
function getImageName(url) {
	return isString(url) ? url.replace(/^.*\//, '').replace(/[\?&#].*$/, '') : '';
}

/**
 * 获取图片宽高
 * @param img
 * @param callback
 * @returns
 */
function getImageSize(img, callback) {
	var newImage;
	
	if(img.naturalWidth){
		return callback(img.naturalWidth, img.naturalHeight);
	}
	
	newImage = document.createElement('img');
	
	newImage.onload = function() {
		return callback(newImage.width, newImage.height);
	}
	
	newImage.src = img.src;
}


/**
 * 倒计时定时器
 * @param obj
 * @param time
 */
function setTimer(obj, time) {
	
	if(time == 0) {
		obj.attr('disabled', false);
		obj.text('获取手机验证码');
		return;
	}else{
		obj.attr('disabled', true);
		obj.text('重新发送('+time+'s)');
		time--;
	}
	//防止用户多次点击
	setTimeout(setTimer(obj, time), 1000);
}

/**
 * 去除空格 
 * @param str
 * 			字符串
 * @param type
 * 			类型
 * 			1-所有空格  2-前后空格  3-前空格 4-后空格
 */
function trim(str,type) {
    switch (type){
        case 1:
        	return str.replace(/\s+/g,"");
        case 2:
        	return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
        	return str.replace(/(^\s*)/g, "");
        case 4:
        	return str.replace(/(\s*$)/g, "");
        default:
        	return str;
    }
}

/**
 * 字母大小写切换
 * 
 * 	type
 *		1:首字母大写   
 *		2：首页母小写
 *		3：大小写转换
 *		4：全部大写
 *		5：全部小写
 *
 *	changeCase('asdasd',1)
 *	Asdasd
 *
 *	https://segmentfault.com/a/1190000010225928
 * */

function changeCase(str,type) {
    function ToggleCase(str) {
        var itemText = ""
        str.split("").forEach(
            function (item) {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                }else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                }else{
                    itemText += item;
                }
            });
        return itemText;
    }
 
    switch (type) {
        case 1:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toUpperCase() + v2.toLowerCase();
            });
        case 2:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toLowerCase() + v2.toUpperCase();
            });
        case 3:
            return ToggleCase(str);
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}

function rsArrary(rs) {
	if(typeof rs != 'object') {
		return console.log('入参错误');
	}
	var tanArr=[];
	for(var key in rs) {
		tanArr.push(rs[key])
		console.log(tanArr);
	}
	var keyArr = tanArr[0];
	var valArr = tanArr[1];
	var newArr = [];
	
	$.each()
}


