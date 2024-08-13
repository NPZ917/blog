# Node

node.js 是一个开源的，跨平台的 js 运行环境

- 开发服务器应用
- 开发工具类应用 webpack vite babel
- 开发桌面端应用 vscode postman -> electron -> node

dir 查看目录

顶级对象 - global,也可以使用 globalThis

## Buffer

### 概念

Buffer 缓冲区，是一个类似于 Array 的对象，用于表示固定长度的字节序列  
一段固定长度的内存空间，专门处理二进制数据

### 特点

- Buffer 大小固定且无法调整
- 性能较好，可以直接对计算机内存进行操作
- 每个元素的大小为 1 字节/byte

### 创建

1. Buffer.alloc(size)

```js
let buf = Buffer.alloc(10)
console.error(buf);
// 输出
<Buffer 00 00 00 00 00 00 00 00 00 00>
```

2. Buffer.allocUnsafe(size) 分配内存时不会清除内存残留的数据

```js
let buf = Buffer.allocUnsafe(10)
```

3. Buffer.from(str) 将一个字符串转换为 Buffer

```js
let buf = Buffer.from('hello')
let buf = Buffer.from([105, 122, 132])
```

### buffer 与 字符串的转化

```js
let buf = Buffer.from([105, 122, 132])

buf.toString()  // 默认utf-8
-------------
let buf = Buffer.from('hello')

buf[0].toString()
buf[0].toString(2)  // 二进制
buf[0] = 95         // 修改

--------------------
// 溢出
buf[0] = 361 // 舍弃高位的数字
// 中文
```

## fs 文件系统模块 (file system)

### 文件写入

1.writeFile 异步写入

```js
fs.writeFile(file, data[, optoins], callback)
```

- file 文件名
- data 待写入的数据
- options 选项配置 可选 `{flag: 'a'}`-
- callback 回调

文件如果不存在，则创建文件

```js
const fs = require('fs')

fs.writeFile('./test.txt', 'hello', err => {
  if (err) {
    console.error('写入失败')
    return
  }
  console.error('写入成功')
})
```

2.writeFileSync 同步写入

```js
fs.writeFileSync(./data.txt, 'data')
```

3.追加写入

- fs.appendFile 比如日志
- fs.appendfileSync

`\r\n` -- 换行

```js
const fs = require('fs')

fs.appendFile('./test.txt', '\r\nnode', err => {
  if (err) {
    console.error('失败')
    return
  }
  console.error('成功')
})
```

4.流式写入
`fs.createWriteStream(path[, optoins])`

适合大文件写入或者频繁写入，writeFile 适合写入频率较低的场景

```js
const fs = require('fs')

// 创建写入流对象
const ws = fs.createWriteStream('./data.txt')

// 写入
ws.write('0\r\n')
ws.write('1\r\n')
ws.write('2\r\n')
ws.write('3\r\n')
ws.write('4\r\n')

// 关闭通道 可不写
ws.close()
```

5.写入场景

- 下载文件
- 安装软件
- 保存日志
- 编辑器保存文件
- 视频录制

当需要持久化保存数据时，用 文件写入

### 文件读取

- readFile
- readFileSync

```js
const fs = require('fs')

fs.readFile('./data.txt', (err, data) => {
  if (err) {
    console.error('失败')
    return
  }
  console.error(data.toString())
})
```

流式读取

处理大文件可以提高效率

```js
const fs = require('fs')

const rs = fs.createReadStream('./data.mp4')

rs.on('data', chunk => {
  console.error(chunk) // 65536 字节 => 64kb
  console.error(chunk.length)
  console.error(chunk.toString()) // 乱码 视频文件 非 utf-8
})

rs.end('data', () => {
  console.error('读取完成')
})
```

```js
// 复制 先读 -> 后写入
const fs = require('fs')
const process = require('process') // 分析占用

// 1
// let data = fs.readFileSync('./data.txt')
// fs.writeFileSync('./data2.txt', data)   // rss 35381248

// console.error(process.memoryUsage())

// 2
const rs = fs.createReadStream('./data.txt')
const ws = fs.createWriteStream('data1.txt')

// 2.1
// rs.on('data', (chunk) => {
//   ws.write(chunk)
// })

// rs.on('end', () => {
//   console.error(process.memoryUsage())
// })

// 2.2另一种方式 用的不多
rs.pipe(ws)
```

