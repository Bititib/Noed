const koa = require('koa');
const KoaRouter = require('@koa/router');
const koaSession = require('koa-session')

const app = new koa()

const userRouter = new KoaRouter({prefix:'/users'})
// 创建session
const session = koaSession({
    key:'sessionid',
    signed:true // 加密
},app)

// 如果加密 signed 为 true的话，需要进行加盐
app.keys = ['aaa','bbb','ccc']  // 前端需要将两个都放回才能取到值
app.use(session)

userRouter.get('/',(ctx,next)=>{
    // 在服务端为登录的客户端，设置一个cookie
    ctx.session.token = 'itoo'
    ctx.body = '登录成功'
})

userRouter.get('/list',(ctx,next)=>{
    // 验证用户登录凭证，携带的token值 itoo
    const value = ctx.session.token  
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
