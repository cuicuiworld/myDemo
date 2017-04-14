
/**
 * 封装一个ajax
 * @params init 初始化ajax数据
 * @params createXHR 创建一个XMLHttpRequest对象
 * @params params post请求的传参
 * @params callback 回调函数
 * @params get 和post 请求
 * createBy cuicuiworld
 */
var Ajax = {
		init: function(obj){
			var objAdapter = {
					url: '',
					method: 'get',
					data: {},
					success: function(res){},
					complete: function(res){},
					error: function(e){},
					async:true
			}
			
			objAdapter.url = obj.url+'?='+Math.random()+'&null';
			objAdapter.method = obj.method || objAdapter.method;
			objAdapter.data = obj.data || objAdapter.data;
			objAdapter.async = obj.async || objAdapter.async;
			objAdapter.success = obj.success || objAdapter.success;
			objAdapter.complete = obj.complete || objAdapter.complete;
			objAdapter.error = obj.error || objAdapter.error;
			
			return objAdapter;
		},
		createXHR: function(){						//创建一个XMLHttpRequest对象
			if(window.XMLHttpRequest){				//IE7+、Firefox、Opera、Chrome 和Safari
				return new window.XMLHttpRequest();
			}else if(window.ActiveXObject){			//IE6 以及IE6以下
				var versions = ['MSXML2.XMLHttp', 'Microsoft.XMLHTTP'];
				for(var i=0; i<versions.length; i++){
					try{
						return new window.ActiveXObject();
					}catch(e){
						try{
							return new window.ActiveXObject();
						}catch(e){
							throw new error('该浏览器不支持XML对象');
						}
					}
				}
			}else{
				throw new error('该浏览器不支持XML对象');
			}
		},
		params: function(data){
			var arr = [];
			for(var i=0; i<data.length; i++){
				//特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
				arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
			}
			arr.join('&');
		},
		callback: function(obj,res){
			console.log(obj);
			console.log(res);
			if(res.status == 200 ){
				obj.success(res.responseText);
			}else{
				alert('获取数据错误！错误代号：' + res.status + '，错误信息：' + res.statusText);
			}
		},
		ajax: function(obj){
			if(obj.method == 'post'){
				Ajax.post(obj);
			}else{
				Ajax.get(obj);
			}
		},
		post: function(obj){
			var xhr = Ajax.createXHR();
			var option = Ajax.init(obj);
			option.method = 'post';
			if(option.async == true){	 //true表示异步，false表示同步
				//使用异步调用的时候，需要触发readystatechange 事件
				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4 && xhr.status == 200){//判断对象的状态是否交互完成
						Ajax.callback(option,xhr);
					}
				}
			}
			//在使用XHR对象时，必须先调用open()方法，
			//它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
			xhr.open(option.method,option.url,option.async);
			
			//post方式需要自己设置http的请求头，来模仿表单提交。
			//放在open方法之后，send方法之前。
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(option.data)	//post方式将数据放在send()方法里
			if(option.async == false){
				Ajax.callback(option,xhr);
			}
		},
		get:function(obj){
			var xhr = Ajax.createXHR();
			var option = Ajax.init(obj);
			option.method = 'get';
			if(option.async ==true){
				xhr.onreadystatechange = function(){
					if(xhr.status == 200){
						Ajax.callback(obj,xhr);
					}
				}
			}
			//若是GET请求，则将数据加到url后面
//			option.url += option.url.indexOf('?') == -1 ? '?' + option.data : '&' + option.data;
			xhr.open(option.method, option.url, option.async);
			xhr.send(null);
			if(option.async == false){
				Ajax.callback(obj,xhr)
			}
		}
}

//验证接口
Ajax.get({
	url:_global_settings.service.url+'/common/customer',
	method:'get',
	async:true,
	success:function(res){
		console.log(JSON.parse(res));
	},
	error:function(e){
		console.log(e);
	}
})



