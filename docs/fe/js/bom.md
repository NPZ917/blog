# BOM
浏览器对象模型  
- `window` 对象为顶层对象，其他为其子对象
- `history` 历史对象
- `location` 地址对象
- `navigator` 对象提供有关浏览器的各种信息
- `screen` 对象提供显示器屏幕相关的一些信息
- `document` 当前浏览器窗口中的网页文档
- `frames[]` 

## window
- alert () 警告框。
- confirm() 对话框。
- setInterval() 定时器循环
- setTimeout() 定时器一次
- clearInterval() 取消由setInterval()设置的timeID。
- clearTimeout() 取消由setTimeout()方法设置的timeID。
- scrollTo() 浏览器滚动到指定的位置。

## history

- length       url 记录个数
- go()     
- back()
- forward()
- history.pushState(state, title[, url])
- replaceState()

```js
const state = { 'page_id': 1, 'user_id': 5 }
const title = ''
const url = 'hello-world.html'

history.pushState(state, title, url)

window.onpopstate = function (event) {
  // 获取存储的状态
  var params = event.state; // {page_id: 1, user_id: 5}
  console.error(params);
};
```

## location 
- protocol 协议部分 包含 `:` http(s):
- host 主机名和端口 www.baidu.com:8080
- hostname: 主机名部分 www.baidu.com
- port 端口 8080
- pathname: /index.html
- search 参数部分 ?a=1&b=2
- hash 锚点部分 包括前导符 `#`

```js
// 1
let params = new URL(location.href).searchParams;
let [a, b] = [params.get('a'), params.get('b')];

// 2
let params = new URLSearchParams(location.search);
let [a, b] = [params.get('a'), params.get('b')];
```
## navigator
- userAgent  客户端发送服务器的user-agent头部的值
- cookieEnabled 返回指明浏览器中是否启用cookie的布尔值

## screen
- availWidth显示器屏幕可用宽度，除任务栏外。
- availHeight显示器屏幕可用高度，除任务栏外。
- Width实际宽
- Height实际高