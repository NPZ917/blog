# [MDN - HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML)

## IE 兼容

```html
<!--[if lt IE 9]>
  <script src="http://cdn.static.runoob.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
<![endif]-->
```

## 新特性

- 语义化
- 表单增强 calendar、date、time、email、url、search ...
- 视频音频 video audio
- Canvas SVG
- Web 存储 localStorage、sessionStorage
- Web Worker
- 地理位置 Geolocation
- WebSocket
- 拖放
- Web SQL
- ...

## 语义化

页面结构的规范化，不会对内容有本质的影响

- 易修改、易维护。
- 无障碍阅读支持
- 搜索引擎友好、利于 SEO

![](/fe/html/html_0.png)

## 地理位置-Geolocation

```js
if (navigator.geolocation) // 支持 Geolocation API
else //
```

```js
navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

function successCallback(position) {
  var latitude = position.coords.latitude // 纬度
  var longitude = position.coords.longitude // 经度
  var altitude = position.coords.altitude // 海拔高度
  var accuracy = position.coords.accuracy // 精度
  var timestamp = position.timestamp // 时间戳
}

function errorCallback(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      // 用户拒绝了位置请求
      break
    case error.POSITION_UNAVAILABLE:
      // 位置信息不可用
      break
    case error.TIMEOUT:
      // 请求超时
      break
    case error.UNKNOWN_ERROR:
      // 未知错误
      break
  }
}
```

## DOCTYPE(⽂档类型) 的作⽤

- `<!DOCTYPE>` 声明一般位于文档的第一行，它的作用主要是告诉浏览器以什么样的模式来解析文档。
- 一般指定了之后会以标准模式来进行文档解析，否则就以兼容模式进行解析。
- 在标准模式下，浏览器的解析规则都是按照最新的标准进行解析的。  
  而在兼容模式下，浏览器会以向后兼容的方式来模拟老式浏览器的行为，以保证一些老的网站的正确访问。
