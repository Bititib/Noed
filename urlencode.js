const express = require('express');
const app = express()

// 解析 x-www-form-urlencoded 数据
app.use(express.urlencoded())
app.post('/login',(req,res,next)=>{
    console.log(req.body);
    res.end('欢迎回来~')
})

app.listen(9000,()=>{
    console.log('服务器~~~');
})