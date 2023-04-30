# webpack
<!-- 
[深入浅出 Webpack](http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-1%E5%89%8D%E7%AB%AF%E7%9A%84%E5%8F%91%E5%B1%95.html) -->
模块打包器，一切皆模块

## 核心概念
- entry(入口)
- output(出口)
- loader(加载器)
- plugin(插件)
- mode(模式)

### entry(入口)
各个模块之间存在一个依赖关系，需要一个入口来进入
- 单入口
- 多入口
```js
// 单入口
module.exports = {
  entry: "./src/index.js",
};
// 多入口
module.exports = {
  entry: {
    app: "./src/app.js",
    admin: "./src/admin.js",
  },
};
```
### output(出口)
告诉webpack将编译后的文件放在哪里

```js
// 单入口
const path = require('path');

module.exports = {
  //...
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist'),,
  },
};
// 多入口
const path = require('path');

module.exports = {
  //...
  output: {
    filename: "[name].js", // 使用占位符
    path: path.resolve(__dirname, 'dist'),,
  },
};
```

### loader

webpack 仅支持 JS 和 JSON 两种文件类型(自带能力)，loader可以使得webpack支持其他类型文件将它们转化为有效的模块

本身是一个函数，接受源文件作为参数，最终返回转化的结果  

常见的loader
- babel-loader    转换 ES6、ES7 等 JS 新语法
- css-loader	支持.css 文件的加载和解析
- less-loader  将 less 文件转换成 css 文件
- ts-loader   	将 ts 文件转换成 js 文件
- file-loade    进行图片、字体等打包
- thread-loader   多进程打包 JS 和 CSS

用法
放在一个单独的 module 对象的 rules 中，rules 作为一个数组可以添加多个 loader，右到左，下到上依次解析，通过两个属性配置 loader： 
 - test 属性，指定匹配规则，识别出哪些文件会被转换。
 - use 属性，指定使用的 loader 名称，即在进行转换时，应该使用哪个 loader。
```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: 'style-loader' },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: 'sass-loader' }
        ]
      }
    ],
  },
};
```
### Plugin
Loader 用于处理 webpack 无法解析的文件，Plugin 则可以用于执行范围更广的任务，  
比如：打包优化，资源管理，注入环境变量。  

常见plugin
- CommonsChunkPlugin	多个页面打包，将 chunks 相同的模块代码提取成公共 js
- CleanWebpackPlugin	清理构建目录
- ExtractTextWebpackPlugin	将 CSS 从 bundle 文件中提取成一个独立的 CSS 文件
- CopyWebpackPlugin	将文件/文件夹拷贝到构建的输出目录去
- HtmlWebpackPlugin	创建 html 文件去承载输出的 bundle
- UglifyjsWebpackPlugin	压缩 JS
- ZipWebpackPlugin	将打包后的资源生成 zip 包

用法
plugins: [new 实例]
```js
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 通过 npm 安装
const webpack = require("webpack"); // 用于访问内置插件

module.exports = {
  // ...
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: "./src/index.html" })
  ],
};
```
### mode
用于指定当前的构建环境是 production、development 或 none，默认 production  

Mode 的内置函数
- development	设置 process.env.NODE_ENV 为 development，开启 NamedChunksPlugin 和 NamedModulesPlugin（在热更新中，可以看到具体更新的模块）
- production	设置 process.env.NODE_ENV 为 production，开启 FlagDependencyUsagePlugin、FlagIncludedChunksPlugin、ModuleConcatenationPlugin、NoEmitOnErrorsPlugin、OccurrenceOrderPlugin、SideEffectsFlagPlugin 和 TerserPlugin
- none	不开启任何优化选项
## 安装使用
```
npm init -y
npm install webpack webpack-cli --save-dev
```

- webpack 核心功能包
- webpakc-cli webpack 的命令行工具，终端使用以启动和打包

根目录下新建 webpack 文件夹 文件夹下新建   
webpack.common.js  公用配置  
webpakc.dev.js 开发时的配置  
webpack.prod.js 打包构建时的配置  

