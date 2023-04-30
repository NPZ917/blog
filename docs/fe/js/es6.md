## let const 
1. let 
   - 不存在变量提升
   - 暂时性死区
   - 不允许重复声明
   - 块级作用域
2. const
   - 声明常量，一旦声明，常量的值不再改变
   - 声明的只是变量的内存地址不得改动，若object类型，属性值可改
   - 块级作用域
   - 不允许重复声明
## 字符串
- 拼接字符串 反斜杠(`)，能保留所有空格和换行
- `includes()`取代 `indexOf`
- startsWith() endsWith() padStart() padEnd() repeat()

## 数值
- Bigint 

## 函数
- 箭头函数 `() => {}`
  - 没有自己的this，向上层作用域找this
  - 不能用作构造函数
  - 无arguments 
- 函数默认值
- rest 参数

## 数组
- 解构 `let [a,b,c] = [1,2,3]`
- 扩展运算符 `let a = [2,3,4]; let b = [...a]`
- find()、findIndex()、fill()、entries()、keys()、values()
- Array.from()  类数组对象和可遍历（iterable）的对象转为数组
- Array.of() 将一组值，转换为数组。 Array.of(3, 11, 8)
- includes()

## 对象
- 属性名简写
- 解构
- 扩展运算符
- super 总是指向当前函数所在对象的原型对象
- Object.is()  `Object.is(NaN, NaN) // true`
- Object.assign(target, source1, source2)
- Object.getOwnPropertyDescriptors 对象所有自身属性的描述对象
- getPrototypeOf() setPrototypeOf()
- Object.keys()，Object.values()，Object.entries()

遍历对象的属性。
- for...in   
  for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）
- Object.keys(obj)  
  Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
- Object.getOwnPropertyNames(obj)  
  Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
- Object.getOwnPropertySymbols(obj)  
  Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
- Reflect.ownKeys(obj)  
  Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
## 运算符

## Symbol
- Symbol()生成的值都是独一无二的
- Symbol('foo')

## Set Map
- Set
  - 类似Array的新的数据结构，Set实例的成员都是唯一，不重复的。这个特性可以轻松地实现数组去重。
  - const s = new Set()
  - const s = new Set([1, 2, 3, 4, 4]);  `[...s] -> [1, 2, 3, 4]`
  - `s.add(value)` `delete(value)` `has(value)` `clear()`
  - `keys()` `values()` `entries()` `forEach()`
  - Set 的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。
- Map
  - 类似对象 键值对的集合
  - 键可以是任何的值(包括对象)
  - `const map = new Map([['name', '张三'],['title', 'Author'])`
  - `set(key.value)` `get(key)` `has(key)`  `delete(key)`  `clear()`
  - `keys()` `values()` `entries()` `forEach()` 
  - Map 的遍历顺序就是插入顺序。

## Proxy
- 用来改变JS默认的一些语言行为,包括拦截默认的get/set等底层方法
- new Proxy(target, handler);  
  
提供的13种方法  
- get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
- set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
- has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
- deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
- ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.- keys()的返回结果仅包括目标对象自身的可遍历属性。
- getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
- defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
- preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
- getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
- isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
- setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
```js
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
-----------
obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
```

## Reflect
- 是将原生的一些零散分布在Object、Function或者全局函数里的方法(如apply、delete、get、set等等)，统一整合到Reflect上
- 修改某些Object方法的返回结果，让其变得更合理 `Object.defineProperty(obj, name, desc)  Reflect.defineProperty(obj, name, desc)则会返回false。`
- 让Object操作都变成函数行为 `name in obj` `Reflect.has(obj, name)`
- 因为Proxy可以改写默认的原生API，如果一旦原生API别改写可能就找不到了，所以Reflect也可以起到备份原生API的作用，使得即使原生API被改写了之后，也可以在被改写之后的API用上默认的API。

13个方法
- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)
## Promise
主要解决了回调地狱的问题，将异步操作以同步操作的流程表达出来

三种状态 pending fulfilled rejected
- 状态不受外界影响
- 一旦改变，不会改变 `pending -> fulfilled`  `pending -> rejected`
- 接受一个函数作为参数，函数接收2个函数 resolve， reject

```js
new Promise((resolve, reject) => {
  if(...) resolve(value)
  eles reject(error)
})
```

实例上的方法
- then()
  - then方法的第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数，它们都是可选的
  - then方法返回的是一个新的Promise实例，可以链式调用
- catch() 指定发生错误时的回调函数。`.then(null, rejection)` `.then(undefined, rejection)`
- finally() 指定不管 Promise 对象最后状态如何，都会执行的操作
构造函数的方法
- Promise.all([]) 
  - 将多个 Promise 实例，包装成一个新的 Promise 实例
  - 全部状态为 fulfilled 新的实例 fulfilled
- Promise.race([])
  - 将多个 Promise 实例，包装成一个新的 Promise 实例
  - 有一个状态改变，新的实例状态改变
- Promise.allSettled([])
  - 可以明确某个promise 是否成功还是失败
- Promise.any([])
  - 只要有一个成功就成功，全部失败才会失败
- Promise.resolve()
  - 将现有对象转为 Promise 对象
- Promise.reject()
  - 会返回一个新的 Promise 实例，该实例的状态为rejected

## Iterator
一种遍历机制，任何部署了Iterator接口的数据结构，就可以遍历
接口为函数，返回一个对象，该对象中有 next() 方法，执行next() 方法 返回 { value: ..., done: ...} 对象  
done 表示是否结束  
主要供for...of 使用
 
```js
[Symbol.iterator] : function () {
  return {
    next: function () {
      return {
        value: 1,
        done: true
      };
    }
  };
}
```

原生具备接口的数据结构
- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

## Gerenator
Generator函数可以说是Iterator接口的具体实现方式。

执行Generator函数会返回一个遍历器对象，每一次Generator函数里面的yield都相当一次遍历器对象的next()方法，并且可以通过next(value)方法传入自定义的value,来改变Generator函数的行为。

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

## async await
async函数可以理解为内置自动执行器的Generator函数语法糖，它配合ES6的Promise近乎完美的实现了异步编程解决方案。
```js
async function a(params) {
  try {
    let res = await ...
    console.error(res); 
  } catch (error) {
    console.error(error);
  }
}
```
## class
构造函数的另一种写法，语义更清晰
- 可以使用`extends`继承
- 类的内部定义所有方法，都是不可枚举的
- 静态方法 static
- super 
  - 函数 子类的构造函数必须执行一次super()函数。
  - 对象
```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

  static classMethod() {
    return 'hello';
  }
}
```
## module
- import 
- export
- export default