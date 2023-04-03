const express = require('express');
const app = express();

app.post('/login',(req,res,next)=>{
    let isLogin = false
    req.on('data',(data)=>{
        let str = data.toString();
        let jsonData = JSON.parse(str)
       if(jsonData.usename === 'bitin' && jsonData.password === '123456'){
        isLogin = true;
       }
    })
    req.on('end',()=>{
        if(isLogin){
            res.end('登录成功~')
        }else{
            res.end('登录失败~')
        }
    })
})

app.post('register',(req,res,next)=>{
    let isRegister = false
    req.on('data',(data)=>{
        let str = data.toString();
        let jsonData = JSON.parse(str)
        // 查询数据库中该用户是否已经注册
       if(jsonData.usename === 'bitin' && jsonData.password === '123456'){
        isRegister = true;
       }
    })
    req.on('end',()=>{
        if(isRegister){
            res.end('登录成功~')
        }else{
            res.end('登录失败~')
        }
    })
})


app.listen(8888,()=>{
    console.log('服务器~~~');
})