根目录下新建src文件夹，文件加下新建index.js
```js
// src/index.js
const el = document.getElementById('root')
el.innerHTML = 'hello webpack5'
```
## 基本配置  
webpack.common.js
```js
// webpack/webpack.common.js

const path = require('path');

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  return {
    mode: webpackEnv, 
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: []
    },
    plugins: [],
  };
};
```

### 配置 webpack-dev-server

```js
npm install --save-dev webpack-dev-server
```
webpack.dev.js
```js
// webpack.dev.js
const webpackCommonConfig = require('./webpack.common.js')('development');

module.exports = {
  devServer: {
    host: 'localhost', // 指定host，，改为0.0.0.0可以被外部访问
    port: 8081, // 指定端口号
    open: true, // 服务启动后自动打开默认浏览器
    historyApiFallback: true, // 当找不到页面时，会返回index.html
    hot: true, // 启用模块热替换HMR，在修改模块时不会重新加载整个页面，只会更新改变的内容
    compress: true, // 启动GZip压缩
    https: false, // 是否启用https协议
    proxy: { // 启用请求代理，可以解决前端跨域请求的问题
      '/api': 'www.baidu.com',
    },
  },
  ...webpackCommonConfig,
};
```

### 配置html-webpack-plugin
生成一个html文件，并且会将webpack构建好的文件自动引用

```js
npm install --save-dev html-webpack-plugin
```

```js
// webpack/webpack.common.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  return {
    mode: webpackEnv, 
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: []
    },
    plugins: [
      new HtmlWebpackPlugin(),
    ],
  };
};
```

html-webpack-plugin还可以添加一个模板文件，让html-webpack-plugin根据模板文件生成html文件  支持自定义变量

public 下新建 index.html

