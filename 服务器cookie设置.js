const koa = require('koa');
const KoaRouter = require('@koa/router');

const app = new koa()

const userRouter = new KoaRouter({prefix:'/users'})
userRouter.get('/',(ctx,next)=>{
    // 在服务端为登录的客户端，设置一个cookie
    ctx.cookies.set('token','itoo',{
        maxAge:60*1000 // 设置过期时间
    })

    ctx.body = '登录成功'
})

userRouter.get('/list',(ctx,next)=>{
    // 验证用户登录凭证，携带的token值 itoo
    const value = ctx.cookies.get('token') 
    
    if(value === 'itoo'){
        ctx.body = `user list data ~`
    }else{
        ctx.body = '你的权限不够~,'
    }

    
})

app.use(userRouter.routes()).use(userRouter.allowedMethods())

app.listen(8280,()=>{
    console.log('服务器启动~');
})
