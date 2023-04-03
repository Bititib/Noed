const express = require('express');

const app = express()

app.use(express.static('./aploads'))

app.listen(9000,()=>{
    console.log('启动服务器~');
})