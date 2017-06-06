var arr = [1, 2 ,3, 4];
arr.forEach(alert);

//相当于
for(var i = 0, len = arr.length; i < len; i++){
	alert(i);
}

/*-----------------------------------------------------------
 *	forEach传递三个参数
 *	第一个是遍历数组的内容
 *	第二个是对应数组的索引
 *	第三个是数组本身
 *
 *	indexOf检测某个指定字符串首次出现位置
 *	如果有这个字符串，则显示出现的索引
 *	如果没有，则为-1
 *
 *	下面的例子就是利用forEach进行数组去重
 *------------------------------------------------------------
 */

var arr = [1,2,3,4,5,5,5,8,7,4,1,2,3,6,10,10,10,'10','10'];

var trimArr = function(arr) {
	var newArr = [];
	arr.forEach(function(v, i, a) {
		if( newArr.indexOf(arr[i]) === -1 ){
			newArr.push(arr[i]);
			console.log(newArr);
		}
		console.log(v);		//遍历的数组的内容
		console.log(i);		//对应数组的索引
		console.log(a);		//数组本身
	})
}

/*-------------------------------------------------------------
 * 区分forEach和$.each和map的三个参数不同
 * 
 * $.each([], function(index, value, array){
 * 
 * })
 * 
 * [].forEach(function(value, index, array){
 * 
 * })
 * 
 * [].map(function(value, index, array){
 * 
 * });
 * ------------------------------------------------------------
 */

//使forEach支持IE9
if(typeof Array.prototype.forEach != 'function'){
	Array.prototype.forEach = function() {}
}