### 文件重命名与移动文件

- rename(oldPath, newPath, callback)
- renameSync(oldPath, newPath)

```js
const fs = require('fs')

fs.rename('./data1.txt', './data3.txt', (err) => {
  if (err) {
    console.error(err)
    return
  }

  console.error('成功')
})
------------------------------
const fs = require('fs')

fs.rename('./data1.txt', '../src/data3.txt', (err) => {
  if (err) {
    console.error(err)
    return
  }

  console.error('成功')
})
```

### 文件删除

- unlink(path, cb)
- unlinkSync(path)
- rm(path, cb)
- rmSync(path)

```js
const fs = require('fs')

fs.unlink('./data2.txt', (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.error('成功')
})
------------------------
fs.rm('./data3.txt', (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.error('成功')
})
```

### 文件夹操作

1.创建文件夹

- mkdir(path[, optoins], cb) - make dirctory `recursive: true` 递归创建
- mkdirSync(path[, optoins]) -

```js
const fs = require('fs')

fs.mkdir('./html', (err) => {
  if (err) {
    console.error('失败')
    return
  }
  console.error('成功')
})
-------------------------------
// 递归创建
fs.mkdir('./a/b/c', { recursive: true }, (err) => {
  if (err) {
    console.error('失败')
    return
  }
  console.error('成功')
})

```

2.读取文件夹

- readdir(path, cb)

```js
fs.readdir('./txt', (err, data) => {
  console.error(data)
})['data3.txt']
```

3.删除文件夹

- rmdir(path, cb)

```js
fs.rmdie('./txt', (err, data) => {
  console.error(data)
})
------------------------
// 递归删除(不推荐)
fs.rmdir('./a',{ recursive: true }, err => {
  console.error(err)
})

// 推荐
fs.rm('./a',{ recursive: true }, err => {
  console.error(err)
})

```

### 查看资源信息

- stat(path, cb)

```js
fs.stat('./test.txt', (err, data) => {
  console.error(data)
  console.error(data.isFile())        // 是否文件
  console.error(data.isDirectory())   // 是否文件夹
})

Stats {
  dev: 2663097603,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 9288674231480032,
  size: 22,
  blocks: 0,
  atimeMs: 1682869605701.7542,
  mtimeMs: 1682869605621.113,
  ctimeMs: 1682869605621.113,
  birthtimeMs: 1682868959151.6655,
  atime: 2023-04-30T15:46:45.702Z,
  mtime: 2023-04-30T15:46:45.621Z,
  ctime: 2023-04-30T15:46:45.621Z,
  birthtime: 2023-04-30T15:35:59.152Z
}

```

### 路径

```js
// 相对路径
fs.writeFileSync('./test.txt', 'hello')
fs.writeFileSync('test.txt', 'hello')
fs.writeFileSync('../test.txt', 'hello')

// 绝对路径
fs.writeFileSync('D:/index.html', 'hello')
fs.writeFileSync('/index.html', 'hello')
fs.writeFileSync('C:/index.html', 'hello') // 权限
```

相对路径参照物： 命令行的工作目录

```js
fs.writeFileSync('./index.html', 'hello')
```

`__dirname` ---- 所在文件的所在目录的绝对路径

```js
fs.writeFileSync(__dirname + '/index.html', 'hello')
```

### 批量重命名

```js
const fs = require('fs')

const files = fs.readdirSync('./code')

files.forEach(item => {
  let data = item.split('-')
  let [num，name] = data

  if(Number(num) < 10) num = '0' + num

  let newName = num + '-' + name

  fs.renameSync(`./code/${item}`, `./code/${newName}`)
});
```

## path 模块

- path.resolve() 拼接规范的绝对路径
- path.sep 获取操作系统的路径分隔符 windows \ linux /
- path.parse 解析路径并返回对象
- path.basename 获取路径的基础名称
- path.dirname 获取路径的目录名
- path.extname 获取路径的扩展名

\_\_filename 文件的绝对路径

```js
const path = require('path')

path.resolve(__dirname + 'index.html')
```

## HTTP 模块

### 创建

```js
const http = require('http')

// request => 请求报文  response => 响应报文
const server = http.createServer((request, response) => {
  response.end('hello, server')
})

// 监听 9000 端口
server.listen(9000, () => {
  console.error('服务已启动')
})
```

