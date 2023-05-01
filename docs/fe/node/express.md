# express

## 初体验
- `npm init -y`
- `npm i express`

```js
// 01_初体验.js
// 1.导入
const express = require('express')

// 2.创建应用对象
const app = express()

// 3。创建路由
app.get('/home', (req, res) => {
  res.end('hello express')
})

// 4. 监听端口
app.listen(3000, () => {
  console.error('服务已启动， 3000端口')
})
```

- `nodemon 01_初体验.js`

## 路由

定义了应用程序如何响应客户端对特定锚点的请求

### 使用
- 请求方法、路径、回调函数 组成
- `app.<method>(path, callback)`

```js
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.end('home')
})

app.get('/home', (req, res) => {
  res.end('hello, express')
})

app.post('/login', (req, res) => {
  res.end('login')
})

// 不要求请求方法
app.all('/test', (req, res) => {
  res.end('test')
})

// 托底的
app.all('/*', (req, res) => {
  res.end('404')
})

app.listen(3000, () => {
  console.error('启动')
})
```

### 获取请求报文参数

```js
const express = require('express')

const app = express()

app.get('/request', (req, res) => {
  // 原生操作
  // console.error(req.method)
  // console.error(req.url)
  // console.error(req.httpVersion)
  // console.error(req.headers)

  // express 操作
  console.error(req.path)
  console.error(req.query)

  // 获取ip
  console.error(req.ip)

  // 获取请求头
  console.error(req.get('host'))

  res.end('request')
})

app.listen(3000, () => {
  console.error('启动')
})
```

### 获取路由参数
url 路径中的参数
`req.params.id`

```js
const express = require('express')

const app = express()

// app.get('/10.html', (req, res) => {
//   res.setHeader('content-type', 'text/html;charset=utf-8')
//   res.end('商品详情')
// })
// app.get('/11.html', (req, res) => {
//   res.setHeader('content-type', 'text/html;charset=utf-8')
//   res.end('商品详情')
// })

app.get('/:id.html', (req, res) => {
  // 获取 URL 路由参数

  console.error(req.params.id)

  res.setHeader('content-type', 'text/html;charset=utf-8')
  res.end('商品详情')
})

app.listen(3000, () => {
  console.error('启动')
})
```

### 设置响应
1. 
```js
const express = require('express')
const app = express()

app.get('/response', (req, res) => {
  // 原生响应
  // res.statusCode = 404
  // res.statusMessage = 'hah'
  // res.setHeader('xxx', 'yyy')
  // res.write('hello')
  // res.end('response')

  // express 响应
  // res.status(500)
  // res.set('aaa', 'bbb') // 响应头
  // res.send('你好') // 响应体

  res.status(500).set('aaa', 'bbb').send('你好')
})

app.listen(3000, () => {
  console.error('启动')
})
```
2.
```js
const express = require('express')
const app = express()

app.get('/other', (req, res) => {
  // 跳转响应 重定向
  // res.redirect('https://www.baidu.com')
  // 下载响应
  // res.download(__dirname + '/package.json')
  // json 响应
  // res.json({
  //   name: 'N',
  //   age: 18,
  // })
  // 响应文件内容
  res.sendFile(__dirname + '/index.html')
})

app.listen(3000, () => {
  console.error('启动')
})
```

### 中间件(函数)
- 中间件(Middleware)本质上是一个函数
- 可以像路由回调一样访问 请求对象/request 响应对象/response
- 使用函数封装公共操作，简化代码

类型  
- 全局中间件
- 路由中间件

#### 定义全局中间件

```js
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

// 声明中间件函数

function recordMiddleware(req, res, next) {
  let { url, ip } = req
  fs.appendFileSync(path.resolve(__dirname, './access.log'), `${url} ${ip}\r\n`)
  // 调用 next
  next()
}

app.use(recordMiddleware)

app.get('/home', (req, res) => {
  res.end('前台首页')
})

app.get('/admin', (req, res) => {
  res.end('后台首页')
})

app.get('*', (req, res) => {
  res.end('404')
})

app.listen(3000, () => {
  console.error('启动')
})
```

#### 定义路由中间件 校验权限
```js
const express = require('express')
const app = express()

app.get('/home', (req, res) => {
  res.send('前台首页')
})

let checkCodeMiddleware = (req, res, next) => {
  if (req.query.code === '521') {
    next()
  } else {
    res.send('暗号错误')
  }
}

app.get('/admin', checkCodeMiddleware, (req, res) => {
  res.send('后台首页')
})

app.get('/setting', checkCodeMiddleware, (req, res) => {
  res.send('设置')
})

app.get('*', (req, res) => {
  res.send('404')
})

app.listen(3000, () => {
  console.error('启动')
})
```

#### 静态资源中间件
`express.static`

```js
- public
  - css
    - index.css
  - index.html


const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/home', (req, res) => {
  res.send('前台首页')
})

app.get('*', (req, res) => {
  res.send('404')
})

app.listen(3000, () => {
  console.error('启动')
})

```

注意事项  
1.index.html 是默认打开的资源
2.如果静态资源与路由规则同时匹配，谁先匹配谁就响应，书写顺序
3.路由响应动态资源，静态资源中间件响应静态资源

```js
const express = require('express')

const app = express()

// 率先匹配
// app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.send('前台首页')
})

// 率先匹配
// app.use(express.static(__dirname + '/public'))

app.get('*', (req, res) => {
  res.send('404')
})

app.listen(3000, () => {
  console.error('启动')
})
```
### 获取请求体数据
`npm install body-parser`


```js
// index.html
<form action="/login" method="post">
  <input type="text" name="username">
  <input type="text" name="password">
  <button>登录</button>
</form>
// index.js
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// 解析 JSON 格式的请求体的中间件
const jsonParser = bodyParser.json()

// 解析 querySting 格式的请求体的中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/login', urlencodedParser, (req, res) => {
  console.error(req.body.username)
  console.error(req.body.password)
  res.send('post login')
})

app.listen(3000)

```

### 防盗链
```js
const express = require('express')
const app = express()

app.use((req, res, next) => {
  // 检测 请求头中的 referer
  let referer = req.get('referer')
  if (referer) {
    let url = new URL(referer)
    let hostname = url.hostname
    if (hostname !== '127.0.0.1') {
      res.status(404).send('404')
      return
    }
  }

  next()
})

app.use(express.static(__dirname + '/public'))

app.listen(3000, () => {
  console.error('启动')
})
```

### 路由的模块化
```js
// routes/home.js
const express = require('express')
const router = express.Router()

router.get('/home', (req, res) => {
  res.send('hello, express')
})

module.exports = router
```
```js
// routes/admin.js
const express = require('express')
const router = express.Router()

router.get('/admin', (req, res) => {
  res.send('admin')
})
module.exports = router

```

```js
// app.js
const express = require('express')
const homeRouter = require('./routes/home')
const adminRouter = require('./routes/admin')

const app = express()

app.use(homeRouter)
app.use(adminRouter)

app.all('/*', (req, res) => {
  res.send('404')
})

app.listen(3000, () => {
  console.error('启动')
})

```

### EJS 模板引擎
可以分离html 和 js
`npm i ejs`
```js

```