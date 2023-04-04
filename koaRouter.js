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