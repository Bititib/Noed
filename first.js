// 导入express
const express = require('express')

// 创建服务器
const app = express();
// 1、
// //  / 的get请求处理
// app.get('/',(req,res)=>{
//     res.end("Hello Get")
// })
// // /login的post请求处理
// app.post("/login",(req,res)=>{
//     res.end('Hello Post')
// })

// 2、普通中间件可以next()下一个路径匹配的中间件
// app.use((req,res,next)=>{
//     console.log('普通中间件');
//     // res.end('普通中间件')
//     next()
// })

// app.use('/login',(req,res,next)=>{
//     console.log('/login')
//     res.end('next() login path middleware')
// })

// app.use('/home',(req,res,next)=>{
//     console.log('/home')
//     res.end('next() home path middleware')
// })

// 3、method & path 中间件
// app.get('/home',(req,res,next)=>{
//     console.log('/home');
//     res.end('middleware path /home')
// });
// app.post('/login',(req,res,next)=>{
//     console.log('/login');
//     res.end('middleware path /login')
// })

// 4、同时注册多个中间件
// app.method(path,middleware1,middleware2,middleware3····)
app.get('/home',(req,res,next)=>{
    console.log('middleware 1');
    next()
},(req,res,next)=>{
    console.log('middleware 2');
    next()
},(req,res,next)=>{
    console.log('middleware 3');
    next()
},(req,res,next)=>{
    console.log('middleware 4');
    res.end('four middleware')
})


// 开启监听
app.listen(8000,()=>{
    console.log('服务器已开启~');
})