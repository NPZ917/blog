# [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/)

## 登录

- 用户点击登录按钮，触发 wx.login()方法获取临时登录凭证 code。
- 小程序将 code 发送给服务器，服务器根据 appid、appsecret 和 code 获取用户的 openid 或 session_key
- 服务器将 session_key 和 openid 等信息存储在数据库中，并生成一个自定义登录态 token 返回给客户端。
- 小程序将 token 存储在本地，以后的每次请求将 token 带上，服务器根据 token 获取用户的 session_key 和 openid，进行用户身份校验。

视情况而定，将 token 存储到 globalData 中，供封装 wx.request 中使用

```js
<button bindtap="login">微信授权登陆</button>
​
Page({
  login: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          // 发送 res.code 到开发者服务器获取 openid 或 session_key
          wx.request({
            url: '...',
            data: {
              code: res.code
            },
            success: function (res) {
              // 存储 token 并跳转至首页
              wx.setStorageSync('token', res.data.token)
              wx.switchTab({
                url: '/pages/home/index'
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})
```

## 支付

- 用户在小程序中选择商品或服务，并点击“立即购买”按钮。
- 小程序向服务器发送订单信息，包括商品名称、价格等。
- 服务器生成一个唯一的订单号，并将其返回给小程序。
- 小程序调用微信支付接口，传递订单号和支付金额等信息。
- 微信支付系统根据用户绑定的银行卡进行扣款并完成交易。同时，微信向商户服务器发送支付结果通知，以便更新订单状态。

```js
// 点击“立即购买”按钮
onBuyBtnClick: function () {
  // 调用商户服务器接口生成订单并返回订单号
  wx.request({
    url: 'https://example.com/api/createOrder',
    data: {
      goods_name: '商品名称',
      price: 100, // 单位为分
      user_id: '用户ID'
    },
    success(res) {
      if (res.statusCode === 200 && res.data.order_no) {
        const orderNo = res.data.order_no;
        // 调用微信支付接口进行支付
        wx.requestPayment({
          timeStamp: '', // 时间戳，需与商户后台时间同步，具体实现可参考官方文档或第三方库。
          nonceStr:'',// 随机字符串，不长于32位。推荐随机数生成算法。
          package:'',// 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
          signType:'', // 签名算法类型，默认为MD5，支持HMAC-SHA256和MD5两种签名方式。
          paySign:'', // 签名。详见签名生成算法（这里需要自己写）
          success(res) {
            console.log('支付成功', res);
            // 更新订单状态为已支付等操作...
          },
          fail(res) {
            console.log('支付失败', res);
          }
         });
       } else {
         console.error('创建订单失败', res);
       }
     },
     fail(err) {
       console.error('请求出错', err);
     }
   });
}
```

## 父子组件之间的通信

父传子：可以通过在父组件中定义属性，在子组件中通过 properties 来进行接收。

子传父：可以通过在子组件中定义事件，然后在父组件中绑定该事件，通过事件回调函数将数据传递给父组件

```js
// 父组件 wxml 文件
<custom-component name="{{name}}" bind:myevent="onMyEvent"></custom-component>
// 父组件 js 文件
Page({
data: {
 name: 'Custom Component'
},
onMyEvent: function(e) {
 console.log('Received event from custom component:', e.detail)
}
})
​
// 子组件 wxml 文件
<view>{{name}}</view>
<button bindtap="onClick">Click me</button>
// 子组件 js 文件
Component({
properties: {
 name: String
},
methods: {
 onClick() {
   this.triggerEvent('myevent', { message: 'Hello, parent!' })
 }
}
})
```

## 在微信开发者工具中用本地 IP 地址调试 JSSDK（微信公众号网页）

1. [登录微信测试号](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)
2. 添加 js 接口安全域名和扫码关注公众号
3. [获取 access_token](https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=appid&secret=secret)
   - 浏览调用 `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=appid&secret=secret`, appid 为测试号的 appid，secret 为测试号的 appsecret
   - 获取到的 acces_token 缓存起来，不要频繁获取
4. [拿上一步的 access_token 获取 jsapi_ticket](https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=access_token&type=jsapi)
   - `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=access_token&type=jsapi`
5. [拿上一步得到 jsapi_ticket 去生成签名](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign)

   - 访问微信 JS 接口签名校验工具 `https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign`
   - 填入 jsapi_ticket

     填入 noncestr（随机字符串，可写死：Wm3WZYTPz0wzacny）

     填入 timestamp （当前时间戳，单位秒）

     填入 url （本地项目服务的 ip 地址，访问地址#号之前的内容）

     点击生成签名

6. 把得到的签名放到 wx.config 配置对象中
