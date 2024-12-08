# [MDN - JS](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

## 数据类型 & 判断

1. number
2. string
3. boolean
4. null
5. undefined
6. symbol
7. bigint
8. Object
   - Object
   - Array
   - RegExp
   - Date
   - Function

判断数据类型

1. typeof

   - 基础类型(null - object) `不同的对象再底层都表示为二进制，js中二进制前三位都为0的化会被判断为object，null的二进制表示全是0`
   - 引用类型除 function 外 => object

2. constructor

   - null 和 undefined 没有 constructor
   - 判断数字时使用(),比如 (123).constructor,如果写成 123.constructor 会报错
   - constructor 在类继承时会出错,因为 Object 被覆盖掉了,检测结果就不对了

3. instanceof

   - A instanceof B 判断 A 是否为 B 的实例
   - 适合判断引用数据类型，基本数据类型全返回 false
   - null instanceof Object -> false
   - [1,2,3] instanceof Array -> true

4. Object.prototype.toString.call(target)

   - 对 toString()方法进行函数借用可以对全部类型进行判断。
   - Object.prototype.toString 可以返回当前调用者的对象类型。`[object, [[clas]]]`
   - 加 call 因为 Object.prototype.toString()返回的是调用者的类型。不论你 toString()本身的入参写的是什么，在 Object.prototype.toString()中，他的调用者永远都是 Object.prototype;所以，在不加 call()情况下，我们的出来的结果永远都是 '[object Object]'

## 原型 & 原型链

![](/fe/js/prototype.png)

1. 构造函数
2. `constructor`
3. `prototype`
4. `__proto__`
5. 实例与原型
6. 原型的原型
7. 原型链

每一个函数(构造函数)都有一个属性 `prototype`，这个属性指向一个对象，即原型对象  
该对象有个属性 `constructor`，指向该函数(构造函数)
通过该函数(构造函数) new 出来的实例，有一个`__proto__`属性，指向函数的`prototype`,  
当访问一个对象的某个属性时，先在本身属性上找，如果找不到，通过 `__proto__`，找到构造函数的原型对象，  
如果还找不到，再在其构造函数的 prototype 的**proto** 中查找，直至找到`Object.prototype.__proto__`(null)这样一层一层查找就会形成一个链式结构，即原型链

::: info
`__proto__` 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。（摘自阮一峰的 ES6 入门）
:::

## 作用域 & 作用域链

- 作用域是指程序源代码中定义变量的区域。
- 词法作用域 就是静态作用域

函数的作用域在函数定义的时候就决定了。

分类

- 全局作用域；
- 函数作用域；
- 块级作用域；let const

js 使用一个变量时，会在当前作用域寻找该变量，没找到，向上层作用域寻找，一直找到全局作用域，全局作用域没找到，抛出错误  
一层层找的过程就是作用域链

## 闭包

- 引用自由变量的函数 自由变量是在函数中使用，既不是函数参数也不是函数的局部变量的变量
- 理论上所有的函数都是闭包
- 实践 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回），在代码中引用了自由变量

```js
var scope = 'global scope'
function checkscope() {
  var scope = 'local scope'
  function f() {
    return scope
  }
  return f
}

var foo = checkscope()
foo()
```

checkscope 执行完出栈后，f 入栈，是因为 f 执行上下文维护了一个作用域链：`Scope:{ AO, checkscopeContext.AO, globalContext.VO}`

应用场景：

- 实现模块化和私有变量
- 缓存数据
- 实现回调函数
- 防抖节流 函数的柯里化

缺点

- 不会被垃圾回收机制回收，有可能内存泄漏

## 异步 & 单线程 & 事件循环机制/Event Loop

进程 是 CPU 资源分配的最小单位，（拥有资源和独立运行最小单位）

线程 是 CPU 调度的最小单位，建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程

浏览器是多进程，5 种进程

