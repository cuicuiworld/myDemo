/**
 * splice的用法
 * 删除，插入，替换
 * */

/*
 * 删除
 * 参数有两个
 * 第一个参数是起始点的位置
 * 第二个参数是要删除几个
 * array.splice(index,num)，返回值为删除内容，array为结果值。
 * */
var arr1 = [1,2,3,4,5];
var removeArr = arr1.splice(0,2);
console.log(removeArr);	//返回值为删除内容

/*
 * 插入
 * 参数有三个
 * 第一个参数是插入的位置
 * 第二个参数必须是数字
 * 第三个参数是插入的项
 * array.splice(index,0,insertValue)，返回值为空数组，array值为最终结果值
 * */
var arr2 = [1,2,3,4,5];
var removeArr2 = arr2.splice(1,0,'insert');

console.log(arr2);			//返回一个新的数组，长度改变	[1,'insert',2,3,4,5]
console.log(removeArr2);	//返回空数组

/*
 * 替换
 * 参数有三个
 * 第一个参数是插入的位置
 * 第二个参数必须是删除的项数
 * 第三个参数是插入任意数量的项
 * array.splice(index,num,insertValue)，返回值为空数组，array值为最终结果值
 * */
var arr3 = [1,2,3,4,5];
var removeArr3 = arr3.splice(2,2,'insert');

console.log(arr3);			//返回一个新的数组，长度改变	[1,2,'insert',5]
console.log(removeArr3);	//返回倍替换的数组
