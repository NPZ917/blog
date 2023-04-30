# 微信小程序

## 登录
- 用户点击登录按钮，触发wx.login()方法获取临时登录凭证code。
- 小程序将code发送给服务器，服务器根据 appid、appsecret 和 code 获取用户的 openid 或 session_key
- 服务器将session_key和openid等信息存储在数据库中，并生成一个自定义登录态token返回给客户端。
- 小程序将token存储在本地，以后的每次请求将token带上，服务器根据token获取用户的session_key和openid，进行用户身份校验。

视情况而定，将token 存储到globalData中，供封装wx.request中使用
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