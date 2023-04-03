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