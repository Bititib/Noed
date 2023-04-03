## events模块
Node中的核心API都是基于异步事件驱动:
 - 在这个体系中，某些对象发出某个事件
 - 可以监听这个事件回调函数
 
发出事件和监听事件都是通过EventEmitter类来完成，都属于events对象
 - emitter.on(eventName,listener):监听事件 —— —— addListener
 - emitter.off(eventName,listener):移除事件监听 —— —— removeListener
 - emitter.emit(eventName,[...args]):发出事件，可以携带一些参数

```js
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

// 延迟触发监听事件、传参
setTimeout(()=>{
    emitter.emit('why','Lilith','27')
},2000)

// 取消监听事件
emitter.off('why',handleWhyfn)
```

## 其他常见的方法
- emitter.eventNames();返回当前EventEmitter对象注册的时间字符串数组;
- emitter.getMaxListeners();返回当前EventEmitter对象的最大监听器数量，可以通过setMaxListeners()来修改，默认是10;
- emitter.ListenerCount(事件名称) 返回当前EventEmitter对象某一个事件名称，监听的个数;
- emitter.listeners(事件名称) 返回当前EvenEmitter对象某个事件监听器上所有的监听数组;