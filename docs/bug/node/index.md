## node 版本问题

更新版本node版本 16 => 18，老项目跑不起来，报错  
this[kHandle] = new _Hash(algorithm, xofLen);  

因为 node.js V17版本中最近发布的OpenSSL3.0, 而OpenSSL3.0对允许算法和密钥大小增加了严格的限制，可能会对生态系统造成一些影响。故此以前的项目在升级 nodejs 版本后会报错  


解决
- 修改package.json，命令前加入`SET NODE_OPTIONS=--openssl-legacy-provider`
- 回退版本 => 16

1.package.json, 不太一劳永逸，随着时间变化，legacy 可能为 Openssl3.0
```js
"scripts": {
   "serve": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",
   "build": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build"
},
```

2.回退到16版本