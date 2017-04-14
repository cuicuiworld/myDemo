/**
 * all  执行多个异步操作
 * race 执行多个异步操作-赛跑
 * @returns {Promise}
 */


function proAsync01(){
	var pro = new Promise(function(resolve, reject){
		setTimeout(function(){
			console.log('加载完成01');
			resolve('NEXT01')
		},2000)
	})
	return pro;
}
function proAsync02(){
	var pro = new Promise(function(resolve, reject){
		setTimeout(function(){
			console.log('加载完成02');
			resolve('NEXT02')
		},1000)
	})
	return pro;
}
function proAsync03(){
	var pro = new Promise(function(resolve, reject){
		setTimeout(function(){
			console.log('加载完成03');
			resolve('NEXT03')
		},1000)
	})
	return pro;
}
Promise
.all([proAsync01(),proAsync02(),proAsync03()])
.then(function(res){
	console.log(res);
})

Promise
.race([proAsync01(),proAsync02(),proAsync03()])
.then(function(res){
	console.log(res);
})

