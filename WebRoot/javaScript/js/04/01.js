/**
 * 给数组中间添加数组
 * */
function avaerageAdd (){
	var nums = [33,24,689,27,998,450];
	var newElements = ['insert','before'];
	nums.splice.apply(nums,[Math.floor(nums.length)/2, 0].concat(newElements));
	console.log(nums);	//[33,24,689,'insert','before',27,998,450]
	return nums;
}
avaerageAdd();