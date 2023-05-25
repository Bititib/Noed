## 服务器设置cookie

1、服务器设置Cookie
```js
 ctx.cookies.set('token','itoo',{
        maxAge:60*1000 // 设置过期时间
    })
```

2、客户端获取Cookie，并且做一个存储


3、在同一个域名下进行访问，会自动携带cookie


4、服务器可以通过客户端携带的Cookie验证用户身份
```js
// 验证用户登录凭证，携带的token值 itoo
    const value = ctx.cookies.get('token') 
    
    if(value === 'itoo'){
        ctx.body = `user list data ~`
    }else{
        ctx.body = '你的权限不够~,'
    }
```

## JWT实现Token机制

### JWT生成的Token由三部分组成:
- header
    - alg : 采用加密算法,默认是HMAC SHA256(HS256) 对称加密,采用同一个秘钥进行加密和解密
    - typ : JWT,固定值,通常都写成JWT即可;
    - 会通过base64Url算法进行编码; 

- payload
    - 携带的数据,比如我们可以将用户的id和name放到payload中;
    - 默认也会携带 iat (issued at) , 令牌发放的时间;
    - 设置过期时间: exp (expiration time);
    - 会通过base64Url算法进行编码

- signature
    - 设置一个secreKey,通过将前两个的结果合并后进行HMACSHA256的算法;
    - HMACSHA256(base64Url(header) + .+base64Url(payload),secretKey);
    - 但是seceretKey暴露是一件非常危险的事情,因为可以模拟颁发token，也可以解密token

### 用法
``` 
    npm install jsonwebtoken 
```
> jwt.sign(payload, secretOrPrivateKey, [options, callback])
（异步）如果提供回调，则使用err或 JWT 调用回调。

（同步）将 JsonWebToken 作为字符串返回

```js
// 使用 RSA SHA256 同步签名

// sign with RSA SHA256
var privateKey = fs.readFileSync('private.key');
var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });

// 异步签名

jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
  console.log(token);
});

// 回溯 jwt 30 秒

var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

```
 令牌过期时间（exp 声明）

```js
jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  data: 'foobar'
}, 'secret');
```
token验证

> 
```
jwt.verify（令牌，secretOrPublicKey，[选项，回调]）
```
（异步）如果提供回调，函数将异步执行。如果签名有效且可选的过期时间、受众或发行者有效，则使用解码后的有效负载调用回调。如果没有，它将被调用并出现错误。

（同步）如果未提供回调，函数将同步执行。如果签名有效并且可选的过期时间、受众或发行者有效，则返回解码后的有效负载。如果没有，它将抛出错误。


### 加密
> SH256是对称加密，容易伪造,非常危险
- 比如在分布式系统中，每一个子系统都需要获取到秘钥
- 这个秘钥可以在其他系统中使用

> 非对称加密:`RS256`
- 私钥:private_key
    - 只有用户才有的权限颁发token
- 公钥: public_key
    - 用来解密私钥颁发的token

#### 终端生成私钥

> 可以使用openssl来生成私钥和公钥:
- MacOS直接使用terminal终端生成即可;
- Windows终端默认是不能直接使用的，建议使用 git bash

进入 openssl
```shell
    $ openssl
```
生成私钥:生成一个长度为2048的私钥
```shell
    genrsa -out private.key 2048
```
生成公钥:生成对应私钥的解密公钥
```shell
    rsa -in private.key -pubout -out public.key
```

#### 利用node内置的 crypto 库进行生成

> crypto.createPrivateKey(key)
- key <对象> | <字符串> | <数组缓冲区> | <缓冲区> | <类型数组> | <数据视图>
    - key: <字符串> | <数组缓冲区> | <缓冲区> | <类型数组> | <数据视图> | <Object>密钥材料，采用 PEM、DER 或 JWK 格式。
    - format: <string>必须是'pem', 'der', 或 ' 'jwk'。 默认值： 'pem' .
    - type: <string>必须是'pkcs1','pkcs8'或'sec1'. format仅当是 时才需要此选项，'der'否则忽略。
    - passphrase: <字符串> | <Buffer>用于解密的密码。
    - encoding: <string>key为字符串时使用的字符串编码。
- 返回：<KeyObject>

创建并返回一个包含私钥的新密钥对象。如果key是字符串或Buffer，format则假定为'pem'；否则，key 必须是具有上述属性的对象。

如果私钥被加密，则passphrase必须指定 a。密码的长度限制为 1024 个字节。

> crypto.createPublicKey(key)
- key <对象> | <字符串> | <数组缓冲区> | <缓冲区> | <类型数组> | <数据视图>
    - key: <字符串> | <数组缓冲区> | <缓冲区> | <类型数组> | <数据视图> | <Object>密钥材料，采用 PEM、DER 或 JWK 格式。
    - format: <string>必须是'pem'、'der'或'jwk'。 默认值： 'pem' .
    - type: <string>必须是'pkcs1'或'spki'。format仅当是 时才需要此选项，'der'否则忽略。
    - encoding <string>key为字符串时使用的字符串编码。
- 返回：<KeyObject>

创建并返回一个包含公钥的新密钥对象。如果key是字符串或Buffer，format则假定为'pem'；如果key是一个KeyObject with type 'private'，公钥是从给定的私钥派生的；否则，key必须是具有上述属性的对象。

如果格式为'pem'，则'key'也可能是 X.509 证书。

因为公钥可以从私钥导出，所以可以传递私钥而不是公钥。在这种情况下，此函数的行为就像 crypto.createPrivateKey()已被调用一样，只是返回的类型KeyObject将为'public'并且无法从返回的 中提取私钥KeyObject。类似地，如果给出一个KeyObjectwith 类型 ，将返回一个新的with 类型，并且无法从返回的对象中提取私钥。'private'KeyObject'public'