### 注意事项

- 每次重启 `npm i -g nodemon` `nodemon http.js` 自动监听
- 响应内容乱码

```js
response.setHeader('content-type', 'text/html;charset=utf-8')
```

### 获取请求行请求头

```js
const http = require('http')

const server = http.createServer((request, response) => {
  // response.setHeader('content-type', 'text/html;charset=utf-8')
  // response.end('你好')

  console.error(request.method) // 请求方法
  console.error(request.url) // 请求url 只包含url中的路径与查询字符串
  console.error(request.httpVersion) // HTTP 协议的版本号
  console.error(request.headers) // HTTP 请求头
  response.end('hello, http') // 设置响应体
})

server.listen(9000, () => {
  console.error('服务已启动')
})

// request headers
//  {
//   host: 'localhost:9000',
//   connection: 'keep-alive',
//   'cache-control': 'max-age=0',
//   'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
//   'sec-ch-ua-mobile': '?0',
//   'sec-ch-ua-platform': '"Windows"',
//   'upgrade-insecure-requests': '1',
//   'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
//   accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//   'sec-fetch-site': 'none',
//   'sec-fetch-mode': 'navigate',
//   'sec-fetch-user': '?1',
//   'sec-fetch-dest': 'document',
//   'accept-encoding': 'gzip, deflate, br',
//   'accept-language': 'zh-CN,zh;q=0.9',
//   cookie: 'shub_token=9efd9c1f-491f-4ef9-b727-42bace0f9187'
// }
```

### 获取请求体

```js
<div>
  <form action="http://127.0.0.1:9000" method="post">
    <input type="text" name="username" id="">
    <input type="text" name="password" id="">
    <button type="submit" value="提交">提交</button>
  </form>
</div>
```

```js
const http = require('http')

const server = http.createServer((request, response) => {
  let body = ''
  // 绑定 data 事件
  request.on('data', chunk => {
    body += chunk
  })

  // 绑定 end 事件
  request.on('end', chunk => {
    console.error(body) // username=123&password=13

    response.end('hello, http') // 设置响应体
  })
})

server.listen(9000, () => {
  console.error('服务已启动')
})
```

### 获取请求路径 & 查询字符串

1.url 模块 旧版

```js
const http = require('http')
// 1.url 模块
const url = require('url')

const server = http.createServer((request, response) => {
  // 2. 解析 request.url
  // console.error(request.url)  // /search?a=1
  let res = url.parse(request.url, true)
  console.error(res)
  /* res  url.parse(request.url)
    Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?a=1',
    query: 'a=1',
    pathname: '/search',
    path: '/search?a=1',
    href: '/search?a=1'
  }

  res url.parse(request.url, true) 可以将query变为对象形式
  Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?a=1',
    query: [Object: null prototype] { a: '1' },
    pathname: '/search',
    path: '/search?a=1',
    href: '/search?a=1'
  }
  */
  // 路径
  let pathname = res.pathname
  let keyword = res.query.a

  response.end('hello, http') // 设置响应体
})

server.listen(9000, () => {
  console.error('服务已启动')
})
```

2.new URL()

```js
const http = require('http')
const server = http.createServer((request, response) => {
  // let url = new URL('http://www.xx.com/search?a=1&b=2')
  /* 
    URL {
      href: 'http://www.xx.com/search?a=1&b=2',
      origin: 'http://www.xx.com',
      protocol: 'http:',
      username: '',
      password: '',
      host: 'www.xx.com',
      hostname: 'www.xx.com',
      port: '',
      pathname: '/search',
      search: '?a=1&b=2',
      searchParams: URLSearchParams { 'a' => '1', 'b' => '2' },
      hash: ''
    }
  */
  // let url = new URL('/search?a=1&b=2', 'http://127.0.0.1:9000')
  /* 
    URL {
      href: 'http://127.0.0.1:9000/search?a=1&b=2',
      origin: 'http://127.0.0.1:9000',
      protocol: 'http:',
      username: '',
      password: '',
      host: '127.0.0.1:9000',
      hostname: '127.0.0.1',
      port: '9000',
      pathname: '/search',
      search: '?a=1&b=2',
      searchParams: URLSearchParams { 'a' => '1', 'b' => '2' },
      hash: ''
    }
  */

  let url = new URL(request.url, 'http://127.0.0.1:9000')
  /* 
    URL {
      href: 'http://127.0.0.1:9000/search?a=1',
      origin: 'http://127.0.0.1:9000',
      protocol: 'http:',
      username: '',
      password: '',
      host: '127.0.0.1:9000',
      hostname: '127.0.0.1',
      port: '9000',
      pathname: '/search',
      search: '?a=1',
      searchParams: URLSearchParams { 'a' => '1' },
      hash: ''
    }
  */

  console.error(url.pathname)
  console.error(url.searchParams.get('a'))
  response.end('hello, http')
})

server.listen(9000, () => {
  console.error('服务已启动')
})
```

