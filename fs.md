## 操作文件系统
1、打开文件——Open

异步打开
> fs.open(path, flags[, mode], callback)
>参数使用说明如下：
path - 文件的路径。
flags - 文件打开的行为。
mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
callback - 回调函数，带有两个参数如：callback(err, fd)


2、获取文件信息——fstat
> fs.fstat(path,callback)
>参数使用说明如下：
path - 文件路径。
callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
>
>stats类中的方法有：
方法	描述
stats.isFile()	如果是文件返回 true，否则返回 false。
stats.isDirectory()	如果是目录返回 true，否则返回 false。
stats.isBlockDevice()	如果是块设备返回 true，否则返回 false。
stats.isCharacterDevice()	如果是字符设备返回 true，否则返回 false。
stats.isSymbolicLink()	如果是软链接返回 true，否则返回 false。
stats.isFIFO()	如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
stats.isSocket()	如果是 Socket 返回 true，否则返回 false。

3、读取文件内容——
 异步读取
> fs.readFile(path,callback)
> fs.pormise 

同步读取
> fs.readFileSync(path)

4、写入文件内容——
异步
>fs.writeFile(file, data[, options], callback)
>参数使用说明如下：
file - 文件名或文件描述符。
data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。
options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 , flag 为 'w'
callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。


5、关闭文件——
异步
> fs.close(fd, callback)


6、截取文件——
异步
> fs.ftruncate(fd, len, callback)
该方法使用了文件描述符来读取文件
> 参数使用说明如下：
fd - 通过 fs.open() 方法返回的文件描述符。
len - 文件内容截取的长度。
callback - 回调函数，没有参数

7、删除文件——
异步
> fs.unlink(path, callback)
> 参数使用说明如下：
path - 文件路径。
callback - 回调函数，没有参数。


8、文件夹目录操作
- 创建目录
> fs.mkdir(path,options,callback)
> 参数使用说明如下：
path - 文件路径。
options 参数可以是：
    - recursive - 是否以递归的方式创建目录，默认为 false。
    - mode - 设置目录权限，默认为 0777。
callback - 回调函数，没有参数。

- 删除目录
> fs.rmdir(path,callback)

- 读取目录
> fs.readdir(path,callback)
>参数使用说明如下：
path - 文件路径。
callback - 回调函数，回调函数带有两个参数err, files,err 为错误信息，files 为 目录下的文件数组列表

9、重命名
fs.rname(path,newpath,callback)