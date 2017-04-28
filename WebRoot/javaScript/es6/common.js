
/**
 * 键值是字符串的map转为对象
 * @param strMap
 * @returns
 */
function strMapToObj(strMap) {
	var obj = Object.create(null);
	for(let [k,v] of strMap){
		obj[k] = v;
	}
	return obj;
}

/**
 * 键值是字符串的对象转成map
 * @param obj
 * @returns {Map}
 */
function objToStrMap(obj) {
	var strMap = new Map();
	for(let k of Object.keys(obj)){
		strMap.set(k,obj[k]);
	}
	return strMap;
}

/**
 * Map键名是字符串，直接转换成对象json
 * 转换时先要将Map转换成对象，再有对象转换成json
 * @param strMap
 * @returns
 */
function strMapToJson(strMap) {
	return JSON.stringify(strMapToObj(strMap));
}

/**
 * Map转换成数组JSON
 * @param map
 * @returns
 */
function mapToArrayJson(map) {
	return JSON.stringify([...map]);
}