```js
const http = require('http')
const server = http.createServer((request, response) => {
  let { method } = request
  let { pathname } = new URL(request.url, 'http:.//127.0.0.1:9000')

  response.setHeader('content-type', 'text/html;charset=utf-8')

  if (method === 'GET' && pathname === '/login') {
    response.end('登录页面')
  } else if (method === 'GET' && pathname === '/reg') {
    response.end('注册页面')
  } else {
    response.end('404 NOT FOUND')
  }
})

server.listen(9000, () => {
  console.error('服务已启动')
})
```

### 设置响应报文

```js
const http = require('http')
const server = http.createServer((request, response) => {
  // 1. 设置响应状态码
  response.statusCode = 203
  // 2. 响应状态的描述  用不到
  response.statusMessage = 'aaaa'
  // 3.响应头
  response.setHeader('content-type', 'text/html;charset=utf-8')
  response.setHeader('Server', 'Node.js')
  response.setHeader('myHeader', 'test tsst')
  response.setHeader('test', ['a', 'b', 'c'])

  // 4.响应体的设置 write 可多次设置 无需end里面内容
  response.write('hahah')
  response.write('hahah')
  response.write('hahah')
  response.write('hahah')

  // 有且只能一个 end
  response.end()
})

server.listen(9000, () => {
  console.error('服务已启动')
})
```

### 小小体验

```js
const http = require('http')
const server = http.createServer((request, response) => {
  response.end(`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <style>
      td {
        padding: 20px 40px;
        border: 1px solid;
      }
    
      table tr:nth-child(odd) {
        background-color: pink;
      }
    
      table tr:nth-child(even) {
        background-color: #fcb;
      }
    
      table,
      td {
        border-collapse: collapse;
      }
    </style>
    
    <body>
      <table>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    
      <script>
        let tds = document.querySelectorAll('td')
    
        tds.forEach(item => {
          item.onclick = function () {
            this.style.background = '#222'
          }
        })
      </script>
    </body>
    
    </html>
  `)
})

server.listen(9000, () => {
  console.error('服务已启动')
})
```

分离 html

```js
// index.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<style>
  td {
    padding: 20px 40px;
    border: 1px solid;
  }

  table tr:nth-child(odd) {
    background-color: pink;
  }

  table tr:nth-child(even) {
    background-color: #fcb;
  }

  table,
  td {
    border-collapse: collapse;
  }
</style>

<body>
  <table>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </table>

  <script>
    let tds = document.querySelectorAll('td')

    tds.forEach(item => {
      item.onclick = function () {
        this.style.background = '#222'
      }
    })
  </script>
</body>

</html>

// http.js
const http = require('http')
const fs = require('fs')
const server = http.createServer((request, response) => {
  let html = fs.readFileSync(__dirname + '/index.html')
  response.end(html)
})

server.listen(9000, () => {
  console.error('服务已启动')
})
```

再次分离 css js

```html
// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./index.css" />
  </head>

  <body>
    <table>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>

    <script src="./index.js"></script>
  </body>
</html>
```

```css
// index.css
td {
  padding: 20px 40px;
  border: 1px solid;
}

table tr:nth-child(odd) {
  background-color: pink;
}

table tr:nth-child(even) {
  background-color: #fcb;
}

table,
td {
  border-collapse: collapse;
}
```

```js
// index.js
let tds = document.querySelectorAll('td')

tds.forEach(item => {
  item.onclick = function () {
    this.style.background = '#222'
  }
})
```

