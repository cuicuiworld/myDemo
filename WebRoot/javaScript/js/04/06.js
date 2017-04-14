/**
 * 快速排序
 * 以某一个元素为中介点,比他小的放左边，比他大的放右边
 * 然后重新对中介各自两边的元素进行比较，重新找中介。如此循环
 * */

function quickSort(arr){
	if(arr.length<=1){
		return arr;
	}
	console.log('原数组是'+arr);
	var pivotIndex = Math.floor(arr.length/2);	//中介点的index索引
	var pivot = arr.splice(pivotIndex,1)[0];	//返回值-中介点
	var left = [];
	var right = [];
	console.log('"将中介提取出来后数组是：'+arr);
	
	for(var i=0; i<arr.length; i++){
		console.log('此刻中介是:'+pivot+',当前元素是:'+arr[i]);
		if(pivot>arr[i]){
			left.push(arr[i]);
			console.log('移动'+arr[i]+'到左边');
		}else{
			right.push(arr[i]);
			console.log('移动'+arr[i]+'到右边');
		}
	}
	return quickSort(left).concat([pivot], quickSort(right));
}

var nums = [2,3,4,3,1,5,7,122,341,-1];
console.log(quickSort(nums));
