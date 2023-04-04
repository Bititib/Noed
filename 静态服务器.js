const Koa = require('koa');
const static = require('koa-static');
const app = new Koa();

app.use(static('./build'));
app.listen(8000,()=>{
    console.log("静态服务器启动成功");
})