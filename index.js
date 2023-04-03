// events模块中的时间总线
const EventEmitter = require('events');

// 创建EventEmitter的实例
const emitter = new EventEmitter()

// 回调函数
function handleWhyfn(name,agrment){
    console.log('监听why事件',name,agrment)

}
// 监听事件
emitter.on('why',handleWhyfn);

// 发射/触发监听事件
emitter.emit('why')

// 延迟触发监听事件
setTimeout(()=>{
    emitter.emit('why','Lilith','27')
},2000)

// 取消监听事件
emitter.off('why',handleWhyfn)