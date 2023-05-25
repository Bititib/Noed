const koa = require('koa');
const KoaRouter = require('@koa/router');
const jwt = require('jsonwebtoken')

const app = new koa()

const userRouter = new KoaRouter({prefix:'/users'})
// 重要加密
const secretKey = 'ssetwt'

userRouter.get('/',(ctx,next)=>{
    // 1.颁发token
    const payload = {id:111,name:'why'}   
    const token = jwt.sign(payload,secretKey,
        {
        expiresIn:160 //token 的过期时间
    }
    )

    ctx.body = {
        code:0,
        token,
        message:'登录成功'
    }
})

userRouter.get('/list',(ctx,next)=>{
    // 1.获取到token
    const authorization = ctx.headers.authorization
    const token = authorization.replace('Bearer ','')
    
    // 2.验证token
    try {
        const result = jwt.verify(token,secretKey)
        ctx.body = {
            code:2,
            data:{
                id:1,
                name:'why',
            },
            message:'登录成功'
        }
    } catch (error) {
        ctx.body = {
            code:-1003,
            message:'权限不够'
         }
    }
   
})

app.use(userRouter.routes()).use(userRouter.allowedMethods())

app.listen(8280,()=>{
    console.log('服务器启动~');
})
