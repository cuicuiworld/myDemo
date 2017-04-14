/**
 * 给数组简单封装
 * */
function OperateArray(array){
	this.array = array;
}
OperateArray.prototype = {
	hasValue:function(val){
		for(var i = 0; i<this.array.length; i++){
			if(this.array[i] == val){
				return i;
			}
		}
		return -1;
	},
	removeValue:function(val){
		var index = this.array.indexOf(val);
		if(index>-1){
			this.array.splice(index,1);
			return this.array;
		}
	}
}

//测试
var arr1 = [1,2,3];
var newArr = new OperateArray(arr1);
if(newArr.hasValue(3)>0){
	var resultArr = newArr.removeValue(3);
	console.log(resultArr);
}
