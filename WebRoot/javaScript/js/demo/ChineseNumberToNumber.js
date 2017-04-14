/**
 * 中英文数字的转换
 * 
 * @param digit
 *            简体中文
 * @returns {Number} 英文数字
 * 
 */

function zhDigitToArabic(digit) {
	var zh = [ '零', '一', '二', '三', '四', '五', '六', '七', '八', '九' ];
	var unit = [ '千', '百', '十' ];
	var quot = [ '万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极',
			'恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数' ];
	var result = 0, quotFlag;

	for (var i = digit.length - 1; i >= 0; i--) {
		if (zh.indexOf(digit[i]) > -1) { // 数字
			if (quotFlag) {
				result += quotFlag * getNumber(digit[i]);
			} else {
				result += getNumber(digit[i]);
			}
		} else if (unit.indexOf(digit[i]) > -1) { // 十分位
			if (quotFlag) {
				result += quotFlag * getUnit(digit[i])
						* getNumber(digit[i - 1]);
			} else {
				result += getUnit(digit[i]) * getNumber(digit[i - 1]);
			}
			--i;
		} else if (quot.indexOf(digit[i]) > -1) { // 万分位
			if (unit.indexOf(digit[i - 1]) > -1) {
				if (getNumber(digit[i - 1])) {
					result += getQuot(digit[i]) * getNumber(digit[i - 1]);
				} else {
					result += getQuot(digit[i]) * getUnit(digit[i - 1])
							* getNumber(digit[i - 2]);
					quotFlag = getQuot(digit[i]);
					--i;
				}
			} else {
				result += getQuot(digit[i]) * getNumber(digit[i - 1]);
				quotFlag = getQuot(digit[i]);
			}
			--i;
		}
	}

	return result;

	// 返回中文大写数字对应的阿拉伯数字
	function getNumber(num) {
		for (var i = 0; i < zh.length; i++) {
			if (zh[i] == num) {
				return i;
			}
		}
	}

	// 取单位
	function getUnit(num) {
		for (var i = unit.length; i > 0; i--) {
			if (num == unit[i - 1]) {
				return Math.pow(10, 4 - i);
			}
		}
	}

	// 取分段
	function getQuot(q) {
		for (var i = 0; i < quot.length; i++) {
			if (q == quot[i]) {
				return Math.pow(10, (i + 1) * 4);
			}
		}
	}
}

/**
 * 中英文大小写数字转换
 * 
 * @param num
 *            英文数字
 * @returns {String} 中文大写
 */
function NoToChinese(num) {
	if (!/^\d*(\.\d*)?$/.test(num)) {
		alert("Number is wrong!");
		return "Number is wrong!";
	}
	var AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
	var BB = new Array("", "拾", "佰", "仟", "萬", "億", "点", "");
	var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = "";
	for (var i = a[0].length - 1; i >= 0; i--) {
		switch (k) {
		case 0:
			re = BB[7] + re;
			break;
		case 4:
			if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$")
					.test(a[0]))
				re = BB[4] + re;
			break;
		case 8:
			re = BB[5] + re;
			BB[7] = BB[5];
			k = 0;
			break;
		}
		if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
			re = AA[0] + re;
		if (a[0].charAt(i) != 0)
			re = AA[a[0].charAt(i)] + BB[k % 4] + re;
		k++;
	}

	if (a.length > 1) // 加上小数部分(如果有小数部分)
	{
		re += BB[6];
		for (var i = 0; i < a[1].length; i++)
			re += AA[a[1].charAt(i)];
	}
	return re;
}

/**
 * 中英文大写数字转换
 * 
 * @param n
 *            英文数字
 * @returns   中文数字
 */
function DX(n) {
	if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
		return "数据非法";
	var unit = "千百拾亿千百拾万千百拾元角分", str = "";
	n += "00";
	var p = n.indexOf('.');
	if (p >= 0)
		n = n.substring(0, p) + n.substr(p + 1, 2);
	unit = unit.substr(unit.length - n.length);
	for (var i = 0; i < n.length; i++)
		str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
	return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(
			/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(
			/^元零?|零分/g, "").replace(/元$/g, "元整");
}