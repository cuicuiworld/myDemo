var events = require('events');

var eventsEmitter = new events.EventEmitter();

//EventEmitter在实例化中如果发生错误，会触发error事件。
//当添加到新的事件时，newListener事件就会触发
//当事件被移除时，removeListener事件就会移除

eventsEmitter.on('some_event',function() {
	console.log('some_event 事件触发');
})

setTimeout(function(){
	eventsEmitter.emit('some_event');
}, 1000);