/**
 * 模拟构建堆栈
 * */
var Stack = function(){
	this.dataStore = [];
	this.top = 0;
}
Stack.prototype = {
	push:function(el){
		this.dataStore.push(el);
	},
	pop:function(){
		return this.dataStore.pop();
	},
	peek:function(){
		return this.dataStore[this.dataStore.lenght-1];
	},
	length:function(){
		return this.dataStore.length;
	},
	isEmpty:function(){
		return this.dataStore.length ===0;
	},
	seeAll:function(){
		return this.dataStore.jion('\n');
	}
}

/**
 * 测试
 * 利用堆栈原理判断回文
 */
function isRealWord(word){
	var stack = new Stack();
	var reWord = '';
	for(var i=0; i<word.length; i++){
		stack.push(word[i]);
	}
	while(stack.length()>0){
		reWord += stack.pop();
	}
	if(reWord == word){
		console.log(true);
	}else{
		console.log(false);
	}
}
isRealWord('aba');
isRealWord('abac');