```js
const http = require('http')
const fs = require('fs')
const server = http.createServer((request, response) => {
  let { pathname } = new URL(request.url, 'http://127.0.0.1:9000')
  if (pathname === '/') {
    let html = fs.readFileSync(__dirname + '/index.html')
    response.end(html)
  } else if (pathname === '/index.css') {
    let css = fs.readFileSync(__dirname + '/index.css')
    response.end(css)
  } else if (pathname === '/index.js') {
    let js = fs.readFileSync(__dirname + '/index.js')
    response.end(js)
  } else {
    response.statusCode = 404
    response.end('404')
  }
})

server.listen(9000, () => {
  console.error('服务已启动')
})
```

### 搭建静态资源服务

```js
const http = require('http')
const fs = require('fs')
const server = http.createServer((request, response) => {
  let { pathname } = new URL(request.url, 'http://127.0.0.1:9000')
  // 拼接文件路径
  let filePath = __dirname + '/pages' + pathname

  // console.error(filePath)

  // 读取文件 fs 异步 API
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err)
      response.setHeader('content-type', 'text/html;charset=utf-8')
      response.end('读取文件失败')
      return
    }
    response.end(data)
  })
})

server.listen(9000, () => {
  console.error('服务已启动')
})
```

### 设置资源类型

content-type 的值

- application/json：JSON 数据格式；
- application/x-www-form-urlencoded：表单默认的提数据格式；
- multipart/form-data：一般用于文件上传
- application/pdf：pdf 格式
- application/msword：Word 文档格式
- application/octet-stream：二进制流数据（如常见的文件下载）
-

- text/html： HTML 格式
- text/plain：纯文本格式
- text/xml： XML 格式
-

- image/gif ：gif 图片格式
- image/jpeg ：jpg 图片格式
- image/png：png 图片格式
-

- audio/x-wav：wav 文件
- audio/x-ms-wma：w 文件
- audio/mp3：mp3 文件
- video/x-ms-wmv：wmv 文件
- video/mpeg4：mp4 文件
- video/avi：avi 文件

根据文件后缀名获取，然后设置，更规范

```js
const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
}

const server = http.createServer((request, response) => {
  let { pathname } = new URL(request.url, 'http://127.0.0.1:9000')
  let root = __dirname + '/pages'
  // 拼接文件路径
  let filePath = root + pathname

  console.error(filePath)

  // 读取文件 fs 异步 API
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err)
      response.setHeader('content-type', 'text/html;charset=utf-8')
      response.end('读取文件失败')
      return
    }
    let ext = path.extname(filePath).slice(1)

    // console.error(ext)

    let type = mime[ext]

    if (type) {
      response.setHeader('content-type', type + ';charset=utf-8')
    } else {
      response.setHeader('content-type', 'application/octet-stream')
    }

    response.end(data)
  })
})

server.listen(9000, () => {
  console.error('服务已启动')
})
```

### 错误处理

```js
const server = http.createServer((request, response) => {
  if (request.method !== 'GET') {
    response.statusCode = 405
    response.end('Method Not Allowed')
    return
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.setHeader('content-type', 'text/html;charset=utf-8')

      switch (err.code) {
        case 'ENOENT':
          response.statusCode = 404
          response.end('读取文件失败')
        case 'EPERM':
          response.statusCode = 403
          response.end('Forbidden')
        default:
          response.statusCode = 500
          response.end('500')
      }

      return
    }
    response.end(data)
  })
})
```

## 模块化

### 使用

- module.exports
  - 可以暴露任意数据
- exports
  - 不能使用 `exports = value` exports = module.exports = {}
  - require 返回的结果 是 module.exports 的值

1.

```js
// me.js
function a() {
  console.error('aaaaaaa')
}

module.exports = a

// index.js
const me = require('./me.js')

me()
```

2.module.exports

```js
// me.js
function a() {
  console.error('aaaaaaa')
}

function b() {
  console.error('bbbbbb')
}

module.exports = {
  a,
  b,
}
---------------------------
// index.js
const me = require('./me.js')

me.a()
me.b()
```

3exports

```js
function a() {
  console.error('aaaaaaa')
}

function b() {
  console.error('bbbbbb')
}

exports.a = a
exports.b = b
```

### 导入文件模块

1. 自己模块建议 相对路径 `./ ../`,不可省略
2. js 和 json 文件后缀可省略 js -> json
3. 如果导入的路径是文件夹，首先检测 package.json 中的 main 属性对应的文件，如果存在则导入，不存在报错  
   如果 main 属性不存在，或者 package.json 不存在，则会尝试导入文件夹下的 index.js 和 index.json，如果还没找到，报错
