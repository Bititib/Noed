## Koa
Koa —— 基于Node.js 平台的下一代web开发框架

### 介绍
Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

### 基本使用
```js
const Koa = require('koa');

// 创建app对象
const app =new Koa()

// 注册中间件
// koa中间件只传递两个参数:ctx/next
// ctx参数封装了req和res
app.use((ctx,next)=>{
    console.log('Koa中间件');
    // koa返回响应数据的方法 ctx.body()
    ctx.body = '数据返回'
})

app.listen(8888,()=>{
    console.log('Koa服务器启动~');
})
```

#### ctx参数解析

ctx: 上下文(context)对象

**ctx** 将req和res封装在一起，作为ctx的属性,表示一次请求的上下文,ctx.request获取请求的对象,ctx.response 获取响应的对象

```js
const Koa = require('koa');

const app =new Koa()

// 注册中间件

app.use((ctx,next)=>{
    // 请求对象
    console.log(ctx.req); // req 是node封装的请求对象
    console.log(ctx.request); // request是Koa自己封装的请求对象
    // 响应对象
    console.log(ctx.response); // response 是Koa封装的响应对象
    console.log(ctx.res); // res 是node封装的响应对象
    // 其他属性
    console.log(ctx.query);
    console.log(ctx.path);
})

app.listen(8888,()=>{
    console.log('Koa服务器启动~');
})
```

### 路由的使用
如果依靠ctx.request.url去手动处理路由，将会写很多处理代码，这时候就需要对应的路由的中间件对路由进行控制，这里介绍一个比较好用的路由中间件@koa/router

下载@koa/router
> npm install @koa/router

```js
const Koa = require('koa');
const KoaRouter = require('@koa/router');

const app = new Koa()

// 注册路由对象，添加默认前缀prefix
const userRouter = new KoaRouter( {prefix : '/user'} );

// 路由对象中注册路由表
userRouter.get('/',(ctx,next)=>{
    ctx.body = '获取该用户数据~~get'
})
userRouter.get('/:id',(ctx,next)=>{
    ctx.body = '获取该用户数据~~get'
})
userRouter.post('/:id',(ctx,next)=>{
    ctx.body = '请求数据~~post'
})
userRouter.delete('/:id',(ctx,next)=>{
    ctx.body = '用户删除成功~~~del'
})
userRouter.put('/:id',(ctx,next)=>{
    ctx.body = 'put~'
})
userRouter.patch('/:id',(ctx,next)=>{
    ctx.body = 'patch有效~~'
})

// 让路由生效
app.use(userRouter.routes())
// 判断请求方式是否正确
app.use(userRouter.allowedMethods())

app.listen(8888,()=>{
    console.log('Koa路由~~~服务器~~~');
})

```

### 参数解析

#### 常见的参数解析
 - 1、get: params ———— /:id
 - 2、get：query ———— ?name=why&age=18
 - 3、post：json ———— {'name':'why'}
 - 4、post: x-www-form-urlencoded
 - 5、post：form-data

#### get请求常见的参数解析

> params & query

```js
const Koa = require('koa');
const KoaRouter = require('@koa/router');

const app = new Koa()
// 注册路由对象，添加默认前缀prefix
const userRouter = new KoaRouter( {prefix : '/user'} );

// 1、params
userRouter.get('/:id',(ctx,next)=>{
    const id = ctx.params.id
    ctx.body = '获取该用户数据~~get~'+ id
})
// 2、query
userRouter.get('/',(ctx,next)=>{
    const id = ctx.query
    ctx.body = '获取该用户信息~~get~'+ JSON.stringify(id)
})

// 让路由生效
app.use(userRouter.routes())
// 判断请求方式是否正确
app.use(userRouter.allowedMethods())

app.listen(8888,()=>{
    console.log('Koa路由~~~服务器~~~');
})
```
#### koa-bodyparser中间件

在koa中没有能够解析json数据的中间件，需要自己安装中间件,

安装
> npm install koa-bodyparser

koa-bodyparser 默认能够解析json 和 x-www-form-urlencoded:
**注意事项:** koa-bodyparser解析的数据在ctx.requset.body中获取

