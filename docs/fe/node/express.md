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
-------------------------
req.query.id
---------------------
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

## EJS 模板引擎
可以分离html 和 js
`npm i ejs`
```js
// ./01_html.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <h2>我爱你，<%= china %>
  </h2>
  <h2>
    <%= weather %>
  </h2>
</body>

</html>
---------------------------
// js
const ejs = require('ejs')
const fs = require('fs')

let china = '中国'
let weather = '今天天气不错'

let str = fs.readFileSync('./01_html.html').toString()
let result = ejs.render(str, { china, weather })

console.error(result)

```

### 列表渲染
```js
const ejs = require('ejs')
const fs = require('fs')

const xiyou = ['唐僧', '孙悟空', '猪八戒', '沙僧']

// 原生js
// let str = `<ul>`

// xiyou.forEach((item) => {
//   str += `<li>${item}</li>`
// })

// str += `</ul>`

// console.error(str)

// ejs
// let result = ejs.render(
//   `
//   <ul>
//     <% xiyou.forEach(item => { %>
//       <li><%= item %></li>
//     <% }) %>
//   </ul>
// `,
//   { xiyou }
// )

let html = fs.readFileSync('./01_html.html').toString()

let result = ejs.render(html, { xiyou })

console.error(result)
------------------------------
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <ul>
    <% xiyou.forEach(item=> { %>
      <li>
        <%= item %>
      </li>
    <% }) %>
  </ul>
</body>

</html>
```

### 条件渲染
```js
const ejs = require('ejs')
const fs = require('fs')
let isLogin = false

// 原生 js
// if (isLogin) {
//   console.error(`<span>欢迎回来</span>`)
// } else {
//   console.error(`<button>登录</button>`)
// }

// ejs

// let result = ejs.render(
//   `
//   <% if(isLogin) { %>
//     <span>欢迎回来</span>
//   <% } else { %>
//     <button>登录</button>
//   <% } %>
// `,
//   { isLogin }
// )
let html = fs.readFileSync('./01_html.html').toString()
let result = ejs.render(html, { isLogin })
console.error(result)
-------------------------------------------
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <% if(isLogin) { %>
    <span>欢迎回来</span>
    <% } else { %>
      <button>登录</button>
      <% } %>
</body>

</html>
```

### express 使用 EJS
```js
const express = require('express')
const path = require('path')

const app = express()

// 1.设置模板引擎
app.set('view engine', 'ejs')
// 2. 设置模板文件存放位置
app.set('views', path.resolve(__dirname, './views'))

app.get('/home', (req, res) => {
  // 3. render 响应  res.render('模板文件名', { 数据 })
  let title = 'hello'
  res.render('home', { title })
})

app.listen(3000, () => {
  console.error('启动')
})
-----------------------------------
// views/home.ejs
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <h1>
    <%= title %>
  </h1>
</body>

</html>
```

## express generator 工具
快速搭建项目 -- 脚手架
1. `npx express-generator` 默认jade模板 `npm i`
2. - `npm install -g express-generator` 
   - `express -e 文件夹名` 添加模板依赖 ejs
   - `npm i`

- bin：可执行文件。里面包含了一个启动文件 www 默认监听端口是 3000。
- public：静态文件。用来存放项目静态文件目录如js,css以及图片。
- routes：路由文件。路由主要定义 url 和 资源 的映射关系 ( 一一对应关系 ), 主要用来接收前端发送的请求 响应数据给前端
- views：后端模版文件。
- app.js：入口文件。
- package.json：工程信息和模块依赖。

### 简易文件上传
`npm i formidable`

```js
// routes/index.js
var express = require('express')
var router = express.Router()
const formidable = require('formidable')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// 显示网页(表单)
router.get('/portrait', (req, res) => {
  res.render('portrait')
})

