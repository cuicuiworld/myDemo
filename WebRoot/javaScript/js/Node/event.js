var events = require('events');

var emitter = new events.EventEmitter();

emitter.on('some_event', function(arg1, arg2) {
	console.log('listener01', arg1, arg2);
})

emitter.on('some_event', function(arg1, arg2) {
	console.log('listener02', arg1, arg2);
})

emitter.emit('some_event','参数1', '参数2');