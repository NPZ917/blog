# 组件化、模块化、工程化
1. 工程化是一种思想而不是某种技术
  将前端项目当成一项系统工程进行分析、组织和构建从而达到项目结构清晰、分工明确、团队配合默契、开发效率提高的目的。
  比如以下来实现工程化
      - 页面组件化
      - 代码模块化
      - 代码质量管理 (QA)： ESLint
      - 代码编译: babel、less、sass、scss等
      - 代码构建：webpack
      - 项目国际化
      - 代码版本管理：Git、SVN

2. 模板化是在文件层面上，对代码和资源拆分。
   - AMD
   - CommonJS
   - ES6 Module
   - UMD

    AMD：AMD（Asynchronous Module Definition）是一种用于浏览器端的模块化方案，它利用 define() 函数定义模块，通过 require() 方法加载模块。相比于 CommonJS，AMD 更加适合异步加载模块的场景。

    CommonJS：CommonJS 是一种在服务器端广泛使用的模块化方案，它的主要思想是通过 require() 方法来引入依赖模块，在模块内部使用 module.exports 或者 exports 对外暴露接口。

    ES6 模块化：ES6 模块化是 ECMAScript 6 引入的模块化方案，它通过 import 和 export 关键字来引入和导出模块，替代了原有的 CommonJS 和 AMD 规范。ES6 模块化支持静态分析，便于编译器优化和工具优化。

    UMD：UMD（Universal Module Definition）是一种通用的模块化方案，它同时兼容 CommonJS 和 AMD 规范，也支持全局变量导出，便于在不同的环境中使用。


    ES6 Module的特点(对比CommonJS)  -----   
      - CommonJS模块是运行时加载，ES6 Module是编译时输出接口；  
      - CommonJS加载的是整个模块，将所有的接口全部加载进来，ES6 Module可以单独加载其中的某个接口；  
      - CommonJS输出是值的拷贝，ES6 Module输出的是值的引用，被输出模块的内部的改变会影响引用的改变  
      - CommonJS this指向当前模块，ES6 Module this指向undefined;  

3. 组件化 对UI的拆分