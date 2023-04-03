const express = require('express');
const app = express();
const multer = require('multer')

// 利用express提供的第三方中间件 multer 处理文件
const upload = multer({
    // dest:'./uploads',
    storage:multer.diskStorage({
        destination(req,file,callback){
            callback(null,'./uploads')
        },
        filename(req,file,callback){
            callback(null, Date.now() + '_' + file.originalname)
        }
    })
})

// 上传单个文件
app.post('/avatar', upload.single('avatar') ,(req,res,next)=>{
    console.log(req.file);
    res.end('文件上传成功')
})

// 上传多个文件 —— 使用multer.array(filename,maxLenght)
app.post('/photos',upload.array('photos'),(req,res,next)=>{
    console.log(req.files);
    res.end('多文件上传')
})

app.listen(9000,()=>{
    console.log('文件上传服务器~');
})