- 浏览器进程 界面显示、用户交互、子进程管理、存储功能
- GPU 进程 绘制 UI 界面
- 网络进程 加载页面网络资源
- 插件进程
- 渲染进程 html css js 默认每个标签页开启新的渲染进程，互不影响 => 一个站点一个进程
  - GUI 渲染线程 解析 html css js, 构建 dom 树和 render 树、布局和绘制等
  - JS 引擎线程 解析 js 脚本、运行代码
  - 事件触发线程 辅助 js 引擎，控制事件轮询 鼠标点击、ajax、符合触发条件时，添加到任务队列的末尾，等待 js 引擎处理
  - 定时触发器进程 setTimeout setInterval
  - 异步请求线程 XMLHttpRequest, 回调放置 js 引擎的任务队列，待 js 引擎执行

js 是单线程非阻塞

顺序--

- 第一步： 主线程执行同步任务的同时，把一些异步任务放入‘任务队列’（task queue）中，等待主线程的调用栈为空时，再依次从队列出去任务去执行；
- 第二步：检测任务队列中的微队列是否为空，若不为空，则取出一个微任务入栈执行；然后继续执行第 2 步；如果微队列为空，则开始取出宏队列中的一个宏任务执行；
- 第三步：执行完宏队列中的一个宏任务后，会继续检测微队列是否为空，如果有新插入的任务，这继续执行第二步；如果微队列为空，则继续执行宏队列中的下一个任务，然后再继续循环执行第三步；

- 宏任务： setTimeout setInterval
- 微任务： Promise.then

最新-  
移除了宏队列，微队列 最高、交互队列次之、延时队列高 。。。。。

```js
console.error(1)

setTimeout(() => {
  console.error(9)
  new Promise((resolve, reject) => {
    console.error(10)
    resolve()
  }).then(res => {
    console.error(11)
  })
})

setTimeout(() => {
  console.error(12)
})

new Promise((resolve, reject) => {
  console.error(2)
  resolve()
})
  .then(res => {
    console.error(5)
    setTimeout(() => {
      console.error(13)
    })
  })
  .then(res => {
    console.error(7)
  })

new Promise((resolve, reject) => {
  console.error(3)
  resolve()
})
  .then(res => {
    console.error(6)
    setTimeout(() => {
      console.error(14)
    })
  })
  .then(res => {
    console.error(8)
  })

console.error(4)
```

## 跨域

### 是什么

- 当协议 、域名 、 端口中任意一个与当前页面的地址不同的就是跨域
- 最常见的跨域就是一个域名的网页中调用另一个域名的资源

### 为什么

浏览器出于安全原因，用同源策略，对 js 进行了限制，防止恶意用户获取非法数据, 防止大部分 XSS 攻击 (用户接口注入 js 脚本)

### 解决

1. JSONP

- img script 没有跨域限制，通过动态添加 script 标签，通过 src 进行跨域请求
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

- Cross Origin Resource Sharing
- 服务器设置响应头 `Access-Control-Allow-Origin` `Access-Control-Request-Method` `Access-Control-Request-Headers` 等
- 非简单请求 => 预请求

3. Nginx

```js
server {
  listen 80;
    server_name  www.xxx.com;
    location /api/ {
      proxy_pass http://www.yyy.com:9999; #真实服务器的地址
    }
}
```

4. Vue/React 配置代理（Webpack Vite）

## 柯里化

- 将使用多个参数的一个函数转换成一系列使用一个参数的函数
- 用闭包把参数保存起来，当参数的数量足够执行函数了，就开始执行函数。
- 判断当前函数传入的参数是否大于或等于 fn 需要参数的数量，如果是，直接执行 fn
- 如果传入参数数量不够，返回一个闭包，暂存传入的参数，并重新返回 currying 函数

```js
function currying(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return (...arg) => currying(fn, ...args, ...arg)
  }
}

function add(a, b, c) {
  return a + b + c
}

const curryingAdd = currying(add)

curryingAdd(1, 2)(3)
```

## 执行上下文 & 执行上下文栈

每当 js 代码执行的时候，都是在执行上下文中运行 抽象概念

1. 执行上下文

- 全局执行上下文
- 一个程序中只有一个全局上下文
- 函数执行上下文
- 每当一个函数被调用时, 都会为该函数创建一个新的上下文
- 可以任意多个
- 每当一个新的执行上下文被创建，它会按定义的顺序执行一系列步骤。
- eval() 函数执行上下文

2. 执行栈/(调用栈) -- Execution context stack，ECS

后进先出 LIFO 结构，存储所有的执行上下文

