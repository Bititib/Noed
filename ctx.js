const Koa = require('koa');

const app =new Koa()

// 注册中间件

app.use((ctx,next)=>{
    // 请求对象
    console.log(ctx.req); // req 是node封装的请求对象
    console.log(ctx.request); // request是Koa自己封装的请求对象
    // 响应对象
    console.log(ctx.response); // response 是Koa封装的响应对象
    console.log(ctx.res); // res 是node封装的响应对象
    // 其他属性
    console.log(ctx.query);
    console.log(ctx.path);
})

app.listen(8888,()=>{
    console.log('Koa服务器启动~');
})