```html
// public/index.html

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webpack5</title>
  <!-- <title><%= htmlWebpackPlugin.options.title %></title> -->
</head>

<body>
  <div id="root">
    <%= htmlWebpackPlugin.options.something %>
  </div>
</body>

</html>
```

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'

  return {
    mode: webpackEnv,
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        title: 'Webpack5',
        something: 'something'
      }),
    ],
  }
}
```

### 在package.json中配置启动，打包命令

```js
"scripts": {
  "build": "webpack --config ./webpack/webpack.prod.js",
  "start": "webpack server --config ./webpack/webpack.dev.js"
},
```

### 加载CSS
首先安装 
- css-loader 处理CSS的模块化（如import）和使用url引入的外部资源。
- style-loader 把css-loader解析后的样式内联插入到HTML的head中。
```
npm install css-loader style-loader -D
```

```js
rules: [
  // ...
  {
    // 用正则匹配文件名后缀为.css的文件
    test: /.css$/,
    // 告诉编译引擎使用这两个loader进行编译 注意顺序
    use: ['style-loader', 'css-loader']
  }
],
```

使用less/sass  

除了需要安装编译 CSS 语言相关的loader外，还需要安装它们各自的语言包和loader。
Less: ` npm install less less-loader -D`
sass: `npm install node-sass sass-loader -D`

```js
rules: [
  // Less 配置
  {
    test: /.less$/,
    use: ['style-loader', 'css-loader', 'less-loader']
  },
  // Sass 配置
  {
    test: /.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  }
]
```

### 加载image图像

5之前使用`url-loader`,
- raw-loader 将文件导入为字符串
- url-loader 将文件作为 data URI 内联到 bundle 中
- file-loader 将文件发送到输出目录

5中使用内置的 `Asset Modules`

资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：
- asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
- asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
- asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
- asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。

```js
// webpack.common.js
module: {
  rules: [
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/,
    type: 'asset', 
    generator: {  // 自定义文件名与文件存放位置
      filename: 'image/[name].[contenthash:8][ext][query]'
    }
  },
  ]
},
```
`generator` 自定义文件名与文件存放位置。  

也可以在output中定义assetModuleFilename设置默认存放位置与文件名格式：

```js
output: {
  assetModuleFilename: 'asset/[name].[contenthash:8][ext][query]', 
}
```

### 加载fonts字体或者其他资源
排除其他资源的后缀名来加载其他资源
```js
// webpack.common.js
module: {
  rules: [
  {
    exclude: /\.(js|mjs|ejs|jsx|ts|tsx|css|scss|sass|png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource', 
  },
  ]
},
```

### 兼容js：将es6语法转换为es5

babel-loader

```js
npm install --save-dev babel-loader @babel/core @babel/preset-env
```
需要用到的babel插件：@babel/plugin-transform-runtime  @babel/runtime

```js
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

```js
// webpack.common.js
module: {
  rules: [
  {
    test: /\.js$/,
    include: path.resolve(__dirname, './src'),
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                  "useBuiltIns": "usage",
                  "corejs": 3,
              }
            ]
          ],
        }
      },
    ],
  },
  ]
},
```

所有需要转换的es6特性的插件都集合到了`@babel/preset-env`，babel只支持最新语法的转换 比如 extends  
没办法支持最新的api，比如：Map，Set，Promise等，需要在不兼容的环境中也支持最新的Api那么则需要通过Polyfill的方式在目标环境中添加缺失的Api，  
这时我们就需要引入`core-js`来实现polyfill。`useBuiltIns` 告诉babel怎么引入polyfill。  
`useBuiltIns : entry` 需要手动全量引入
`useBuiltIns : usage` 自动引入需要的polyfill：

useBuiltIns : usage 会污染全局对象
比如
```
"foobar".includes("foo");

使用polyfill后，会在String的原型对象上添加includes方法：

String.prototype.includes = function() {}
```

如果我们使用了其它插件也在原型对象上添加了同名方法的，那就会导致出现问题。  

使用@babel/plugin-transform-runtime

```js
module: {
  rules: [
  {
      test: /\.js$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  "helpers": true, 
                  "corejs": 3,
                  "regenerator": true,
                }
              ]
            ],
          }
        },
      ],
    },
  ]
},
```

- `helpers` 减少打包体积
- `corejs`  指定依赖corejs的版本进行polyfill
- `regenerator` 避免污染全局变量
  
还需要在package.json中配置目标浏览器，告诉babel我们要为哪些浏览器进行polyfill：

```js
"browserslist": {
  // 开发时配置，针对较少的浏览器，使polyfill的代码更少，编译更快
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ],
  // 生产的配置，需要考虑所有支持的浏览器，支持的浏览器越多，polyfill的代码也就越多
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ]
}
```

## 进阶配置  

### 加载css modules
每个css文件都有自己的作用域，css文件中的属性在该作用域下都是唯一的  
css modules对属性名通过hash值或者路径字符串的形式进行重命名，保证每个属性名都是唯一的  
只会作用在本身的组件上，而不会影响到其它组件
```js
{
  test: /\.module\.css$/,
  use: [
    ...
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[hash:base64:8]',
        }
      }
    }
  ],
},
```
### 配置React
浏览器不认识jsx语法，对jsx语法进行转换为浏览器认识的语法React.createElement(...)。
使用 `@babel/preset-react`
```js
npm install --save-dev @babel/preset-react
```
```js
{
  loader: 'babel-loader',
  options: {
    presets: [
      "@babel/preset-env",
      [
        "@babel/preset-react",
        {
          runtime: 'automatic',
        }
      ],
    ],
  }
},
```

### 配置TS
```js
npm install --save-dev @babel/preset-typescript
```
```js
{
  loader: 'babel-loader',
  options: {
    presets: [
      "@babel/preset-env",
      [
        "@babel/preset-react",
        {
          runtime: 'automatic',
        }
      ],
      "@babel/preset-typescript",
    ],
  }
},
```

根目录下新建 `tsconfig.json`
```js
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
  },
  "include": [
    "src",
  ]
}
```

### 配置ESLint
代码风格统一

```
npm i -D eslint eslint-webpack-plugin
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm i -D eslint-config-airbnb eslint-config-airbnb-typescript
npm i -D eslint-plugin-import eslint-plugin-jsx-a11y
npm i -D eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks
```
选用的是 eslint-config-airbnb 配置，它对 JSX、Hooks、TypeScript 及 A11y 无障碍化都有良好的支持，可能也是目前最流行、最严格的 ESLint 校验之一。

根目录  `.eslintrc.js`

```js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [".*", "webpack", "public", "node_modules", "dist"], // 忽略指定文件夹或文件
  rules: {
    // 在这里添加需要覆盖的规则
    "react/function-component-definition": 0,
    "quotes": ["error", "single"],
    "jsx-quotes": ["error", "prefer-single"]
  }
};
```

`eslint-webpack-plugin` 自动查找和修复代码中的问题

```js
{
  plugins: [
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      fix: true, // 自动修复错误代码
    })
  ]
}
```

### 命令行中提示ts的错误
代码中提示ts的错误依然能打包成功
使用  `fork-ts-checker-webpack-plugin` ts若报错，打包报错

```js
npm instal --save-dev fork-ts-checker-webpack-plugin
```
```js
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

plugins: [
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      configFile: path.resolve(__dirname, '../tsconfig.json')
    }
  });
]
```

### 配置别名和扩展名
- extensions 省略文件名 `import demo from 'demo';`
- alias 路径 `import demo from '@/demo';`

```js
resolve: {
  extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  alias: {
    '@': path.resolve(__dirname, '../src/xxx/xx/views/'),
  },
}
```

## 优化  

### 开发时的优化  

#### sourcemap
```js
devtool: 'cheap-module-source-map',
```
#### 配置缓存
```js
cache: {
  type: "filesystem", // 使用文件缓存
},
```
```js
{
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
  }
}
```

#### 开启HRM模块热替换
当有模块被修改了，那么则会立即刷新这个模块，但是其他的模块不会刷新。

```js
devServer: {
    hot: true
}
```

自动添加热更新函数的插件：
- React Hot Loader: 实时调整 react 组件。
- Vue Loader: 此 loader 支持 vue 组件的 HMR，提供开箱即用体验。
- Elm Hot webpack Loader: 支持 Elm 编程语言的 HMR。
- Angular HMR: 没有必要使用 loader！直接修改 NgModule 主文件就够了，它可以完全控制 HMR API。
- Svelte Loader: 此 loader 开箱即用地支持 Svelte 组件的热更新。

对于React来说，已经不使用React Hot Loader这个loader，而是使用react-refresh.

```js
npm i -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```

```js
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'); // react热更新

{
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, '../src'),
        use: [
            {
            loader: 'babel-loader',
            options: {
              plugins: [
                isEnvDevelopment && 'react-refresh/babel',
              ].filter(Boolean),
            }
          },
        ]
      }
    ]
  },
  plugins: [
    isEnvDevelopment && new ReactRefreshWebpackPlugin(),
  ]
}
```
对于css的热更新来说，在我们使用的style-loader的内部已经实现了HRM。

### 打包时的优化

#### 抽离css
`mini-css-extract-plugin` js中的css提取到单独的css文件中,支持css和sourcemaps的按需加载。

```js
npm install --save-dev mini-css-extract-plugin
```
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css从js中分离为单独的css文件

{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isEnvProduction ? 
          MiniCssExtractPlugin.loader: 
          'style-loader',
          'css-loader'
        ],
      },
    ]
  },
  
  plugins: [
    new MiniCssExtractPlugin(),
  ]
}
```

#### 代码分离
```js
{
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
```
#### 最小化入口chunk的体积
```js
{
  optimization: {
    runtimeChunk: 'single'
  }
}
```
#### 压缩js
通常压缩js代码使用terser-webpack-plugin，在webpack5中已经内置了该插件，当mode为production时会自动启用。

自定义配置
```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
        new TerserPlugin({...});
    ],
  },
};
```

#### 压缩css
css-minimizer-webpack-plugin

```js
npm install css-minimizer-webpack-plugin --save-dev
```
```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); 

