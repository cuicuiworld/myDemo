/**
 * race
 * 
 * @returns {Promise}
 */
function requestImg() {
	var pro = new Promise(function(resolve, reject) {
		var img = new Image();
		img.onload = function() {
			resolve(img);
		}
		img.src = 'XXXX';
	})
	return pro;
}

function timeout() {
	var pro = new Promise(function(resolve, reject) {
		setTimeout(function() {
			reject('图片请求超时');
		}, 5000)
	})
	return pro;
}

Promise.race([ requestImg(), timeout() ]).then(function(data) {
	console.log(data);
}, function(reason) {
	console.log(reason);
})