4. 导入 nodejs 内置模块时，直接 require 模块名字即可

### CommonJS 规范

module.exports、exports、 require 是一种规范  
nodejs 实现了 CommonJS 规范

### 包管理工具

- npm
- yarn
- pnpm

#### 初始化

`npm init`
`npm init -y` 默认值创建

#### 开发依赖和生产依赖

默认为 -S

1. 生产依赖
   - 开发 + 生产 所需要的依赖
   - `npm i jquery -S` `npm i jquery --save`
   - 保存在 dependencies 属性
2. 开发依赖
   - 开发所需要的依赖
   - `npm i less -D` `npm i less --save--dev`
   - 保存在 devDependencies 属性

#### nvm

(下载连接)[https://github.com/coreybutler/nvm-windows/releases]

1. 如果已安装 Node, 先卸载 Node 环境变量删除， 全局依赖和缓存删除 重启？

- C:\Program Files (x86)\Nodejs
- C:\Program Files\Nodejs
- C:\Users\{User}\AppData\Roaming\npm
- C:\Users\{User}\AppData\Roaming\npm-cache
- C:\Users\{User}\AppData\local

  ...

1. 下载到 D 盘 nvm -> `D:\soft\nvm` nodejs -> `D:\soft\nodejs`
2. nvm setting.txt 设置淘宝镜像
   - `node_mirror: https://npmmirror.com/mirrors/node/`
   - `npm_mirror: https://npmmirror.com/mirrors/npm/`
3. 指令

   - `nvm list` 查看已安装的版本和正在使用的版本
   - `nvm list available` 查看可通过 nvm 安装的 Node.js 版本
   - `nvm install 版本号` 安装指定版本的 Node.js
   - `nvm use 版本号` 切换为指定版本的 Node.js
   - `nvm uninstall 版本号` 卸载指定版本的 Node.js

##### npm

1. 配置全局依赖安装位置以及缓存位置

   - `npm config set prefix "D:\soft\nodeCache\npm\node_global"`
   - `npm config set cache "D:\soft\nodeCache\npm\node_cache"`

2. 配置环境变量

   - 用户变量 `D:\soft\nodeCache\npm\node_global`
   - 系统变量 `NODE_PATH`---`D:\soft\nodeCache\npm\node_global\node_modules`

3. 设置源
   `npm config set registry https://registry.npmmirror.com/`
4. 命令

- `npm ls -g --depth 0` 查看全局安装的包
- `npm config list` 查看配置

##### yarn

1. `npm install yarn -g`

- `yarn global bin` 查看 yarn 全局 bin 位置(prefix)
- `yarn global dir` 查看 yarn 全局安装位置(folder)
- `yarn cache dir` 查看 yarn 全局 cache 位置(cache)
- `yarn config list` 查看配置列表
- `yarn global add <>` 全局安装
- `yarn global remove <>` 全局卸载

2. `yarn cache dir` 位置删除

3. 修改 yarn 路径

   - `yarn config set prefix "D:\soft\nodeCache\yarn\global"`
   - `yarn config set global-folder "D:\soft\nodeCache\yarn\global"`
   - `yarn config set cache-folder "D:\soft\nodeCache\yarn\cache"`

4. 用户变量 `D:\soft\nodeCache\yarn\global\bin`
5. 设置源
   - `yarn config set registry https://registry.npmmirror.com/`
   - `yarn config delete proxy` 删除代理，防止 info

##### pnpm

1.  `npm i pnpm -g`

- `pnpm config set store-dir "D:\soft\nodeCatch\npm\.pnpm-store"`
- `pnpm config set global-dir "D:\soft\nodeCatch\npm\pnpm_global" // pnpm 全局安装路径`
- `pnpm config set global-bin-dir "D:\soft\nodeCatch\npm\pnpm_bin_dir" // pnpm 全局 bin 路径`
- `pnpm config set state-dir "D:\soft\nodeCatch\npm\pnpm_state_dir" // pnpm 创建 pnpm-state.json 文件的目录`
- `pnpm config set cache-dir "D:\soft\nodeCatch\npm\pnpm_cache" // pnpm 全局缓存路径`

环境变量 path: `D:\soft\nodeCatch\npm\pnpm_bin_dir`
