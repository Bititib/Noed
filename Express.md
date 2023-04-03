## Express
Express是Node中流行的Web服务器框架；可以通过一些实用的工具和中间件来扩展功能；
Express框架的核心就是中间件。学Express就是学中间件
### Express — 基本使用

> 使用express的两种方式
 - 1、通过express提供脚手架，直接创建一个应用的骨架;安装express-generator
    脚手架安装
    > npm install -g express-generator
    创建项目
    > express express-demo
    安装依赖
    > npm install
    启动项目
    > node bin/www

 - 2、从零搭建自己的express应用结构;
    初始化项目
    npm install -y
    下载express
    npm insrall express
 
> 基本使用过程
```js
// 导入express
const express = require('express')

// 创建服务器
const app = express();

//  /的get请求处理
app.get('/',(req,res)=>{
    res.end("Hello Get")
})
// /login的post请求处理
app.post("/login",(req,res)=>{
    res.end('Hello Post')
})

// 开启监听
app.listen(8000,()=>{
    console.log('服务器已开启~');
})
```
使用express的好处:可以将请求进行分离;方便维护、扩展；

### 中间件(MIddleWare)的使用
Express是一个路由和中间件的Web框架，本身功能少，本质上是一系列中间件函数的调用
中间件的本质是传递给express的一个回调函数:这个回调函数接受三参数
- 请求对象(request对象)
- 响应对象(response对象)
- next函数(在express中定义的用于执行下一个中间件的函数)
> app.post('/login',(req,res,next)=>{})

中间件 —— 回调函数的特性
- 1、可以执行任意代码
- 2、可以修改request中的数据
- 3、可以结束响应周期;结束的方式有
    - res.end()
    - res.json()
- 4、执行下一个中间件(回调函数)
    - 注册中间件:
        > app.use((req,res)=>{ console.log('下一个中间健') })
    - next()

*** 注意 *** 如果当前中间件功能没有结束请求 - 响应周期，则需要调用next()控制权传递给下一个中间件功能，否则，请求将被挂起

#### Express提供的中间件注册方式
注册中间件常用的两种方式
- app.use()
- router.use()
其他
- app/router.methods;   Get、Post
 
注册中间件

```js
const express = require('express');
const app = express();

// 1、最简单且最普通的中间件注册方式 —— app.ues()
// 通过use()注册的中间件是全局的，无论在那个请求/路径下都能触发
app.use((req,res,next)=>{
    console.log('node express middleware')
    // res.end() || next()
})

// 2、path匹配中间件,不会对请求方式进行限制,限制路径
app.use('/login',(req,res,next)=>{
    console.log('path express middleware')
    // res.end() || next()
})

// 3、path和method匹配中间件 —— app.method(path,middleware)
app.get('/home',(req,res,next)=>{
    console.log('/home');
    res.end('middleware path /home')
});
app.post('/login',(req,res,next)=>{
    console.log('/login');
    res.end('middleware path /login')
})

// 4、注册多个中间件 —— app.method(path,middleware1,middleware2,middleware3,……)
app.get('/home',(req,res,next)=>{
    console.log('middleware 1');
    next()
},(req,res,next)=>{
    console.log('middleware 2');
    next()
},(req,res,next)=>{
    console.log('middleware 3');
    next()
},(req,res,next)=>{
    console.log('middleware 4');
    res.end('four middleware')
})


app.listen(9000,()=>{
    console.log('express服务启动成功~')
})
```
#### 中间件练习
> 实现登录/注册
```js

const express = require('express');
const app = express();

// 注册中间件
// 1、自己手动创建
app.use((req,res,next)=>{
    if(req.headers['content-type'] === 'application/json'){
        req.on('data',(data)=>{
            const jsonInfo = JSON.parse(data.toString())
            req.body = jsonInfo
        })
        req.on('end',()=>{
            next()
        })
    }else{
        next()
    }
})

// 2、通过使用express提供的中间件express.json()
app.use(express.json())


app.post('/login',(req,res,next)=>{
    // 直接接收数据 —— 做逻辑判断
    console.log(req.body)
})
app.post('/register',(req,res,next)=>{
    // 接收数据查询数据库
    console.log(req.body)
})

app.listen(8888,()=>{
    console.log('服务器~~~');
})

```

#### express解析 x-www-form-urlencoded 数据
> 解析 x-www-form-urlencoded 数据
```js
app.use(express.urlencoded({
    extended:true;//不在使用内置的queryString,而是使用qs第三方库
})) // 解析客户端传递过来的x-www-form-urlencoded 数据
app.post('/login',(req,res,next)=>{
    console.log(req.body);
    res.end('欢迎回来~')
})
```

#### express —— 请求日志记录

安装第三方库 —— morgan
> npm install morgan
```js
const fs = require('fs')
const express = require('express')
const morgan = require('morgan')

const app = express()
// 创建写入流
const writeStream = fs.createWriteStream('./logs/access.log')
// 日志生产后执行writeSteam
app.use(morgan('combined',{stream:writeStream}))
app.use(express.json())
app.post('/login',(req,res,next)=>{
    console.log(req.body);
    res.end('登录成功~')
})

app.listen(9000,()=>{
    console.log('开启服务~~~');
})
```

