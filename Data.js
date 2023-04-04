const Koa = require('koa');
const KoaRouter = require('@koa/router');

const bodyParser = require('koa-bodyparser');
const multer = require('@koa/multer')

const app = new Koa()
// 注册路由对象，添加默认前缀prefix
const userRouter = new KoaRouter( {prefix : '/user'} );

// 使用第三方库解析请求体中body的数据
app.use(bodyParser())
const formParser = multer()

/** 参数解析
 * 1、get: params方式 ———— /:id
 * 2、get：query方式 ———— ?name=why&age=18
 * 3、post：json方式 ———— {'name':'why'}
 * 4、post: x-www-form-urlencoded方式
 * 5、post：form-data
**/

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