js 脚本执行 全局执行上下文入栈，遇到函数调用，为该函数创建新的执行上下文压入栈. js 引擎会执行那些执行上下文位于栈顶的函数,执行结束后，执行上下文从栈中弹出，执行下一个函数

执行上下文创建的两个阶段: 创建阶段 执行阶段

创建阶段 ES3 [ES3 文章](https://github.com/mqyqingfeng/Blog/issues/8)

- this 值的决定
- 变量对象(Variable object，VO)
- 作用域(Scope)

创建阶段 ES5 [ES5 文章](https://juejin.cn/post/6844903682283143181)

- lexical environment：词法环境，当获取变量时使用。
- variable environment：变量环境，当声明变量时使用。
- this value：this 值。

创建阶段 ES2018 [ES2018 原文](https://link.juejin.cn/?target=https%3A%2F%2Fblog.bitsrc.io%2Funderstanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0) [ES2018 译文](https://juejin.cn/post/7129510217863299102)

- lexical environment：词法环境，当获取变量或者 this 值时使用。
- variable environment：变量环境，当声明变量时使用
- code evaluation state：用于恢复代码执行位置。
- Function：执行的任务是函数时使用，表示正在被执行的函数。
- ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码。
- Realm：使用的基础库和内置对象实例。
- Generator：仅生成器上下文有这个属性，表示当前生成器。

这就 解释了为什么变量提升 以及闭包(主要是`[[Scope]]`)

执行阶段完成多有变量的分配，最后执行代码

```js
// ES3
变量对象会包括
1. 函数的所有形参 (如果是函数上下文)
  1.1 由名称和对应值组成的一个变量对象的属性被创建
  1.2 没有实参，属性值设为 undefined

1. 函数声明
  2.1由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
  2.2如果变量对象已经存在相同名称的属性，则完全替换这个属性

1. 变量声明
  3.1 由名称和对应值（undefined）组成一个变量对象的属性被创建；
  3.2 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};
  b = 3;
}

foo(1);

AO = {
  arguments: {
    0: 1,
    length: 1
  },
  a: 1,
  b: undefined,
  c: reference to function c(){},
  d: undefined
}

执行后
AO = {
  arguments: {
      0: 1,
      length: 1
  },
  a: 1,
  b: 3,
  c: reference to function c(){},
  d: reference to FunctionExpression "d"
}
```

## 作用域 VS 上下文

- 作用域: 静态的, 函数声明时就确定了, 一旦确定就不会变化了
- 执行上下文: 动态的, 执行代码时动态创建, 当执行结束消失

## new

1. 创建一个空对象
2. 将对象和函数通过原型链关联
3. 将构造函数的 this 绑定到空对象上
4. 返回 obj

```js
function myNew(fn, ...args) {
  if (typeof fn !== 'function') throw '第一个参数为函数'

  let obj = {
    __proto__: fn.prototype,
  }
  // console.error(args);

  fn.apply(obj, args)
  return obj
}

function Person(name, age) {
  this.name = name
  this.age = age
  this.say = function () {
    console.error(this.name)
  }
}

const person = myNew(Person, '小明', '12')
```

## 数组扁平化

```js
1. flat // ES2019+ 支持

const arr = [1, [2, [3, 4]]]

// 展开一层
arr.flat() // [1, 2, [3, 4]]

// 展开多层
arr.flat(2) // [1, 2, 3, 4]

// 展开所有层
arr.flat(Infinity) // [1, 2, 3, 4]

2. 递归
function flatten(arr) {
  let result = []
  arr.forEach(item => {
    if (Array.isArray(item)) result = [...result, ...flatten(item)]
    else result.push(item)
  })
  return result
}

// 使用
flatten([1, [2, [3, 4]]])  // [1, 2, 3, 4]

3. reduce
function flatten(arr) {
  return arr.reduce((prev, curr) => {
    return prev.concat(Array.isArray(curr) ? flatten(curr) : curr)
  }, [])
}

// 使用
flatten([1, [2, [3, 4]]])  // [1, 2, 3, 4]
```

## 数组字符串对象方法

1. 数组

```js
1. 增删改查类方法
// 增加元素
push()      // 末尾添加元素，返回新长度
unshift()   // 开头添加元素，返回新长度

// 删除元素
pop()       // 删除末尾元素，返回被删除项
shift()     // 删除开头元素，返回被删除项

// 增删改
splice()    // 任意位置增删改，返回被删除项数组

2. 查找和包含类方法
// 查找元素
indexOf()     // 查找元素索引(从前往后)
lastIndexOf() // 查找元素索引(从后往前)
find()        // 返回第一个满足条件的元素
findIndex()   // 返回第一个满足条件的元素的索引
findLast()    // 返回最后一个满足条件的元素
findLastIndex() // 返回最后一个满足条件的元素的索引

// 包含检查
includes()    // 检查数组是否包含某个值

3. 遍历类方法
// 遍历
forEach()     // 遍历数组
map()         // 映射新数组
filter()      // 过滤符合条件的元素
every()       // 是否所有元素都满足条件
some()        // 是否存在元素满足条件

// 迭代器方法
entries()     // 返回键值对迭代器
keys()        // 返回索引迭代器
values()      // 返回值迭代器

4. 归并类方法
reduce()      // 从左到右归并
reduceRight() // 从右到左归并

5. 排序类方法
sort()        // 排序数组
reverse()     // 反转数组

6. 转换类方法
// 数组转字符串
join()        // 指定分隔符连接
toString()    // 转换为字符串
toLocaleString() // 转换为本地字符串

// 数组转换
flat()        // 扁平化数组
flatMap()     // 映射后扁平化

7. 复制和合并类方法

// 复制
slice()       // 浅复制数组的一部分
copyWithin()  // 复制数组的一部分到同一数组中的另一个位置

// 合并
concat()      // 合并多个数组

8. 填充类方法
fill()        // 用固定值填充数组

9. 静态方法
// 创建数组
Array.from()    // 从类数组对象或可迭代对象创建数组
Array.of()      // 将一组值转换为数组

// 类型判断
Array.isArray() // 判断是否为数组


10. 实验性/新特性方法
// ES2023+
toReversed()   // 返回反转的新数组(不修改原数组)
toSorted()     // 返回排序的新数组(不修改原数组)
toSpliced()    // 返回修改的新数组(不修改原数组)
with()         // 返回替换指定索引的新数组(不修改原数组)
```

```js
1. 对象属性描述符相关
Object.defineProperty()      // 定义单个属性及其描述符
Object.defineProperties()    // 定义多个属性及其描述符
Object.getOwnPropertyDescriptor()    // 获取属性描述符
Object.getOwnPropertyDescriptors()   // 获取所有属性的描述符

2. 属性操作
Object.assign()       // 合并对象
Object.create()       // 创建新对象，使用现有对象作为新对象的原型
Object.keys()         // 返回可枚举属性名数组
Object.values()       // 返回可枚举属性值数组
Object.entries()      // 返回可枚举属性的[key, value]数组
Object.fromEntries()  // 将[key, value]数组转换为对象
Object.getOwnPropertyNames()  // 返回所有自有属性名(包括不可枚举)
Object.getOwnPropertySymbols() // 返回所有Symbol属性

3. 对象状态控制
Object.preventExtensions()  // 防止添加新属性
Object.seal()              // 封闭对象(不能添加/删除属性，但可以修改现有属性)
Object.freeze()            // 冻结对象(不能添加/删除/修改属性)
Object.isExtensible()      // 判断是否可扩展
Object.isSealed()          // 判断是否封闭
Object.isFrozen()          // 判断是否冻结

4. 原型相关
Object.getPrototypeOf()    // 获取对象的原型
Object.setPrototypeOf()    // 设置对象的原型
Object.prototype.hasOwnProperty()    // 判断是否为自有属性
Object.prototype.isPrototypeOf()     // 判断是否在原型链上
Object.prototype.propertyIsEnumerable() // 判断属性是否可枚举

5. 对象转换/检测
Object.prototype.toString()     // 转换为字符串
Object.prototype.valueOf()      // 返回对象的原始值
Object.prototype.toLocaleString() // 转换为本地字符串
Object.is()                    // 判断两个值是否相同

6. 遍历相关
for...in               // 遍历可枚举属性(包括原型链)
Object.keys()          // 返回可枚举属性数组
Object.values()        // 返回可枚举属性值数组
Object.entries()       // 返回可枚举属性键值对数组

7. 其他
hasOwn()              // 检查对象是否具有自己的属性(ES2022)
Object.assign()       // 对象合并
Object.create(null)   // 创建一个没有原型的对象
```

```js
1. 查找/搜索相关
// 位置查找
indexOf()      // 返回指定值第一次出现的位置
lastIndexOf()  // 返回指定值最后一次出现的位置
search()       // 返回正则表达式匹配的第一个位置

// 内容检查
includes()     // 判断字符串是否包含指定值
startsWith()   // 判断是否以指定值开头
endsWith()     // 判断是否以指定值结尾
match()        // 正则表达式匹配
matchAll()     // 返回所有匹配的迭代器

2. 提取/截取相关
// 截取
slice(start, end)     // 提取字符串的一部分，支持负索引
substring(start, end) // 提取字符串的一部分，不支持负索引
substr(start, length) // 从指定位置提取指定长度(已废弃)

// 分割
split()        // 将字符串分割成数组

3. 修改/转换相关
// 大小写转换
toLowerCase()   // 转小写
toUpperCase()   // 转大写
toLocaleLowerCase()  // 根据本地语言转小写
toLocaleUpperCase()  // 根据本地语言转大写

// 去除空格
trim()          // 去除两端空格
trimStart()     // 去除开头空格
trimEnd()       // 去除结尾空格
trimLeft()      // 去除左侧空格(同trimStart)
trimRight()     // 去除右侧空格(同trimEnd)

// 填充
padStart()      // 开头填充
padEnd()        // 结尾填充

// 重复
repeat()        // 重复字符串指定次数

// 替换
replace()       // 替换第一个匹配项
replaceAll()    // 替换所有匹配项

4. 字符相关
// 字符访问
charAt()        // 返回指定位置的字符
charCodeAt()    // 返回指定位置的Unicode值
codePointAt()   // 返回指定位置的码点值

// 字符串拼接
concat()        // 连接两个或多个字符串

5. 其他方法
// 转换
toString()      // 转换为字符串
valueOf()       // 返回原始值

// 本地化
localeCompare() // 比较两个字符串在当前语言环境下的顺序
normalize()     // Unicode 归一化
```

## 防抖节流

1. 防抖 debounce

- 触发一次函数后的规定时间内没有再次触发
- 1.窗口大小变化，调整样式 2.搜索框，输入后 1000 毫秒搜索 3.表单验证，输入 1000 毫秒后验证

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
  return function (...args) {
    let now = new Date()

    if (now - preTime > wait) {
      func.apply(this, args)
      preTime = now
    }
  }
}
```

## this

this 的值是动态的，执行的时候确定的

1. 全局环境 / 普通函数中直接调用

- 严格模式下，this 指向 undefined;
- 非严格模式下 this 指向 window;、

2. 作为对象的方法

```js
var a = 1;
var obj = {
  a: 2,
  b: function() {
    return this.a;
  }
}
console.log(obj.b())//2

----------------------
var a = 1;
var obj = {
  a: 2,
  b: function() {
    return this.a;
  }
}
var t = obj.b;
console.log(t());//1
```

3. 作为构造函数
   指向 new 实例对象
4. 箭头函数
   没有 this, 内部的 this 是上层作用域中的 this，是固定的
5. 使用 apply 和 call，bind

## call appy bind

改变 this 指向

- `.call(context, arg1, arg2, ...)`
- `.apply(context, [argsArray])`
- `.bind(context, arg1, arg2, ...)` 返回一个新的函数，需要再次调用

## 深浅拷贝

- 浅拷贝：一般指的是把对象的第一层拷贝到一个新对象上去
- 一般需要借助递归实现，如果对象的值还是个对象，要进一步的深入拷贝，完全替换掉每一个复杂类型的引用。
  - JSON.parse(JSON.stringify())

缺点

- 时间对象 -> 字符串形式
- RegExp 、Error、Set、Map -> 空对象
- 函数， undefined -> 丢失
- NaN、infinity 和-Infinity -> null

```js
// 浅拷贝
// 展开运算符
function shallowClone(obj) {
  return { ...obj }
}
// Object.assign()
function shallowClone(obj) {
  return Object.assign({}, obj)
}
```

```js
// 深拷贝
function deepCopy(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  // 判断是数组还是对象
  const isArray = Array.isArray(obj)
  const copy = isArray ? [] : {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key])
    }
  }

  return copy
}

