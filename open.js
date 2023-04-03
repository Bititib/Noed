const fs = require('fs');
// 打开文件
// fs.open('./template',(err ,fd)=>{
//     if(err)return
//     console.log(fd)
//     // 查看文件信息
//     fs.fstat(fd,(err,start)=>{
//         if(err){
//             console.log(err);
//             return
//         }
//         console.log("start")
//     })

//     // 写入文件
//     fs.writeFile('template','写入的内容',{flag:'w+'},function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log('写入成功');
//             // 读取文件
//         fs.readFile('template',{encoding:'utf-8'},(err,data)=>{
//             if(err){
//                 console.log(err);
//             }
//             console.log(data);
//             console.log('读取成功');
//         })
//     })


//     // 截取文件
//     var buf = new Buffer.alloc(1024);
//     fs.ftruncate(fd,2,(err)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log('文件截取成功');
//         // 文件读取
//         fs.read(fd,buf,0,buf.length,0,(err,bytes)=>{
//             if(err){
//                 console.log(err);
//             }
//             console.log(bytes);
//             // 仅输出读取文件字节
//             if(bytes > 0){
//                 console.log(buf.slice(0,bytes).toString());
//             }
//             // 关闭当前文件
//             fs.close(fd,(err)=>{
//                 if(err){
//                     console.log(err);
//                     return
//                 }
//                 console.log('文件关闭成功');
//             })
//         })
//     })

// })


// 文件夹操作

// 1、创建文件夹目录
fs.mkdir('/mkdirCeate/cat',{recursive: true},(err)=>{
    if(err){
        console.log(err);
    }
    console.log('创建成功');
    // 读取文件夹目录
    fs.readdir('/mkdirCeate',(err,data)=>{
        if(err)return
        console.log('读取成功'+ data);
    })
})
// 2、删除目录
fs.rmdir('mkdirCeate',(err)=>{
    if(err){
        console.log(err);
    }
    console.log('删除成功');
})