// 处理文件上传
router.post('/portrait', (req, res) => {
  // 创建表单对象
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + '/../public/images', // 上传路径
    keepExtensions: true, // 保持文件后缀
  })

  // 解析请求报文
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    }
    // res.json({ fields, files })
    // console.error(fields) // text radio checkbox
    // console.error(files) // file
    // 服务器保存图片的访问 URL
    let url = '/images' + files.portrait.newFilename // 将数据保存数据库中
    res.send('success')
  })
})

module.exports = router
----------------------------------
// views/portrait.ejs
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>文件上传</title>
</head>

<body>
  <h2>文件上传</h2>
  <hr>
  <form action="/portrait" method="post" enctype="multipart/form-data">
    <input type="text" name="username"><br>
    <input type="file" name="portrait"><br>
    <button>提交</button>
  </form>
</body>

</html>
```
## Mongodb
基于分布式文件存储的数据库

### 核心概念
- 数据库 database 一个数据仓库,数据库服务下可以创建很多数据库,数据库中可以存放很多集合
- 集合  collection  类似js中的数组,在集合中可以存放很多文档
- 文档  document  数据库中的最小单位,类似js对象

### 下载 启动
[下载地址](https://www.mongodb.com/try/download/community)  
1. msi => custom => D:\soft\mongodb  
2. 取消 Install MongoDB Compass => 下载很慢  
3. 配置环境变量 => D:\soft\mongodb\bin  
4. data 目录下 创建 db 文件夹  
5. bin 目录下 cmd `mongod --dbpath D:\MongoDB\data\db` => `http://localhost:27017/`   
--------------------------------------------------------------------
1. 在管理员cmd 下使用简单命令 启动、关闭 Mongo 服务  
2. data 文件夹下 创建 log 文件夹  
3. 在 bin 同级目录新建 配置文件 mongo.config `dbpath=D:\soft\mongodb\data\db`\\
`logpath=D:\soft\mongodb\data\log`  
4. bin 目录下 管理员cmd `mongod -dbpath "D:\soft\mongodb\data\db" -logpath "D:\soft\mongodb\data\log" -install -serviceName "MongoDB"`  
5. 管理员 cmd `net start MongoDB` 开启   `net stop MongoDB` 关闭  
6. services.msc =>  MongoDB => 手动  
-----------------------------------------------------------------------
1. MongoDB Compass(可视化) [下载连接](https://www.mongodb.com/try/download/compass)
2. 运行exe，MongoDB 开启情况下 connect

----------------------------------------------------------------------------
报错：'mongo' 不是内部或外部命令，也不是可运行的程序 或批处理文件。  
1. 下载的6.x版本需要再次下载shell [下载连接](https://www.mongodb.com/try/download/shell)
2. 解压bin 同级目录下
3. 将环境变量 D:\soft\mongodb\bin  => shell的bin目录
4. net start MongoDB  => mongosh

### 命令
数据库
- `show dbs`  查看所有的数据库
- `use 数据库名`  切换指定数据库，如果数据库不存在自动创建数据库
- `db` 显示当前所在的数据库
- `use 库名` -`db.dropDatabase()` 删除库   
  
集合
- `db.createCollection('集合名称')` 创建集合
- `show collections` 显示当前数据库中所有的集合
- `db.集合名.drop()` 删除某个集合
- `db.集合名.renameCollection('集合名')`  重命名集合名  
  
文档
- `db.集合名.insert(文档对象)` 插入文档 db.集合名.insert({ name: '张三',age: 20 })
- `db.集合名.find(查询条件)`  查询文档 db.集合名.find() => 全部  db.集合名.find({ age: 20})
- `db.集合名.update(查询条件, 新的文档)` 更新文档 db.集合名.update({name: '张三'}, { $set: {age: 19} })
- `db.集合名.remove(查询条件)` 删除文档 db.集合名.remove({ name:'张三' })

## Mongoose
### 连接数据库
`npm init -y`
`npm i mongoose`
`net start MongoDB`
```js
const mongoose = require('mongoose')

// 连接
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

// 监听
// 设置连接成功的回调 once 一次， 事件回调只执行一次
// mongoose.connection.on('open', () => {
//   console.error('连接成功')
// })
mongoose.connection.once('open', () => {
  console.error('连接成功')
})

mongoose.connection.on('error', () => {
  console.error('连接失败')
})
mongoose.connection.on('close', () => {
  console.error('连接关闭')
})

// setTimeout(() => {
//   mongoose.disconnect()
// }, 2000)

```
### 插入文档
```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

mongoose.connection.once('open', () => {
  // 创建文档的结构对象
  // 设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
  })

  // 创建模型对象 对文档操作的封装对象
  let BookModel = mongoose.model('books', BookSchema)

  // 新增
  BookModel.create({
    name: '西游记',
    author: '吴承恩',
    price: '19.9',
  }).then((res) => {
    console.error(res)
  })
  // .then((res) => {
  //   // 关闭数据库连接
  //   // mongoose.disconnect()
  // })
  // let books = [
  //   {
  //     name: '1',
  //     author: '1',
  //     price: '1',
  //     is_hot: true,
  //   },
  //   {
  //     name: '2',
  //     author: '2',
  //     price: '2',
  //     is_hot: true,
  //   },
  //   {
  //     name: '3',
  //     author: '3',
  //     price: '3',
  //     is_hot: false,
  //   },
  //   {
  //     name: '4',
  //     author: '4',
  //     price: '4',
  //     is_hot: false,
  //   },
  //   {
  //     name: '5',
  //     author: '5',
  //     price: '5',
  //     is_hot: false,
  //   },
  // ]
   // 多个
  // BookModel.insertMany(books).then((res) => {
  //   console.error(res)
  // })
})

mongoose.connection.on('error', () => {
  console.error('连接失败')
})
mongoose.connection.on('close', () => {
  console.error('连接关闭')
})
```
### 字段类型
- String
- Number
- Boolean
- Array
- Date
- Buffer
- Mixed     任意类型 需使用 mongoose.Schema.Types.Mixed 指定
- ObjectId  对象Id,需使用  mongoose.Schema.Types.ObjectId指定   常用外键
- Decimal128  高精度数字 需使用  mongoose.Schema.Types.Decimal128 指定

```js
new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  isHot: Boolean,
  pub_time: Date,
  tags: Array
})
```

### 字段值验证
```js
new mongoose.Schema({
  name: {
    type: String,
    reqired: true, // 必填项 不为空
    default: '佚名' // 默认值
    unique: true  // 设置独一无二 唯一值
  },
  style: {
    type: String,
    enum: ['恐怖', '城市'] // 设置的值必须是数组中的 枚举值
  },
})
```

### 删除文档
- deleteOne
- deleteMany
```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

mongoose.connection.once('open', () => {
  // 创建文档的结构对象
  // 设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    author: String,
    price: Number,
    is_hot: Boolean,
  })

  // 创建模型对象 对文档操作的封装对象
  let BookModel = mongoose.model('books', BookSchema)

  // 删除单条
  // BookModel.deleteOne({ _id: '6454cda9172499d5c78ce916' }).then((res) => {
  //   console.error(res)   // { acknowledged: true, deletedCount: 1 }
  // })

  // 批量删除
  // BookModel.deleteMany({ is_hot: false }).then((res) => {
  //   console.error(res) // { acknowledged: true, deletedCount: 3 }
  // })
})

mongoose.connection.on('error', () => {
  console.error('连接失败')
})
mongoose.connection.on('close', () => {
  console.error('连接关闭')
})
```

### 更新文档
```js
// 更新单条
// BookModel.updateOne({ name: '1' }, { price: 9.9 }).then((res) => {
//   console.error(res)
// })
// 更新多条
BookModel.updateMany({ is_hot: false }, { price: 55 }).then((res) => {
  console.error(res)
})
```
### 读取文档
```js
// 读取单条
// BookModel.findOne({ name: '1' }).then((res) => {
//   console.error(res)
// })
// 根据 Id 读取
// BookModel.findById('6454cf0c014171b7321cc5ff').then((res) => {
//   console.error(res)
// })
// 读取多条
// BookModel.find({ is_hot: true }).then((res) => {
//   console.error(res)
// })
// 读取所有
BookModel.find().then((res) => {
  console.error(res)
})
```
### 条件控制
1. 运算符
   - `>` 使用 `&gt`
   - `<` 使用 `$lt`
   - `>=` 使用 `$gte`
   - `<=` 使用 `$lte`
   - `!==` 使用 `$ne`
2. 逻辑运算
   - `$or`  或
   - `$and`  和
3. 正则 模糊查询

```js
// 价格小于20
BookModel.find({ price: { $lt: 20 } }).then((res) => {
  console.error(res)
})
-------------------
BookModel.find({ $or: [{ name: '1' }, { name: '2' }] }).then((res) => {
  console.error(res)
})
---------------------
BookModel.find({
  $and: [{ price: { $gt: 30 } }, { price: { $lt: 70 } }],
}).then((res) => {
  console.error(res)
})
-----------------
BookModel.find({ name: new RegExp('1') }).then((res) => {
  console.error(res)
})

BookModel.find({ name: '/1/' }).then((res) => {
  console.error(res)
})
```

### 个性化读取
1.字段筛选
```js
// 仅需要 name 和 author 的数据
BookModel.find()
  .select({ name: 1, author: 1 })
  .then((res) => {
    console.error(res)
  })
```
2.数据排序
```js
BookModel.find()
  .sort({ price: 1 })     // 低到高
  // .sort({ price: -1 }) // 高到低
  .then((res) => {
    console.error(res)
  })
```
3.数据截取
```js
// 截取三条
BookModel.find()
  .sort({ price: 1 })
  .limit(3)
  .then((res) => {
    console.error(res)
  })
// 截取 4-6
BookModel.find()
  .sort({ price: 1 })
  .skip(3)
  .limit(3)
  .then((res) => {
    console.error(res)
  })
```

### 模块化
```js
- config
  - index.js
- db
  - db.js
- models
  - BookModel.js
- index.js
---------------------------------------------
// config/index.js
module.exports = {
  DBHOST: '127.0.0.1',
  DBPORT: 27017,
  DBNAME: 'bilibili',
}

// db.js
module.exports = function (success, error) {
  if (typeof error !== 'function') {
    error = () => {
      console.error('连接失败')
    }
  }
  const mongoose = require('mongoose')
  const { DBHOST, DBPORT, DBPORT } = require('../config/index')

  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBPORT}`)

  mongoose.connection.once('open', () => {
    success()
  })

  mongoose.connection.on('error', () => {
    error()
  })
  mongoose.connection.on('close', () => {
    console.error('连接关闭')
  })
}

