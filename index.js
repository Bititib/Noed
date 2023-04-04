const fs = require('fs')
// 可读流

// const readStream = fs.createReadStream('aa.txt',{
//     start:3,
//     end:10,
//     // 每次获取多少
//     highWaterMark:2

// })
// readStream.on('data',(data)=>{
//     console.log(data.toString());
//     // 暂停可读操作
//     readStream.pause()
//     // 暂停两秒后恢复可读
//     setInterval(()=>{
//         // 恢复可读操作
//         readStream.resume()
//     },2000)
// })

// 可写流
// const writeStream = fs.WriteStream('./ccc.txt',{
//     flags:'a',// 写入的形式
//     start:2 // 从那个位置开始追加
// })

// writeStream.write('kobe')

// // 验证是否写入成功
// writeStream.write('Kobe Bryant',(err)=>{
//     if(err)return
//     console.log('写入成功');
//     // 关闭文件
//     writeStream.close();
// })

// // 监听文件是否打开
// writeStream.on('open',(fd)=>{
//     console.log('文件被打开'+fd);
// })

// Pipe方法—————管道/过滤

function Pipe(){
    const readStream = fs.createReadStream('./aa.txt');
    const writeStream = fs.WriteStream('./aa_copy01.txt');
    // readStream.on('data',(data)=>{
    //     writeStream.write(data)
    // })
    // readStream.on('end',()=>{
    //     writeStream.close()
    // })
    
    
    // 3、
    readStream.pipe(writeStream) 
}
Pipe()