module.exports = {
  optimization: {
    minimizer: [
        new CssMinimizerPlugin();
        '...' // 
    ],
  },
};
```
#### dll
使用DllPlugin将不会频繁更改的代码单独打包生成一个文件，可以提高打包时的构建速度。
```js
// webapck.dll.js
const paths = require('./paths');
const webpack = require('webpack');

module.exports = {

  mode: 'production',

  entry: {
    vendor: [
      'react',
      'react-dom'
    ]
  },

  output: {
    path: paths.dllPath,
    filename: paths.dllFilename,
    library: '[name]_dll_library'
  },

  plugins: [
    // 使用DllPlugin插件编译上面配置的NPM包
    // 会生成一个json文件，里面是关于dll.js的一些配置信息
    new webpack.DllPlugin({
      path: paths.dllJsonPath,
      name: '[name]_dll_library'
    })
  ]
};
```
```js
"scripts": {
  "dll": "webpack --config ./webpack/webpack.dll.js"
  ...
},
```
```js
// webpack.common.js
new webpack.DllReferencePlugin({
  manifest: paths.dllJsonPath
})
```

```
npm i -D add-asset-html-webpack-plugin
```
```js
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

new AddAssetHtmlWebpackPlugin({
  filepath: path.resolve(__dirname, '../dll/vendor.dll.js'),
  publicPath: ''
})
```

#### tree shaking - 摇树
将没有使用的js代码排除掉。

开启树摇：只需要将mode设置为production，tree shaking就会自动开启

#### 清除未使用的css

```
npm i -D @fullhuman/postcss-purgecss
```
```js
{
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        ...
        isEnvProduction && 
        [
          '@fullhuman/postcss-purgecss', // 删除未使用的css
          {
            content: [ paths.appHtml, ...glob.sync(path.join(paths.appSrc, '/**/*.{tsx,ts,js,jsx}'), { nodir: true }) ],
          }
        ]
      ].filter(Boolean),
    },
  }
},
```

#### 多线程
```
npm install --save-dev thread-loader
```

```js
{
  test: /\.(js|jsx|ts|tsx)$/,
  include: paths.appSrc,
  use: [
    {
      loader: "thread-loader", 
      options: {
        workers: 2,
        workerParallelJobs: 2
      },
    },
  ]
}
```

#### 打包前清空输出文件夹

在webpack5之前我们使用clean-webpack-plugin来清除输出文件夹，在webpack5自带了清除功能。

```js
output: {
  clean: true,
}
```

#### 懒加载/按需加载
```js
import('demo.js')
 .then({default: res} => {
     ...
 });