-------------------------------------
// BookModel.js
const mongoose = require('mongoose')

let BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: String,
  price: Number,
  is_hot: Boolean,
})

// 创建模型对象 对文档操作的封装对象
let BookModel = mongoose.model('books', BookSchema)

module.exports = BookModel
-----------------------------------
// index.js
const db = require('./db/db')
const BookModel = require('./models/BookModel')
db(
  () => {
    BookModel.create({
      name: '10',
      author: '9',
      price: '9',
      is_hot: false,
    }).then((res) => {
      console.error(res)
    })
  }
)
```

## 会话控制
- cookie  
  
  通过响应头 set-cookie 设置cookie,浏览器自动携带
  
```js
// 设置cookie
router.get('/', (req, res) => {
  res.cookie('name', '张三')
  res.cookie('theme', 'bule', { maxAge: 60 * 1000 })
  res.send('设置cookie')
})

// 清除cookie
router.get('/', (req, res) => {
  res.clearCookie('name')
  res.send('清除cookie')
})

// 获取cookie
var cookieParser = require('cookie-parser')
app.use(cookieParser())
router.get('/', (req, res) => {
  console.error(req.cookies)
})
```
- session  
  
  通过 set-cookie: sid=xxxx 将sessonId传给浏览器
- token  
  
JWT(JSON Wwb token)
  - Header
  - Payload
  - Signature

`npm i jsonwebtoken`
```js

```