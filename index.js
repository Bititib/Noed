// 创建服务器

const http = require('http');
const port = 8080;

const server = http.createServer((request,response)=>{
    response.write('tt')
    response.end('ll')
    
});

server.listen(port,()=>{
    console.log(`服务器${port}启动`);
})
