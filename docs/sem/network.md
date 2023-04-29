## 网络模型
![](/sem/network_model.png)
![](/sem/network_send.png)

TODO

## HTTP 状态码
![](/sem/network_http_status_0.png)  

![](/sem/network_http_status_1.png)
![](/sem/network_http_status_2.png)

## HTTP 缓存
- 强缓存
  1. `Expires`(http/1.0) 即过期时间，存在于服务器返回的响应头中，告诉浏览器在这个过期时间之前可以直接从缓存里面获取数据，无需再次请求，  
   比如：Expires: Wed, 22 Nov 2019 08:41:00 GMT 表示 2019年11月22号8点41分 过期，过期了就得向服务端请求  
  缺点：服务器的时间和浏览器的时间可能不一致，Expires 的值不准确
  2. `Cache-Control`(http/1.1)
    没有采用具体的过期时间点这个方式，采用时长来控制缓存  
    Cache-Control: max-age=3600 表示再3600秒，即1小时内可以直接使用缓存  
    除`max-age`外，还有以下几个字段----  
      `public `--- 客户端和代理服务器都可以缓存。因为一个请求可能要经过不同的代理服 务器最后才到达目标服务器，那么结果就是不仅仅浏览器可以缓存数据，中间的任何代理节点都可以进行缓存

      `private` --- 只有浏览器能缓存了，中间的代理服务器不能缓存。

      `no-cache`: 跳过当前的强缓存，发送HTTP请求，即直接进入协商缓存阶段。

      `no-store`：非常粗暴，不进行任何形式的缓存。

      `s-maxage`：这和max-age长得比较像，但是区别在于s-maxage是针对代理服务器的缓存时间。

  Expires和Cache-Control同时存在的时候，Cache-Control会优先考虑。
  还存在一种情况，当资源缓存时间超时了，也就是强缓存失效了，这样就进入到协商缓存了。  

- 协商缓存  
  强缓存失效之后，浏览器在请求头中携带相应的缓存tag来向服务器发请求，由服务器根据这个tag，来决定是否使用缓存，这就是协商缓存

  1. `Last-Modified`(响应头)/`If-Modified-Since`(请求头)
   即最后修改时间，再浏览器第一次给服务器发送请求后，服务器会在响应头中加上这个字段，浏览器接收到后，  如果再次请求，会在请求头中携带If-Modified-Since这个字段，这个字段的值也就是服务器传来的Last-Modified的值。  
     服务器拿到请求头中的If-Modified-Since后，和服务器中该资源的最后修改时间对比:  
      1> 请求头中的这个值小于最后修改时间, 更新  
      2> 否则返回304，告诉浏览器直接使用缓存
  2. `Etag`(响应头)/`If-None-Match`(请求头)  
 Etag 是服务器根据当前的文件的内容，给文件生成的唯一标识，只是里面的内容有改动，这个值就会改变。服务器通过响应头把该值给浏览器.浏览器收到Etag的值，会在下次请求时，将这个值作为If-None-Match这个字段的内容，并放到请求头中，发送给服务器。

      服务器收到If-None-Match后，会在服务器上和该资源的Etag比对：  
      1> 请求头中的这个值小于最后修改时间, 更新  
      2> 否则返回304，告诉浏览器直接使用缓存  
## HTTP
超文本传输协议，基于TCP/IP协议的应用层传输协议，客户端和服务端进行数据传输的一种规则。无状态 协议

报文
  - 请求报文 `请求行 － 通用信息头 － 请求头 － 实体头 － 报文主体`
  - 应答报文 `状态行 － 通用信息头 － 响应头 － 实体头 － 报文主体`
请求方式
  - GET、POST、PUT、DELETE、HEAD、OPTIONS、PATCH、CONECT、TRACE