const original = { a: 1, b: { c: 2 } }
const copy = deepCopy(original)

console.log(original === copy) // false
console.log(original.b === copy.b) // false
```

## 事件流

1. 捕获阶段
2. 目标阶段
3. 冒泡阶段

## 重绘回流

- 重绘: 样式的变化、却并未影响其几何属性（比如修改了颜色或背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式。这个过程叫做重绘。只改变外观、风格，不影响布局，会引发重绘
- 回流: DOM 几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后再将计算的结果绘制出来。这个过程就是回流（也叫重排）

回流必将引起重绘，重绘不一定会引起回流。

常见的回流：

- 添加或者删除可见的 DOM 元素；
- 元素尺寸改变——边距、填充、边框、宽度和高度;
- 浏览器窗口尺寸改变——resize 事件发生时
- 计算 offsetWidth 和 offsetHeight 属性

## async/defer preload/prefetch

- async 异步加载，脚本加载完成后，立即执行 js 脚本，适合独立无依赖的代码
- defer 异步加载，脚本的执行会等到 HTML 解析完成之后
- preload 预加载-马上使用，立即加载(不会执行) 配合 as 使用，
- prefetch 预加载-未来使用，空闲时间加载(不会执行) 配合 as 使用，

## Cookie localStorage sessionStrorage

cookie

- Secure 仅在 HTPPS 安全通信时才会发送 cookie
- HttpOnly 使用 Cookie 不能被 js 脚本访问 （防止 xss）
- SameSite 防止 CORF
  - Strict 浏览器完全禁止第三方请求携带 cookie
  - Lax 只能在 get 提交表单、a 标签 get 请求、携带 Cookie
  - None 默认 请求自动携带 Coookie

|    特性    |      Cookie      |      localStorage      | sessionStrorage |
| :--------: | :--------------: | :--------------------: | :-------------: |
|  生命周期  |   根据失效时间   | 除非手动清除，永久有效 |  关闭页面失效   |
|  存放大小  |     4kb 左右     |        一般 5M         |     一般 5M     |
| 服务器通信 | 同源请求始终携带 |           -            |        -        |

## 继承

1. 原型链继承

- 子类的原型指向父类的实例 || 子类.prototype = new 父类()
- 父类的引用属性会被所有子类实例共享，容易造成属性污染

```js
function Parent() {}
function Child() {}
Child.prototype = new Parent()
```

2. 构造函数继承

- 只能继承父类实例属性和方法
- 无法继承父类原型上的方法，每次创建子类实例都要调用一个父类的构造函数，影响性能

```js
function Parent() {}
function Child() {
  Parent.call(this)
}
```

3. 组合继承

- 每次创建子类实例调用两次父类构造函数

```js
function Parent() {}
function Child() {
  Parent.call(this)
}
Child.prototype = new Parent()
Child.prototype.constructor = Child
```

4. 原型式继承

- 容易造成属性污染，无法实现复杂的继承关系。

```js
var parent = {
  name: 'parent',
  sayName: function () {
    console.log(this.name)
  },
}
var child = Object.create(parent)
```

5. 寄生式继承

- 容易造成属性污染，增强对象和原型之间的关系不够清晰。

```js
var parent = {
  name: 'parent',
  sayName: function () {
    console.log(this.name)
  },
}
function createChild(parent) {
  var child = Object.create(parent)
  child.sayName = function () {
    console.log(this.name.toUpperCase())
  }
  return child
}
var child = createChild(parent)
```

6. 寄生组合式继承

- 构造函数 + 寄生
- 实现比较复杂。

```js
function Parent() {}
function Child() {
  Parent.call(this)
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
```

7. class 继承

- 无法继承父类私有属性和方法。

```js
class Parent {
  sayName() {
    console.log('parent')
  }
}
class Child extends Parent {
  sayName() {
    super.sayName()
    console.log('child')
  }
}
var child = new Child()
child.sayName() // parent child
```
