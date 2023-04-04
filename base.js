const Koa = require('koa');

// 创建app对象
const app =new Koa()

// 注册中间件
// koa中间件只传递两个参数:ctx/next
// ctx参数封装了req和res
app.use((ctx,next)=>{
    console.log('Koa中间件');
    // koa返回响应数据的方法 ctx.body()
    ctx.body = '数据返回'
})

app.listen(8888,()=>{
    console.log('Koa服务器启动~');
})