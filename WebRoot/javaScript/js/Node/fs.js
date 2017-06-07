var fs = require('fs');

//fs.readFile异步函数读取文件
fs.readFile('descriptions.txt', function(error, data) {
	if(error) return console.log(error.stack);
	console.log(data);
})

console.log("程序执行结束!");

