/**
 * 选择排序
 * 选择数组第一个元素，和其他所有元素进行比较，和最小的交换。依次循环
 * */
function exchange(array,i,j){
	var t = array[i];
	array[i] = array[j];
	array[j] = t;
}

function selectSort(numbers){
	for(var i=0; i<numbers.length;i++){
		var min = i;
		for(var j=i+1; j<numbers.length; j++){
			if(numbers[j]<numbers[min]){
				min = j;
				console.log(numbers);
			}
		}
		if(i != min){
			exchange(numbers,i,min);
			console.log(numbers);
		}
	}
	return numbers;
}
var nums = [2,3,4,3,1,5,7,122,341,-1];
console.log(selectSort(nums));