```

当webpack打包时，就会将demo文件单独打包成一个文件，当被使用时才会去加载。  

可以使用魔法注释去指定chunk的名称与文件的加载方式。
```js
// 指定chunk名称：
import(/* webpackChunkName: "demo_chunk" */ 'demo.js')
 .then({default: res} => {
     ...
 });
// 指定加载方式：
import(
  /* webpackPreload: "demo_chunk", webpackPrefetch: true */
  'demo.js'
)
.then({default: res} => {
    ...
});
```

- prefetch：会在浏览器空闲时提前加载文件
- preload：会立即加载文件

#### 使用CDN

```
output: {
    publicPath: isEnvProduction ? 'https://CDNxxx.com' : '', 
},
```

#### 浏览器缓存

```js
module.exports = {
  output: {
    filename: isEnvProduction
      ? "[name].[contenthash].bundle.js"
      : "[name].bundle.js",
  },
};
```

## 优化工具
- progress-bar-webpack-plugin：打包时显示进度，但是会影响打包速度，需要斟酌使用，如果打包时间过长可以使用，否则不需要使用。
- speed-measure-webpack-plugin：查看loader和plugin的耗时，可以对耗时较长的loader和plugin针对性优化。
- webpack-bundle-analyzer：可以查看打包后各个文件的占比，来针对性的优化。