#### 处理文件上传 —— multer
> Multer是一个node.js处理的中间件multipart/form-data，主要用于上传文件。它写在 busboy之上以实现最高效率。

> ```**注意**```：Multer 不会处理任何不是多部分 ( multipart/form-data) 的表单。

**用法**
```
Multer 向对象添加一个body对象和一个file或files对象request。该body对象包含表单文本字段的值，file或files对象包含通过表单上传的文件。

处理纯文本多部分表单，您应该使用以下.none()方法：

解析如何参数应该使用.any()方法
```


安装第三方库 multer
> npm install multer

客户端准备
> 发起请求的数据格式为from-data,

服务端 
```js
const express = require('express');
const app = express();
const multer = require('multer')

// 利用express提供的第三方中间件 multer 处理文件
// 1、dest 只能指定存储的位置，能够自动创建目录，不能自定义
const upload = multer({
     dest:'./uploads'
})
// 2、storage 能够指定存储的位置，能够自定义文件名称，不能自动创建目录
const upload = multer({
     storage:multer.diskStorage({
        destination(req,file,callback){
            callback(null,'./uploads')
        },
        filename(req,file,callback){
            // originalname 传递过来是文件的名称
            callback(null, Date.now() + '_' + file.originalname)
        }
    })
})

// 单文件上传
app.post('/avatar', upload.single('avatar') ,(req,res,next)=>{
    console.log(req.file);
    res.end('文件上传成功')
})
// 多文件上传 array(filename,maxlength)
app.post('/photos',upload.array('photos'),(req,res,next)=>{
    console.log(req.files);
    res.end('多文件上传')
})

app.listen(9000,()=>{
    console.log('文件上传服务器~');
})
```

### 请求和响应
请求参数 params query  ···

响应数据的方式:
- res.end()
- res.json() 主流方式:
    - json中科院传入很多类型:object、array、string、boolear、number、null等，会被转化为json格式返回数据
- res.status();设置状态码

### 路由和使用

一个router对象是中间件和路由的独立实例，可视为一个“ 迷你应用程序 ”，只能执行中间件和路由功能。每个 Express 应用程序都有一个内置的应用程序路由器。

路由器的行为类似于中间件本身，因此您可以将其用作app.use()的参数 或另一个路由器的use()方法的参数。

> const router = express.Router([options])

可选options参数指定路由器的行为。

Property	Description 	Default 	
caseSensitive	区分大小写	 默认禁用，将“/Foo”和“/foo”视为相同
mergeParams 	保留req.params父路由器的值。如果父项和子项的参数名称冲突，则子项的值优先。 	false
strict 	  启用严格路由 	 默认情况下禁用，“/foo”和“/foo/”被路由器视为相同。

> 可以将中间件和 HTTP 方法路由（例如get、put、post等）添加到router应用程序中。

```js
const express = require('express');

const app = express()
// 定义路由接口
const userRouter = express.Router()
userRouter.get('/',(req,res,next)=>{})
userRouter.post('/',(req,res,next)=>{})
// 让路由生效
app.use('/users',userRouter)

app.listen(9000,()=>{
    console.log('启动服务器~');
})
```

### 静态资源部署

> express.static('path',[options])

```js
const express = require('express');

const app = express()

app.use(express.static('./aploads'))

app.listen(9000,()=>{
    console.log('启动服务器~');
})
```

### 错误处理
> 错误处理: 当客户端发起的请求发生错误是，响应的数据进行错误提醒;

错误的code应为-1001；正确的为200 或者 0

以下是登录接口模拟数据请求：

```js
// 普通写法
const express = require('express');

const app = express()
app.use(express.json())
app.post('/login',(req,res,next)=>{
    let {username, password} = req.body;
    
    // 判断用户名和密码
    if(!username || !password){
        res.json({
            code:-1001,
            message:'没有该用户'
        })
    }else if(username !== 'Bitin' && password !== '123456'){
        res.json({
            code:-1002,
            message:"用户名或密码错误"
        })
    }else{
        res.json({
            code:0,
            message:"登录成功,欢迎回来",
            token:"2314cafa5431"
        })
    }
})

app.listen(9000,()=>{
    console.log('启动服务器~');
})
```
<!-- 2 -->
```js
// 使用错误处理中间件
const express = require('express');

const app = express()
app.use(express.json())
app.post('/login',(req,res,next)=>{
    let {username, password} = req.body;
    
    // 判断用户名和密码
    if(!username || !password){
       next(-1001)
    }else if(username !== 'Bitin' && password !== '123456'){
       next(-1002)
    }else{
        res.json({
            code:0,
            message:"登录成功,欢迎回来",
            token:"2314cafa5431"
        })
    }
})

// 注册错误消息处理中间件
app.use((errCode,req,res,next)=>{
    const code = errCode
    let message = '未知的错误信息'
    
    switch(code){
        case:-1001:
            message = '请输入用户名或密码'
            break
        case:-1002:
            message = '输入用户名或密码错误'
            break
    }
    res.json({code,message})
})

app.listen(9000,()=>{
    console.log('启动服务器~');
})
```
