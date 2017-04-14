/**
 * Promise
 * @returns {Promise}
 */
function asyncPro(){
	var pro = new Promise(function(resolve, reject){
		setTimeout(function(){
			console.log('加载完成');
			resolve('NEXT');
		},1000)
	})
	return pro;
}
asyncPro()
.then(
	function(data){
		console.log(data);
		return {
			name:'zhangsan',
			sex:'MEN'
		}
	}
)
.then(
	function(data){
		console.log(data);
	}
)
		
