## 搭建服务

> 利用node搭建服务器
```js
const http = require('http');
const port = 8080;
const server = http.createServer((request,response)=>{
// request能够获取到来自请求的所有信息，包括url...
// response能够响应数据，将数据返回
response.end('response Data')
})
server.listen(port,()=>{
    console.log('server start')
})
```

> createServer()底层是直接使用new Server对象。
```js
function createServer(opts,requsetListener){
    return new Server(opts,requsetListener)
}
```

> Listen(port,ip,callback)函数的三参数

port:监听的端口
ip:被解析的域名，默认是0.0.0.0
callback:回调函数


> 解析request
```js
    const server = http.createServer((requset,response)=>{
        // 解析请求中的methods url 
        let url = requset.url
        let method = requset.methods
    })
```
> 参数解析 
```js
const url = require('url');
const server = http.createServer((requset,response)=>{
    let urlString = requset.url
    let urlInfo = url.parese(urlString) // 解析出来的是浏览器地址栏中的参数query
    
    // 解析query —— 引入querystring  
})
```
 
> body参数解析
```js
    const url = require('url');
    const server = http.createServer((requset,response)=>{
        // 设置编码
        requset.setEncoding('utf-8')
        // request 本质上是一个可读流，获取数据如
        request.on('data',(data)=>{
            console.log(data)
        });
        requset.on('end',()=>{
            res.end('hello world')
        })
    })
```

### Http Request Header
#### 一
> 设置请求头
```js
const http = require('http');
const url = require('url');
const qs = require('querystring');
// 1、创建服务器
const server = http.createServer((req,res)=>{
    // 请求头信息
    console.log(req.header);
    // content-type
    console.log(req.headter['content-type']) 
})
```
> content-lenght 文件长度

> keep-alive:
> 在http1.0中,如果想要继续保持连接：需要在浏览器请求头中添加 connection: keep-aline；服务器需要在响应中添加 connection：keep-alive；当客户端再次请求时，会使用同一个连接，直接一方中断连接

> 在http1.1中，所有连接默认是 connection:keep-alive的；不同的Web服务器会有不同的保持keep-alive的时间;Node中默认是5s中；

> accept-encoding:告知服务器，客服端支持的文件压缩格式，比如js文件可以使用gzip编码，对应.gz文件

> accept:告知服务器，客户端可接受文件的格式

> user-agent:客户端相关的信息；

#### 二
> 返回响应结果 ：两种方式
- write方法: 这种方式是直接写出数据,但是并没有关闭流；
- end方法：这种方式是写出最后的数据，并且写出后会关闭流
```js
    const url = require('url');
    const server = http.createServer((requset,response)=>{
        // request 本质上是一个可写流，获取数据如
        response.write('tt')
        response.end('hello world')
    })
```
*** 注意 *** : 如果没有关闭流的话，同时没有设置响应时间的话，服务器会一直在发起请求

> 服务端返回的转态码
http状态码(Http State Code)是用来表示Http响应状态的数字代码:
常见的状态码:
- 200 | Ok | 客户端请求成功
- 201 | Created | POST请求,创建新的资源
- 301 | Moved Permanently | 请求成员URL已经修改，响应中会给出新的URL
- 400 | Bad Request | 客户端的错误，服务器无法或者不进行处理
- 401 | Unauthorized |未授权的错误，必须携带请求的身份信息
- 403 | Forbidden | 客户端没有权限访问，被拒绝
- 404 | Not Found | 服务器找不到请求的资源
- 500 | Internal Server Error | 服务器遇到了不知道如何处理的情况
- 503 | service Unavailable | 服务器不可用，可能处理维护或者重载状态，暂时无法访问


> 响应状态码
```js
    const url = require('url');
    const server = http.createServer((requset,response)=>{
    //    方式一
       response.statusCode = 403
    //    方式二
        response.writeHead(401,{
            ....
        })
    })
```

> 响应请求头
```js
    const url = require('url');
    const server = http.createServer((requset,response)=>{
        // 设置header信息：数据的类型以及数据的编码
        // 1、单独设置某一个header编码格式，数据格式
        res.setHeader('Content-Type','application/json;charset=utf-8;')
        // 2、http status code 和 header 一起设置
        res.weiteHead(200,{
            'Content-Type':'application/json;chartset=utf-8;'
        })
    })
```

### Http请求
> 使用Http模块发起网络请求

```js
const http = require('http');
http.get('http://localhost:8080',(res)=>{
    res.on('data',(data)=>{
        const dataString = data.toString()
        const dataInfo = Json.parse(dataString);
        console.log(dataInfo)
    })
})
```
> 使用http发起Post请求
```js
const http = require('http');
// post不能像get那般直接使用，需要通过http.request进行导入,post与服务器建立可读流
const req = http.request({
    method:'POST',
    hostname:'localhost',
    port:8080
},(res)=>{
    const dataString = res.toString();
    const dataInfo = JSON.parse(dataString);
    console.log(dataInfo)
});
// 必须调用end,表示请求结束
req.end()
```

### 文件上传
文件上传的格式通常为from-data

> 错误的处理方式

```js

const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{
    // 创建可写流
    const writeStream = fs.createWriteStream('./flie.png',{
        flags:'a+'
    })

    // 客户端传递的数据是表单数据(请求体)
    req.on('data',(data)=>{
        console.log(data)
        writeStream.Write(data)
    });
    req.on('end',()=>{
        console.log('数据上传完成')
        writeStream.close()
        res.end('文件上传成功')
    })
})

```
*** 注意 *** ： 这样生成的数据会有问题，图片打不开；因为数据是追加的，造成格式错误

> 修改
太复杂不推荐
```js

const http = require('http');
const server = http.createServer((req,res)=>{
    // 设置编码 —— 二进制,进行二次编码
    req.serEncoding('binary');
    // 下标1表示的是文件图片的位置
    const boundary = req.headers['content-type'].split(';')[1].replace('boundary','')
    // 客户端传递的数据是表单数据(请求体)
    req.on('data',(data)=>{
        console.log(data)
    });

    req.on('end',()=>{
        console.log('数据上传完成');
        // 截取上传图片的数据从image/jpeg位置开始，后面的所有数据
        const imageTypePosition = formData.indexOf(imageType) + imageType.length
        let imageDate = fromData.substring(imageTypeposition);
        // 2、imageData开始位置会有两个空格\r\n\r\n
        imageData = imageData.replace(/^\s\s*/,'')
        // 3、替换最后的boundary
        imageDta = imageData.substring(0,imageData.indexOf(`--${boundary}--`));
        // 4、把imageData的数据保存到文件中
        fs.writeFile('./bar.png',imageData,'binary',()=>{
            console.log('文件存储成功')
            resa.end("文件上传成功")
        })

    })
})

```

> 制作当前文件上传的进度
```js 
// 图片文件必须设置为二进制的
const req.setEncoding('binary');
// 获取content-type中的boundory的值
var boundary = req.headers['content-type'].split(';')[1].replace('boundary=','');
// 记录当前数据的信息
const fileSize = req.headers['content-length'];
let curSize = 0;
let body = '';
// 监听当前的数据
req.on("data",(data) => {
    curSize += data.length;
    res.write(`文件上传进度:${curSize/fileSize*100}%\n`);
    body += data
})
```