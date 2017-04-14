/**
 * 冒泡排序
 * 分两种：从小往大冒泡和从大往小冒泡
 * 下面是几种写法
 * */

var times = 0;
var time = 0;
function exchange1(array, i, j){
	var t = array[i];
	array[i] = array[j];
	array[j] = t;
}
function reSort1(numbers){
	for(var i = 0; i<numbers.length; i++){
		for(var j=0; j<numbers.length-i; j++){
			if(numbers[j] > numbers[j+1]){
				exchange1(numbers,j,j+1);
			}
		}
		console.log("第"+(++times)+"次排序后："+numbers);  
	}
	return numbers;
}

function reSort2(numbers){
	for(var i = 0; i<numbers.length-1; i++){
		for(var j=i+1; j<numbers.length; j++){
			if(numbers[i] > numbers[j]){
				exchange1(numbers,i,j);
			}
		}
		console.log("第"+(++time)+"次排序后："+numbers);  
	}
	return numbers;
}
var nums = [2,3,4,3,1,5,7,122,341,-1];
console.log(reSort1(nums));
console.log(reSort2(nums));


