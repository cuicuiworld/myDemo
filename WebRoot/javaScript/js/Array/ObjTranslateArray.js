/**
	@fn toArray(obj)
	
	@param obj对象，格式为 {h, d}, h/d分别是一个数组，表示一张表的表头字段与内容。
	@return 一个数组，每一项为一个对象。

示例：
	var obj = {
		h: ["id", "name"], 
		d: [ [100, "Tom"], [101, "Jane"] ] 
	};
	var arr = toArray(obj); 

结果为

	arr = [
		{id: 100, name: "Tom"},
		{id: 101, name: "Jane"} 
	];
*/

/**
	@fn toArrayByKey(obj, key)
	
	@param obj对象，格式为 {h, d}, h/d分别是一个数组，表示一张表的表头字段与内容。
	@return 一个对象，内容是键值对。

示例：
	var obj = {
		h: ["id", "name", "region"],
		d: [
			[100, "wang", "shanghai"],
			[101, "huang", "beijing"],
			[102, "zhang", "beijing"],
			[103, "li", "shanghai"],
		]
	}
	function toArrayByKey(obj, key){
		var keys = key || '';
		var tanArr = [];
		for(var i in obj){
			tanArr = obj[i];
		}
		var keyArr = tanArr[0];
		var valArr = tanArr[1];
		var map = {};
		
		for(var i=0; i<valArr.length; i++){
			if(map[ valArr[i][keys] ] == null){
				map[ valArr[i][keys] ] = [];
			}
			
			var json = {};
			for(var j = 0; j<keyArr.length; j++){
				json[ keyArr[j] ] = valArr[i][j]
			}
			map[valArr[i][keys]].push(json);
		}
		return map;
	}
	var pk_i=2;
	var arr=obj.d;
	var map={};
	for(var i=0;i<arr.length;i++){
		if(map[arr[i][pk_i]]==null){
			map[arr[i][pk_i]]=[];
		}
		var json={}
		for(var j=0;j<obj.h.length;j++){
		json[obj.h[j]]=arr[i][j]
		}
		map[arr[i][pk_i]].push(json); 
	}
	
	var pk_i=2;
	var arr=obj.d;
	var map={};
	for(var i=0;i<arr.length;i++){
		if(map[arr[i][pk_i]]==null){
			map[arr[i][pk_i]]=[];
		}
		var json={}
		for(var j=0;j<obj.h.length;j++){
			json[obj.h[j]]=arr[i][j]
		}
		map[arr[i][pk_i]].push(json); 
	}
	
	
	"{"shanghai":[{"id":100,"name":"wang","region":"shanghai"},{"id":103,"name":"li","region":"shanghai"}],
	"beijing":[{"id":101,"name":"huang","region":"beijing"},{"id":102,"name":"zhang","region":"beijing"}]}"
结果为:
	
	var hash = toArrayByKey(obj, "id");  
	hash = {
		100: [{id: 100, name: "wang", region: "shanghai"}],
		101: [{id: 101, name: "huang", region: "beijing"}],
		102: [{id: 102, name: "zhang", region: "beijing"}],
		103: [{id: 103, name: "li", region: "shanghai"}]
	}
	
	var hash = toArrayByKey(obj, "id");  
	hash = {
		"shanghai": [
			{id: 100, name: "wang", region: "shanghai"},
			{id: 103, name: "li", region: "shanghai"}
		],
		"beijing": [
			{id: 101, name: "huang", region: "beijing"},
			{id: 102, name: "zhang", region: "beijing"}
		]
	}
	
参数key为"name"，表示将obj对象中"name"字段作为键值，将名字相同的对象组织到同一个"name"字段对象的值数组中。
*/


function toArray(obj) {
	if(typeof obj != 'object') {
		return console.log('入参错误');
	}
	var tanArr=[];
	for(var key in obj) {
		tanArr.push(obj[key])
		console.log(tanArr);
	}

	var keyArr = tanArr[0];		//返回最终数组里面的key值的数组
	var valArr = tanArr[1];		//返回最终数组里面的value值的数组
	var newArr = [];

	$.each(valArr, function(i, v) {
		var obj = {};
		$.each(keyArr, function (j, k) {
			obj[keyArr[j]] = valArr[i][j];
		});
		newArr.push(obj);
	})

	return newArr;
}

var pk_i=2;
var arr=obj.d;
var map={};
for(var i=0;i<arr.length;i++){
	if(map[arr[i][pk_i]]==null){
		map[arr[i][pk_i]]=[];
	}
	var json={}
	for(var j=0;j<obj.h.length;j++){
	json[obj.h[j]]=arr[i][j]
	}
	map[arr[i][pk_i]].push(json); 
}

function toArrayByKey(obj, key) {
	var keywords = key || '';

	if(typeof obj != 'object') {
		return console.log('入参错误');
	}
	
	var tanArr=[];
	for(var i in obj) {
		tanArr.push(obj[i])
		console.log(tanArr);
	}

	var keyArr = tanArr[0];		//返回最终数组里面的key值的数组	["id", "name"],
	var valArr = tanArr[1];		//返回最终数组里面的value值的数组	[ [100, "Tom"], [101, "Jane"], [102, "Tom"] ]
	var map = {};

	for(var i=0;i<valArr.length;i++){
		var json={}
		for(var j=0;j<keyArr.length; j++){
			json[ keyArr[j] ] = valArr[i][j];
		}
		if(map[ json[keywords] ] == null){
			map[ json[keywords] ] = [];
		}
		map[ json[keywords] ].push(json);
	};
	
	return map;
}