常用的请求头
  - Accept： 可接受的响应内容类型（Content-Types）
  - Accept-Charset： 可接受的字符集
  - Accept-Encoding： 可接受的响应内容的编码方式。
  - Accept-Language： 可接受的响应内容语言列表。
  - Accept-Datetime： 可接受的按照时间来表示的响应内容版本
  - Authorization： 用于表示 HTTP 协议中需要认证资源的认证信息
  - Cache-Control： 用来指定当前的请求/回复中的，是否使用缓存机制。
  - Connection： 客户端（浏览器）想要优先使用的连接类型
  - Cookie： 由之前服务器通过Set-Cooki（e 见下文）设置的一个HTTP协议Cookie
  - Content-Length： 以 8 进制表示的请求体的长度
  - Content-MD5： 请求体的内容的二进制 MD5 散列值（数字签名），以 Base64 编码的结果
  - Content-Type： 请求体的 MIME 类型 （用于 POST 和 PUT 请求中）
  - Date： 发送该消息的日期和时间（以 RFC 7231 中定义的"HTTP 日期"格式来发送）
  - Expect： 表示客户端要求服务器做出特定的行为
  - From： 发起此请求的用户的邮件地址
  - Host： 表示服务器的域名以及服务器所监听的端口号。如果所请求的端口是对应的服务的标准端口（80），则端口号可以省略。
  - If-Match： 仅当客户端提供的实体与服务器上对应的实体相匹配时，才进行对应的操作。主要用于像 PUT 这样的方法中，仅当从用户上次更新某个资源后，该资源未被修改的情况下，才更新该资源。
  - If-Modified-Since： 允许在对应的资源未被修改的情况下返回 304 未修改
  - If-None-Match： 允许在对应的内容未被修改的情况下返回 304 未修改（ 304 Not Modified ），参考 超文本传输协议 的实体标记
  - If-Range： 如果该实体未被修改过，则向返回所缺少的那一个或多个部分。否则，返回整个新的实体
  - If-Unmodified-Since： 仅当该实体自某个特定时间以来未被修改的情况下，才发送回应。
  - Max-Forwards限制该消息可被代理及网关转发的次数。
  - Origin： 发起一个针对跨域资源共享的请求（该请求要求服务器在响应中加入一个 Access-Control-Allow-Origin 的消息头，表示访问控制所允许的来源）。
  - Pragma： 与具体的实现相关，这些字段可能在请求/回应链中的任何时候产生。
  - Proxy-Authorization： 用于向代理进行认证的认证信息。
  - Range： 表示请求某个实体的一部分，字节偏移以 0 开始。
  - Referer： 表示浏览器所访问的前一个页面，可以认为是之前访问页面的链接将浏览器带到了当前页面。Referer 其实是 Referrer 这个单词，但 RFC制作标准时给拼错了，后来也就将错就错使用 Referer 了。
  - TE： 浏览器预期接受的传输时的编码方式：可使用回应协议头
  - Transfer-Encoding： 中的值（还可以使用"trailers"表示数据传输时的分块方式）用来表示浏览器希望在最后一个大小为 0 的块之后还接收到一些额外的字段。
  - User-Agent： 浏览器的身份标识字符串
  - Upgrade： 要求服务器升级到一个高版本协议。
  - Via： 告诉服务器，这个请求是由哪些代理发出的。
  - Warning： 一个一般性的警告，表示在实体内容体中可能存在错误。

内容类型
  - Content-Type: text/html; charset=utf-8
  - Content-Type: multipart/form-data; boundary=something  
  
网络文件的类型
  - text/html ： HTML格式
  - text/plain ：纯文本格式
  - text/xml ： XML格式
  - image/gif ：gif图片格式
  - image/jpeg ：jpg图片格式
  - image/png：png图片格式  
  
  以application开头的
  - application/xhtml+xml ：XHTML格式
  - application/xml： XML数据格式
  - application/atom+xml ：Atom XML聚合格式
  - application/json： JSON数据格式
  - application/pdf：pdf格式
  - application/msword ： Word文档格式
  - application/octet-stream ： 二进制流数据（如常见的文件下载）
  - application/x-www-form-urlencoded ： `<form encType=””>`中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）

  上传文件时使用的
  - multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式
## HTTPS
HTTP的安全版本 即 HTTP下加入SSL层  HTTP 先与 SSL 通信，再由 SSL 和 TCP 通信，而不是 HTTP 直接与 TCP 通信

