function createAudio(url) {
	var audioElm = document.createElement('audio'), 
		source;
	if (isArray(url) && url.length > 0) {
		for (var i = 0; i < url.length; i++) {
			source = document.createElement('source');
			source.src = url[i];
			source.type = 'audio/' + getExtension(url[i]);
			audioElm.appendChild(source);
		}
	} else {
		audioElm.src = url;
	}
	
	function isArray(value) {
		return Object.prototype.toString.call(value) === '[object Array]';
	}
	function getExtension(file_name) {
		return file_name.match(/\.([^\.]+)$/)[1];
	}
	
	return audioElm;
}
