function getNumber(){
	var pro = new Promise(function(resolve,reject){
		var num = Math.ceil(Math.random()*10);
		if(num<5){
			resolve(num);
		}else{
			reject('数字太大了');
		}
	});
	return pro;
}
getNumber()
.then(
	function(data){
		console.log(data);
	},
	function(reason,data){
		console.log(reason);
		console.log(data);
	}
)
//这种方法也可以，reason一样
/*.catch(function(reason){
    console.log('rejected');
    console.log(reason);
});*/


var premise = ' 1 + 1 == 2 || 0.5 + 0.5 == 1 ';
believeAndDoPromise(premise)
	.then(
		function(result){
			console.log(result);
			var wish = 'For all who believe in love, Wish all lovers can be together forever!';
			return wish;
		}
	)
	.then(
		function(wish){
			console.log(wish);
		}
	)
	.catch(function(reason){
	    throw new Error( reason );
	});
function believeAndDoPromise( premise ){
	var promise = new Promise(function(resolve,reject){
		if( premise != '' ){
			resolve('Love is I accompany you to the last');
		}else{
			reject("You thought you thought it wasn't what you thought it was");
		}
	});
	return promise;
}