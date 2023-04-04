## Stream
创建可读流
用来分批获取数据,记录数据,截取数据等一系列用来标记数据的操作：

>格式:
```js
const readStream = fs.createReadStream(path,{
    // 起始下标
    start:num,
    // 结束下标
    end:num,
    // 每次的输出的步长，
    highWaterMark:num
})

```
> 创建可读流
```js
const readStream = fs.createReadStream('aa.txt',{
    start:3,
    end:10,
})
readStream.on('data',(data)=>{
    console.log(data.toString());
})
```
> 设置可读流的传输
```js
const readStream = fs.createReadStream('aa.txt',{
    start:3,
    end:10,
    // 步长，每次获取的个数
    highWaterMark:2
})
readStream.on('data',(data)=>{
    console.log(data)
})
```

> 暂停可读流 —— pause
```js
const readStream = fs.createReadStream('ad.txt',{
    start:3,
    end:10,
    highWaterMark:2
})
readStream.on('data',(data)=>{
    console.log(data)
    readStream.pause()//此处暂停
})
```
>恢复可读流 —— resume
```js
const readStream = fs.createReadStream('ad.txt',{
    start:3,
    end:10,
    highWaterMark:2
})
readStream.on('data',(data)=>{
    console.log(data)
    readStream.pause()//此处暂停
    // 在两秒后恢复可读流
     setInterval(()=>{
        // 恢复可读操作
        readStream.resume()
    },2000)
})
```

> 写入流 —— writeStream
```js
 const writeStream = fs.createWriteStream(path,{...agres})
 writeStream.write('content',callback)
```
创建写入流
```js
const writeStream = fs.createWriteStream('./a.txt',{
    flags:'a',// 以什么方式写入
    start: 2 , // 开始写入的起始位置
})
// 写入内容
writeStream.write('我来学node中的Stream了')
```
判断是否写入成功
```js
const writeStream = fs.createWriteStream('./a.txt',{
    flags:'a',// 以什么方式写入
    start: 2 , // 开始写入的起始位置
})
// 写入内容
writeStream.write('我来学node中的Stream了',(err)=>{
    if(err){
        console.log('写入失败')
    }
    console.log('写入成功')
})
```

> 关闭可读流
写入文件是不会自动关闭的
```js
// 1、close方法
writeStream.close()
// 2、end方法，将内容写进文件,并关闭文件
writeStream.end('jj')
```
> 监听文件是否打开
```js
writeStream.on('open',(fd)=>{
    console.log('文件被打开'+fd);
})
```
 
> Pipe方法

Pipe方法类似于管道，能使可读文件读取的内容直接追加到可写流中，俗称复制(copy)

```js
 readStream.pipe(writeStream) 
```