HTTP的劣势
 - 通信使用明文，传输内容可能被窃听
 - 不验证后通信方的身份，容易伪装进行请求
 - 无法保证报文的完整性，可能遭遇篡改

HTTP 与 HTTPS 的区别
  - HTTP 是明文传输，HTTPS 通过 SSL\TLS 进行了加密
  - HTTP 的端口号是 80，HTTPS 是 443
  - HTTPS 需要到 CA 申请证书
  - HTTPS 的连接很简单，是无状态的；HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全。

对称密钥加密  

   - 加密和解密使用相同的密钥，在通信时还需将传输密钥给对方用来解密，密钥传输过程中可能被截获，
   - 密钥可能会被截取，同样不安全

非对称密钥加密  

  - 公开密钥可以随意发送，私有密钥必须保密。发送密文的一方要使用对方的公开密钥进行加密，对方收到信息之后，使用自己的私有密钥进行解密，这种方式不需要传输用来解密的私钥了，也就不必担心私钥被截获，
  (服务端将公钥发送给客户端，客户端用服务端的公钥加密，服务端用自己的私钥解密)
  - 慢很多(算法)

https 采用 非对称密钥加密 + 对称密钥加密  

数字证书  

  确认公开密钥的正确性  

  hash(明文信息) === 公钥(数字签名)

  ![](/sem/network_https_ca.png)

大致流程: 
1. 客户端向服务器发出 HTTPS 请求。
2. 服务器返回证书，证书包含服务器公钥等信息。
3. 客户端验证证书的合法性，并生成一个随机数用于加密通信。
4. 客户端使用服务器公钥对随机数进行加密，并将加密后数据发送给服务器。
5. 服务器使用私钥解密接收到的数据，获取随机数。
6. 服务器和客户端使用随机数生成对称密钥，用于后续通信的加密和解密。
7. 双方使用对称密钥加密和解密数据，保证通信的安全性。

