# webpack5 + vue3 + ts

## 初始化

```
mkdir webpack5-vue3-ts
cd webpack5-vue3-ts
npm init -y
```

目录结构

```js
|-- build
   |-- webpack.base.js
   |-- webpack.dev.js
   |-- webpack.prod.js
|-- public
   |-- index.html
|--src
   |-- App.vue
   |-- index.ts
|-- tsconfig.json
|-- package.json
```

安装 webpack vue3 依赖

```js
npm i webpack webpack-cli -D
npm i vue -S
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webpack5-vue3-ts</title>
  </head>

  <body>
    <div id="app"></div>
  </body>
</html>
```
