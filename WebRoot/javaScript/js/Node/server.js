var http = require('http');


/*-------------------------------------------------------------------
 * 使用http.createServer创建服务器
 * 
 * 使用http.listen()方法监听端口号
 * 
 * ------------------------------------------------------------------
 */
http.createServer(function(request, response) {
	
	//http状态值 200 : OK
	//内容类型 : text/plain
	
	response.writeHead(200, {'Content-Type': 'text/plain'});
	
	response.end('Hello World\n');
	
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');