## TCP 的三次握手四次挥手
  [文章连接](https://juejin.cn/post/7045059219216662564)

 - 第一次握手：建立连接。客户端发送连接请求报文段，将SYN位置为1，Sequence Number为x；然后，客户端进入SYN_SEND状态，等待服务器的确认；

 - 第二次握手：服务器收到SYN报文段。服务器收到客户端的SYN报文段，需要对这个SYN报文段进行确认，  
  设置Acknowledgment Number为x+1(Sequence Number+1)；同时，自己还要发送SYN请求信息，将SYN位置为1，Sequence Number为y；  
  服务器端将上述所有信息放到一个报文段（即SYN+ACK报文段）中，一并发送给客户端，此时服务器进入SYN_RECV状态；

 - 第三次握手：客户端收到服务器的SYN+ACK报文段。然后将Acknowledgment Number设置为y+1，向服务器发送ACK报文段，这个报文段发送完毕以后，客户端和服务器端都进入ESTABLISHED状态，完成TCP三次握手。

  丢失报文段 -> 周期性超时重传
  为何三次： 2次的话，服务端是无法确认自己的序列号是否被客户端成功接收

- 第一次挥手：主机1（可以使客户端，也可以是服务器端），设置Sequence Number和Acknowledgment Number，向主机2发送一个FIN报文段；此时，主机1进入FIN_WAIT_1状态；这表示主机1没有数据要发送给主机2了；

- 第二次挥手：主机2收到了主机1发送的FIN报文段，向主机1回一个ACK报文段，Acknowledgment Number为Sequence Number加1；主机1进入FIN_WAIT_2状态；主机2告诉主机1，我"同意"你的关闭请求；

- 第三次挥手：主机2向主机1发送FIN报文段，请求关闭连接，同时主机2进入LAST_ACK状态；

- 第四次挥手：主机1收到主机2发送的FIN报文段，向主机2发送ACK报文段，然后主机1进入TIME_WAIT状态；主机2收到主机1的ACK报文段以后，就关闭连接；此时，主机1等待2MSL后依然没有收到回复，则证明Server端已正常关闭，那好，主机1也可以关闭连接了。  

为何四次： 当客户端第一次发送 FIN 报文之后，只是代表着客户端不再发送数据给服务端，但此时客户端还是有接收数据的能力的。而服务端收到FIN报文的时候，可能还有数据要传输给客户端，所以只能先回复 ACK给客户端 一来一回就四次了

![](/sem/network_tcp.png)

## 输入url到页面呈现
粗略
1. 先找缓存，有缓存呈现，无缓存
2. DNS 解析 找到域名对应的 IP
3. TCPS三次握手 建立TCP连接
4. 如果是https SSL握手过程
5. 客户端发送请求
6. 服务端响应请求
7. TCP四次挥手 释放TCP连接
8. 客户端渲染

DNS  

本地DNS之间的查询方式是递归查询；在本地DNS服务器与根域及其子域之间的查询方式是迭代查询；

![](/sem/network_dns.png)

客户端 -> 浏览器缓存 -> 本地hosts文件 -> 本地DNS解析器缓存 -> 本地DNS服务器

浏览器渲染 -> 构建 DOM 树、样式计算、布局阶段、分层、栅格化和显示

## web 安全

1. XSS 攻击
   跨站脚本攻击  web页面嵌入 HTML/ script 标签，当用户浏览页面时，恶意代码会被执行  

   分类
   - 反射性(非持久型) 攻击者事先制作好攻击链接,需要欺骗用户自己去点击链接才能触发XSS代码，所谓反射型XSS就是将恶意用户输入的js脚本，反射到浏览器执行。
   - 储存型(持久型)：会把攻击者的数据储存到服务端，攻击行为将伴随攻击数据一直存在，每当用户访问该页面就会触发代码执行。
   - DOM型：基于文档对象模型的漏洞。 最经典的存储型XSS漏洞是留言板，当用户A在留言板留言一段JS代码`<script>alert("run javascript");</script>`,后端未经过滤直接存储到数据库，当正常用户浏览到他的留言后，这段JS代码就会被执行，可以借此来盗取cookie。

   防御
     - 标签过滤，如`<script>、<img>、<a>`标签等
     - 编码，对字符< 、>、&、" 、' 、+、/等进行转义。
     - cookie防盗，将cookie设置为http-only,js脚本将无法读取到cookie信息。
     - 纯前端渲染，明确innerText、setAttribute、style，将代码与数据分隔开。
     - 避免不可信的数据拼接到字符串中传递给这些API，如DOM中的内联事件监听器，location、onclick、onload、onmouseover等，`<a>`标签的href属性，JavaScript的eval()、setTimeout()、setInterval()等，都能把字符串作为代码运行。
2. CSRF 攻击
   跨站请求伪造  

   - 用户C浏览并登录信任网站A,产生cookie
   - 用户C未退出网站A，在同一个浏览器危险访问网站B
   - 网站B的页面存有一些攻击性的代码，会发出访问A的请求
   - 浏览器收到请求后，在用户不知情的情况下携带cookie访问网站A
   - A不知道请求是谁发的，浏览器会带上用户的cookie，所以A会根据用户的权限处理B发出的请求。这样就达到了攻击的目的。

    防御
     - 验证码：对敏感操作加入验证码，强制用户与网站进行交互
     - 对Cookie设置SameSite属性。该属性表示Cookie不随着跨域请求发送，可以很大程度减少CSRF的攻击，但是该属性目前并不是所有浏览器都兼容。
     - 使用POST请求，避免使用GET，降低攻击风险，post请求攻击方需要构造一个form表单才可以发起请求，比get请求（img的src，a标签的href等等）的攻击方式复杂了一些，相对来说能降低风险，但不能阻止。
     - 检查HTTP中的referer字段，该字段记录了HTTP请求的来源地址
     - 在请求头中加入token验证字段，浏览器并不会自动携带Token去请求，且Token可以携带一段加密的jwt用作身份认证，这样进行CSRF的时候仅传递了cookie，并不能表明用户身份，网站即拒绝攻击请求。
     - 在http中自定义属性并验证。
3. .......



三次握手

