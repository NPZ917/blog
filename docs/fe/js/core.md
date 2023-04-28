## 数据类型 & 判断

## 内置对象

## undefined & null

## 原型 & 原型链

## 作用域 & 作用域链 & 闭包

## 异步 & 单线程

## 事件循环机制/Event Loop

## 面向对象 & 继承

## 跨域
### 是什么
- 当协议 、域名 、 端口中任意一个与当前页面的地址不同的就是跨域
- 最常见的跨域就是一个域名的网页中调用另一个域名的资源
### 为什么
浏览器出于安全原因，用同源策略，对js进行了限制，防止恶意用户获取非法数据, 防止大部分 XSS 攻击 (用户接口注入 js 脚本)
### 解决
1. JSONP 
  - img script 没有跨域限制，通过动态添加script 标签，通过src 进行跨域请求
  - 只支持 GET
  - 后端需要知道前端的 cb 结构, 需要知道参数和回调函数的名字
  - 后端需要进行参数和回调函数拼接后才能执行
```js
function  (data) {
  console.log(data)
}
var body = document.getElementByTagName('body')[0]
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = 'http://example.com?jsonp=cb'
body.appendChild(script)
```
2. 服务器代理 CROS
   -  Cross Origin Resource Sharing
   -  服务器设置响应头 `Access-Control-Allow-Origin` `Access-Control-Request-Method`  `Access-Control-Request-Headers` 等
   -  非简单请求 => 预请求
3. 中间件 ？？？
4. Nginx 反向代理
```js
server
  {
    listen 8000;
    server_name svsapi.svsmarkets.com;
    # root   /var/www/SFWEBSITE/API/public;  
    index index.php index.htm index.html;
    location ~ \.php$ {
      add_header Access-Control-Allow-Origin *; //关键
      add_header Access-Control-Allow-Headers Content-Type,access-token,language,Cookie; //关键
      add_header Access-Control-Allow-Method GET,POST,OPTIONS; //关键
      root   /var/www/SFWEBSITE/API/public;
      fastcgi_pass   127.0.0.1:9001;
      fastcgi_index  index.php;
      fastcgi_param  SCRIPT_FILENAME   $document_root$fastcgi_script_name;
      include        fastcgi_params;
    }
    location / {
      if (!-f $request_filename){
        rewrite ^(.*)$ /index.php?$1 last;
        break;
      }
    }
    error_log  /usr/local/nginx/logs/error_svsapi_svsmarkets_com_log;
    access_log  /usr/local/nginx/logs/access_svsapi_svsmarkets_com_log;
}
```

## 存储

## 柯里化
- 将使用多个参数的一个函数转换成一系列使用一个参数的函数
- 用闭包把参数保存起来，当参数的数量足够执行函数了，就开始执行函数。
- 判断当前函数传入的参数是否大于或等于fn需要参数的数量，如果是，直接执行fn
- 如果传入参数数量不够，返回一个闭包，暂存传入的参数，并重新返回currying函数
```js
function currying(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args);
  } else {
    return (...arg) => currying(fn, ...args, ...arg);
  }
}

function add(a, b, c) {
  return a + b + c
}

const curryingAdd = currying(add);


curryingAdd(1, 2)(3)
```

## 执行上下文

## new
1. 创建一个空对象
2. 将对象和函数通过原型链关联
3. 将构造函数的this绑定到空对象上
4. 返回obj
```js
function myNew(fn, ...args) {
  if(typeof(fn) !== 'function') throw '第一个参数为函数'

  let obj = {
    __proto__: fn.prototype
  }
  // console.error(args);

  fn.apply(obj, args)
  return obj
}


function Person(name, age) {
  this.name = name;
  this.age = age;
  this.say = function() {
    console.error(this.name);
  }
}

const person = myNew(Person, '小明', '12')
```

## 数组扁平化
```js
function flat(arr, num = 1) {
  let result = []
  arr.forEach((item) => {
    if (Array.isArray(item) && num > 0) {
      result = result.concat(flat(item, num - 1))
    } else {
      result.push(item)
    }
  })
}
```

## 数组字符串对象方法
1. 数组
  - shift & unshift
  - pop & push
  - slice & splice
  - join 
  - concat
  - reverse
  - sort
  - indexOf
  - forEach map reduce filter some every find findIndex Array.from Array.of Array.isArray
  - keys entries values flat flatMap includes
2. 字符串
  - slice
  - split
  - concat
  - includes
3. 对象
  - 
```js
/**
 * string
 *  - substr  开始位置 - 结束位置前一个  左闭右开  不影响原字符串
 *    str.substring(indexStart[, indexEnd])
 *    -- 任意参数为负数，都置为0
      -- 如果任意参数大于字符串长度，则被当做字符串长度
      -- 如果indexStart大于indexEnd，则位置调换
      -- 如果indexStart等于indexEnd，则返回空字符串
      -- 如果省略indexEnd，则截取到字符串末尾。
 *  - slice   开始位置 - 结束位置前一个  左闭右开   不影响原字符串
      -- 如果indexStart为负数，则用字符串长度+indexStart代替
      -- 如果indexEnd为负数，则用字符串长度+endStart代替
      -- 如果indexEnd小于startEnd，返回空字符串
      -- 如果省略indexEnd，则截取到字符串末尾
 */

var str = '123456789'

// console.error('slice---' + str.slice(0, 5))
// console.error('substring---' + str.substring(0, 5))
// console.error(str)
/**
 * Array
 *  - slice  开始位置 - 结束位置前一个 原数组的浅拷贝  
 *    - (在某些情况下修改返回的新数组，会影响原数组)
 *    - array.slice([indexStart[, indexEnd]])
 *      -- 如果省略indexStart，则从0开始；如果省略indexEnd，则截取到数组末尾。
        -- 如果indexStart为负数，则用数组长度+indexStart代替。
        -- 如果indexStart超出数组索引范围，则返回空数组。
        -- 如果indexStart大于indexEnd，则返回空数组。
        -- 如果indexEnd超出数组索引范围，则截取到数组末尾。
 *  - splice 可以对数组实现增删改操作，会改变原数组；
      - array.splice(start[, deleteCount[, item1[,item2[, ...]]]])

 */

let arr = [1, 2, 3, 4]
// console.error(arr.slice(0, 3))
// console.error(arr.slice(0))
// console.error(arr)

// console.error(arr.splice(0, 2))
console.error(arr.splice(0, 0, 5, 6))
console.error(arr)

```

## arguments 对象

## 防抖节流
1. 防抖 debounce
  - 触发一次函数后的规定时间内没有再次触发
  - 1.窗口大小变化，调整样式 2.搜索框，输入后1000毫秒搜索 3.表单验证，输入1000毫秒后验证
```js
function debounce(fn, time) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}

debounce(validator, 1000)
--------------------------------
// 有时候需要函数立即执行一次。给一个flag标识是否立即执行
// 当定时器变量timer为空时，说明是第一次执行，立即执行
function debounce(fn, time, flag) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    if (flag && !timer) {
      fn.apply(this, args)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}
```

2. 节流 throttle
 - 连续触发事件，在规定时间只执行一次
 - 滚动加载，加载更多或滚到底部监听
```js
function throttle(func, wait) {
  let preTime = 0
  return function () {
    let args = [...arguments]
    let now = new Date()

    if (now - preTime > wait) {
      func, apply(this, args)
      preTime = now
    }
  }
}
```

## async & defer

## this

## call appy bind

## 深浅拷贝

## 基础算法

## 

## 事件流
1. 捕获阶段
2. 目标阶段
3. 冒泡阶段

## 重绘回流