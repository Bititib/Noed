const Koa = require('koa');
const Router = require('@koa/router')
const multer = require('@koa/multer')

const app = new Koa();
const router = new Router( {prefix : '/upload'} );
const upload = multer({
    // dest:'./upload', // 目标文件url
    storage:multer.diskStorage({
        destination(req,res,callback){
            callback(null,'./uploads')
        },
        filename(req,file,callback){
            callback(null,file.originalname)
        }
    })
});

// 单个文件上传
router.post('/',upload.single("avatar"),(ctx,next)=>{
    console.log("ctx.request.file",ctx.request.file);
    console.log("ctx.flie",ctx.file);
    console.log("ctx.requset.body",ctx.request.body);
    ctx.body = '文件上传'
})

// 多个文件上传
router.post('/files',upload.array('avatar'),(ctx,next)=>{
    console.log('ctx.files',ctx.files);
    ctx.body = '多文件上传~~'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8666,()=>{
    console.log('上传文件服务~~~');
})