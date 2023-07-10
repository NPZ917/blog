# Vite

## 特点

1. 开发过程

开发服务器的启动快

- 依赖
  - 存在多种模块化格式 ESM/CommonJS
  - 使用 esbuild 预构建依赖
  - 强缓存 `Cache-Control: max-age=31536000,immutable`
- 源码
  - 需要转换的文件(JSX、CSS、Vue 等)
  - 原生 ESM 提供源码，让浏览器接管部分工作：Vite 在浏览器请求时源码时进行转换并按需提供源码
  - 协商缓存

2. 打包过程

使用了 Rollup

## TODO
