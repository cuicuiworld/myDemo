var xmlhttp;
if(window.XMLHttpRequest){
	xmlhttp = new window.XMLHttpRequest();
}
if(window.ActiveVObject){
	xmlhttp = new window.ActiveVObject();
}

/**
 * XMLHttpRequest 标准方法
 */
xmlhttp.open(method,url)					//建立对服务器的调用
xmlhttp.send(data)							//向服务器发送请求，get为null，post为data
xmlhttp.abort()								//停止当前请求
xmlhttp.getAllResponseHeader()				//把http所有响应头作为键值对形式返回
xmlhttp.getResponseHeader()					//返回指定首部
xmlhttp.setRequestHeader(header,value)		//把指定首部设置为所提供的的值

/**
 * XMLHttpRequest 标准属性
 */
xmlhttp.onreadystatechange					//每个状态的改变都会出发这个事件的处理器
xmlhttp.readyState							//请求状态：0未初始化，1，正在加载，2，已加载，3交互中，4完成
xmlhttp.responseText						//服务器的响应，字符串
xmlhttp.responseXML							//服务器的响应,XML
xmlhttp.status								//服务器http状态码
xmlhttp.statusText							//状态码相应文本