```js
const Koa = require('koa');
const KoaRouter = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const app = new Koa()
// 注册路由对象，添加默认前缀prefix
const userRouter = new KoaRouter( {prefix : '/user'} );

// 使用第三方库解析请求体中body的数据
app.use(bodyParser())
// 3、json ———— 需要安装第三方库 koa-bodyparser的中间件 进行解析
userRouter.post('/json',(ctx,next)=>{
    // 注意事项：从request.body中获取
    const body = ctx.request.body

    console.log(body);
    ctx.body = '请求数据~~post~~' + JSON.stringify(body) 
})

// 4、x-www-formdata-urlencoded
userRouter.post('/json',(ctx,next)=>{
    // 注意事项：从request.body中获取
    const body4 = ctx.request.body
    console.log(body4);
    ctx.body = '请求数据~~post~~' + JSON.stringify(body4) 
})
// 让路由生效
app.use(userRouter.routes())
// 判断请求方式是否正确
app.use(userRouter.allowedMethods())

app.listen(8888,()=>{
    console.log('Koa路由~~~服务器~~~');
})

```

#### koa/multer 中间件
在koa中没有能够解析form-data数据的中间件,需要自己安装

安装
> npm install @koa/multer multer

```js
const Koa = require('koa');
const KoaRouter = require('@koa/router');
const multer = require('@koa/multer')

const app = new Koa()
// 注册路由对象，添加默认前缀prefix
const userRouter = new KoaRouter( {prefix : '/user'} );

// 使用第三方库解析请求体中body的数据
const formParser = multer()
// 5、form-data ———— 需要使用第三方库 koa/multer 来解析form-data数据
userRouter.post('/formdata',formParser.any(),(ctx,next)=>{
    // 注意事项：从request.body中获取
    const body5 = ctx.request.body
    console.log(body5);
    ctx.body = '请求数据~~post~~' + JSON.stringify(body5) 
})

// 让路由生效
app.use(userRouter.routes())
// 判断请求方式是否正确
app.use(userRouter.allowedMethods())

app.listen(8888,()=>{
    console.log('Koa路由~~~服务器~~~');
})
```

### 文件上传
```js
const Koa = require('koa');
const Router = require('@koa/router')
const multer = require('@koa/multer')

const app = new Koa();
const router = new Router( {prefix : '/upload'} );
const upload = multer({
    // dest:'./upload', // 目标文件url
    storage:multer.diskStorage({
        destination(req,res,callback){
            callback(null,'./uploads')
        },
        filename(req,file,callback){
            callback(null,file.originalname)
        }
    })
});

// 单个文件上传
router.post('/',upload.single("avatar"),(ctx,next)=>{
    console.log("ctx.request.file",ctx.request.file);
    console.log("ctx.flie",ctx.file);
    console.log("ctx.requset.body",ctx.request.body);
    ctx.body = '文件上传'
})

// 多个文件上传
router.post('/files',upload.array('avatar'),(ctx,next)=>{
    console.log('ctx.files',ctx.files);
    ctx.body = '多文件上传~~'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8666,()=>{
    console.log('上传文件服务~~~');
})

```

### 静态服务器

> koa并没有内置部署相关的功能,需要使用第三方库:

```js
npm install koa-static
```

部署的过程类似于express
```js
    const Koa = require('koa')
    const static = require('koa-static')
    const app = new Koa();
    app.use(static('./build'));
    app.listen(8000,()=>{
        console.log("静态服务器启动成功")
    })
```

### 响应和错误

#### 数据响应

输出结果:body将响应主题设置为以下其中一种:
- string :字符串数据
- Buffer ：Buffer数据
- Stream ：流数据
- Object || Array ：对象或者数组
- null ：不输出任何内容
- 如果response.status 尚未设置，koa会自动将状态设置为200或者204。

#### 错误处理方案
```js
    userRouter.get('/',(ctx,next)=>{
        const isAuth = true
        if (isAuth) {
            ctx.body = 'user list data~'
        }else{
            // 1
            ctx.body ={
                code:-1003,
                message:" 未授权 "
            }
            // 2
            ctx.app.emit('error',-1003,ctx)
        }
    })

    // 注册error事件
    app.on('error',(code,ctx)=>{
        const errcode = code;
        let message = ''
        switch(errcode){
            case -1001:
                message = "账号或者密码错误"
                break
            case -1002:
                message = "请求参数不正确"
                break
            case -1003:
                message = "未授权"
                break
        }
        const body = { 
            code:errcode,
            message
         }
        
        ctx.body = body
    })
```

### Koa 与 express对比
> all in express ，比较沉重

> Koa需要就引入，比较轻量级

> 中间件操作只有异步的时候有一点区别，源于它们算法的不同