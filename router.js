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