## 数据类型
1. js 已有类型
- 原始类型： `number`/`string`/`boolean`/`null`/`undefined`/`symbol`/`bigint`
- 对象类型: object（包括，数组、对象、函数等对象）。
2. TS 新增类型
- 联合类型、自定义类型（类型别名）、接口、元组、字面量类型、枚举、void、any 等
- 注意：TS 中的原始类型和 JS 中写法一致  
- TS 中的对象类型在 JS 类型基础上更加细化，每个具体的对象（比如数组、对象、函数）都有自己的类型语法
## 数组类型
```js
// 1
let numbers: number[] = [1, 3, 5]
// 2
let strings: Array<string> = ['a', 'b', 'c']
strings.push('d') // 后续 push 的数据也必须是字符串
```

## 联合类型
- 能够通过联合类型将多个类型组合成一个类型。
- 场景：定时器的初始变量定义。
```js
let arr:(number | string) = [1, 2, '333']
```

## 类型别名
- 推荐使用大写字母开头
```js
type CustomArray = (number | string)[]

let arr1: CustomArray = [1, 'a', 3, 'b']
let arr2: CustomArray = ['x', 'y', 6, 7]
```

## 函数类型
函数的类型实际上指的是：函数参数 和 返回值 的类型  

单独指定参数、返回值得类型
```js
// 函数声明
function add(num1: number, num2: number): number {
    return num1 + num2
}

// 箭头函数
const add = (num1: number, num2: number): number => {
    return num1 + num2
}
```
同时指定参数、返回值的类型，只适用于函数表达式
```js
// 解释：可以通过类似箭头函数形式的语法来为函数添加类型
type AddFn = (num1: number, num2: number) => number

const add: AddFn = (num1, num2) => {
  return num1 + num2
}
```
可选参数  
只能出现在参数列表的最后，可选参数后面不能再出现必选参数。
```js
// start、end 可传可不传，传就传 number 类型
function mySlice(start?: number, end?: number): void {
    console.log('起始索引：', start, '结束索引：', end)
}
```
参数默认值
```js
// 默认值
function mySlice(start: number = 0, end: number = 0) {}
```
函数重载
```js
// 一个函数可以有多个重载签名
// !重载签名：包含了函数的参数类型和返回值类型，但不包含函数体
function greet(name: string): string
function greet(name: string[]): string[]

// 一个函数只能有一个实现签名
// !实现签名：参数和返回值要覆盖上面的情况（更通用），且包含了函数体
function greet(person: unknown): unknown {
  if (typeof name === 'string') {
    return `Hello ${name}`
  } else if (Array.isArray(name)) {
    return name.map((name) => `Hello ${name}`)
  }
  throw new Error('异常')
}

console.log(greet(['a', 'b', 'c']))
```

## void 
- 如果函数没有返回值, 那么函数返回值类型为：void。

```js
function greet(name: string): void {
    console.log('Hello', name)
    // return undefined // 默认有这么一句
}
```
## 对象类型
```js
// 1
const person: object = {}

// 2
let person: {} = {}
// 要求必须指定 string 类型的 name 属性，左右两边数量保持一致
const person: { name: string } = { name: '同学' }
const obj = {
  name: '同学',
  age: 18,
}

// 3. 右边是变量，在满足左边声明的前提下（右边内容可以比左边多）
const person: { name: string } = obj

// 4. 字符串比较特殊，满足左边的类型要求即可
const str: { length: number } = 'hello'

// 5.
// 在一行代码中指定对象的多个属性类型时，使用 `;`（分号）来分隔
// 单独制定函数的参数和返回值
// const person: { name: string; add(n1: number, n2: number): number } = {
// 可以统一指定函数的参数和返回值
const person: { name: string; add: (n1: number, n2: number) => number } = {
  name: '同学',
  add(n1, n2) {
      return n1 + n2
  },
}

// 6.也可以通过换行来分隔多个属性类型，去掉 ;
const person: {
  name: string
  add(n1: number, n2: number): number
} = {
    name: '同学',
    add(n1, n2) {
        return n1 + n2
    },
}

// 7. type
type Person = {
  name: string
  add(n1: number, n2: number): number
}
const person: Person = {
  name: '同学',
  add(n1, n2) {
      return n1 + n2
  },
}

// 8，可选类型
// 7. type
type Config = {
  name?: string
  add(n1: number, n2: number): number
}
function myAxios(config: Config) {
  console.log(config)
}
```

## 接口
```js
interface Point2D {
  x: number
  y: number
}
// 使用 `extends`（继承）关键字实现了接口 Point3D 继承 Point2D
// 继承后，Point3D 就有了 Point2D 的所有属性和方法（此时，Point3D 同时有 x、y、z 三个属性）
interface Point3D extends Point2D {
  z: number
}
```

## interface vs type
- 都可以描述对象或者函数。(interface 描述时不需要 =, type 描述时需要 =)
- 都允许拓展，语法不一样(interface 是通过 extends 进行拓展, type 通过 & 符号进行拓展)
- type 除了可以描述对象或函数，实际上可以为任意类型指定别名。
- 相同的 interface 声明能够合并，相同的 type 声明会报错。
- 一般使用 interface 来描述对象结构，用 type 来描述类型关系。

## 元组类型
特殊的数组类型，它能确定元素的个数以及特定索引对应的类型
```js
const position: [number, number] = [39.5427, 116.2317]
```

```js
// 其实 useState 的返回值就是一个元组
function useState(num: number) {
    const setNum = (num: number) => {}
    return [num, setNum]
}
// 问题：这里 num 和 setNum 被推断成了 number | ((num: number) => void) 类型，一般期望 num 是 number 类型，setNum 是 ((num: number) => void) 类型
const [num, setNum] = useState(8)

-------------------------------------------
// 解决：返回值明确指定为元组类型，或者通过后续学习的断言
function useState(num: number): [number, (number: number) => void] {
    const setNum = (num: number) => {}
    return [num, setNum]
}
const [num, setNum] = useState(8)
```

## 类型推论
TS 的类型推论机制会帮助提供类型，可以不写  
常见的发生类型推论的 2 种场景：声明变量并初始化时；决定函数返回值时。

## 字面量类型
任意的 JS 字面量都可以作为类型使用
```js
let str1 = 'Hello TS'
const str2 = 'Hello TS'
```

字面量类型常配合联合类型一起使用 相比于 string 类型，使用字面量类型更加精确、严谨
```js
type Direction = 'up' | 'down' | 'left' | 'right'
function changeDirection(direction: Direction) {
  console.log(direction)
}
changeDirection('up') // 调用函数时，会有类型提示
```

redux 中的aciton
```js
type Action = {
    type: 'TODO_ADD' | 'TODO_DEL' | 'TODO_CHANGE' | 'TODO_FIND'
}

function reducer(state, action: Action) {
  switch (action.type) {
    case 'TODO_ADD': 
  }
}
```

## 枚举类型
枚举成员是有值的，默认为：从 0 开始自增的数值。
```js
// Down -> 11、Left -> 12、Right -> 13
enum Direction {
  Up = 10,
  Down,
  Left,
  Right,
}

enum Direction {
  Up = 2,
  Down = 4,
  Left = 8,
  Right = 16,
}
console.log(Direction['Up']) // 2
// 也可以反向操作
console.log(Direction[2]) // Up
```

字符串枚举
```js
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
```
```js
enum Gender {
  女,
  男,
}
type User = {
  name: string
  age: number
  // gender: '男' | '女' // 但后台需要 0 和 1
  gender: Gender
}

const user: User = {
  name: 'ifer',
  age: 18,
  gender: Gender.男,
}
```

## 类型断言
当有时候获取的元素不确定是什么数据类型时, 就需要手动指定数据类型, 后面的提示才会出来
```js
// 1
const oLink = document.getElementById('link') as HTMLElement

// 2
const oLink = <HTMLAnchorElement>document.getElementById('link')
```

## typeof
JS 中的 typeof 可以在运行时判断类型，TS 中的 typeof 可以在编译时获取类型。
```js
interface Person {
  name: string
  age: number
}
const person: Person = { name: 'N', age: 18 }

// 获取 person 的类型，得到的就是 Person 接口类型
type p = typeof person
```
```js
const p = { x: 1, y: 2 }
function formatPoint(point) {} // 没有提示
function formatPoint(point: { x: number; y: number }) {} // 有提示，写法麻烦
// 使用 `typeof` 操作符来获取变量 p 的类型，结果与上面对象字面量的形式相同
function formatPoint(point: typeof p) {} // 推荐
```

## keyof
获取接口、对象（配合 typeof）、类等的所有属性名组成的联合类型。
```js
// 接口
interface Person {
  name: string
  age: number
}
type K1 = keyof Person // "name" | "age"
type K2 = keyof Person[] // "length" | "toString" | "pop" | "push" | "concat" | "join"
```
```js
// 对象（要配合 typeof 才能使用）
const obj = { name: 'ifer', age: 18 }
/* type newobj = typeof obj
type keyofObj = keyof newobj // "name" | "age" */

// 简写
type keyofObj = keyof typeof obj // "name" | "age"
let s1: keyofObj = 'name' // ok
let s2: keyofObj = 'xxx' // error
```

## 特殊类型  

### any
不推荐，当值的类型为 any 时，可以对该值进行任意操作，即使可能存在错误，并且不会有代码提示。

### unknown
任意类型，更安全的 any 类型。

### any vs unknown
- 任何类型可以给 any，any 也可以给任何类型。
- 任何类型可以给 unknown，unknown 只能给 unknown 或 any 类型。
- 

### never
不可能实现的类型
```js
type Test = number & string

// 也可以当做函数的返回值，表示不会执行到头
function test(): never {
    throw new Error('Error')
}
```

### null & undefined
```js
let str: string = 'ifer'

// 默认情况下，tsconfig.json 中的 strictNullChecks 的值为 false
// undefined 和 null 是其他类型的子类型，也就是可以作为其他类型的值存在

str = undefined
str = null
```

## 泛型  

为了实现传入什么数据类型就返回该数据类型本身 `<T>`

### 泛型函数

```js
function id<Type>(value: Type): Type {
  return value
}

function id<T>(value: T): T {
    return value
}

const num = id<number>(10)
const str = id<string>('a')

// 简化 TS 内部会采用一种叫做类型参数推断的机制，来根据传入的实参自动推断出类型变量 Type 的类型
// 当编译器无法推断类型或者推断的类型不准确时，就需要显式地传入类型参数。
let num = id(10) // 省略 <number> 调用函数
let str = id('a') // 省略 <string> 调用函数
```

### 泛型约束

泛型函数的类型变量 Type 可以代表任意类型，这导致访问泛型类型定义的数据属性时会没有提示，或者报错。  
比如，id('a') 调用函数时获取参数的长度。

```js
function id<Type>(value: Type): Type {
  console.log(value.length) // Property 'length' does not exist on type 'Type'
  return value
}

id(['a', 'b'])
```

解决：需要为泛型添加约束来收缩类型（缩窄类型取值范围）。  
主要有两种方式：1. 指定更加具体的类型，2. 通过 extends 关键字配合 interface 来添加约束。  

比如，将类型修改为 Type[]（Type 类型的数组），因为只要是数组就一定存在 length 属性，因此就可以访问了。
```js
// 其实泛型 Type 约束的是数组里面的元素
function id<Type>(value: Type[]): Type[] {
  console.log(value.length)
  return value
}

id<string>(['a', 'b'])
```

添加泛型约束
```js
interface ILength {
  length: number
}

// Type extends ILength 添加泛型约束
// 表示传入的类型必须满足 ILength 接口的要求才行，也就是得有一个 number 类型的 length 属性
function id<Type extends ILength>(value: Type): Type {
  console.log(value.length)
  return value
}

id('abc')
id(['a', 'b', 'c'])
id({ length: 8 })
```
```js
// T 也可以继承字面量类型
function id<T extends { length: number }>(value: T): number {
    return value.length
}
```

### 多个类型变量
泛型的类型变量可以有多个，并且类型变量之间还可以约束（比如第二个类型变量受第一个类型变量约束）
```js
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}
let person = { name: 'jack', age: 18 }
getProp(person, 'name')
```

```js
function getProp<Type, Key extends keyof { name: string; age: number }>(obj: Type, key: Key) {
  // Type 'Key' cannot be used to index type 'Type'.
  // 原因：因为 Type 是泛型，什么类型都有可能，而 'name' | 'age' 并没有和 Type 产生关系
  return obj[key]
}
let person = { name: 'jack', age: 18 }
getProp(person, 'name')
--------------------------------------
// Type extends object 表示：Type 应该是一个对象类型，如果不是对象类型，就会报错
// 注意：如果要用到对象类型，应该用 object ，而不是 Object
function getProperty<Type extends object, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}
```
### 泛型接口
接口也可以配合泛型来使用，以增加其灵活性，增强其复用性。

```js
interface User<T> {
  name: T
  age: number
}
const user: User<string> = {
  name: 'ifer',
  age: 18,
}
```
### 泛型工具

- `Partial<Type>`
- `Readonly<Type>`
- `Pick<Type, Keys>`

Partial 用来构造（创建）一个类型，将 Type 的所有属性设置为可选。
```js
type Props = {
  id: string
  children: number[]
}

// 构造出来的新类型 PartialProps 结构和 Props 相同，但所有属性都变为可选
type PartialProps = Partial<Props>
```

Readonly 用来构造一个类型，将 Type 的所有属性都设置为 readonly（只读）。  
当我们想给 id 属性重新赋值时，就会报错：无法分配到 “id”，因为它是只读属性。

```js
type Props = {
  id: string
  children: number[]
}
// 构造出来的新类型 ReadonlyProps 结构和 Props 相同，但所有属性都变为只读的啦
type ReadonlyProps = Readonly<Props>

let props: ReadonlyProps = { id: '1', children: [] }
props.id = '2' // Cannot assign to 'id' because it is a read-only property
```

Pick   

`Pick<Type, Keys`> 从 Type 中选择一组属性来构造新类型。  
Pick 工具类型有两个类型变量，1. 表示选择谁的属性，2. 表示选择哪几个属性。  
第二个类型变量传入的属性只能是第一个类型变量中存在的属性。  
构造出来的新类型 PickProps，只有 id 和 title 两个属性类型。  

```js
interface Props {
  id: string
  title: string
  children: number[]
}
// 摘出 id 和 title
type PickProps = Pick<Props, 'id' | 'title'>

// 排除 id 和 title
type OmitProps = Omit<Props, 'id' | 'title'>
```

## tsconfig.json
```js

{ 
  "compilerOptions": { 
    /* 基本选项 */ 
    "target": "es5", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT' 
    "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015' 
    "lib": [], // 指定要包含在编译中的库文件 
    "allowJs": true, // 允许编译 javascript 文件 
    "checkJs": true, // 报告 javascript 文件中的错误 
    "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react' 
    "declaration": true, // 生成相应的 '.d.ts' 文件 
    "sourceMap": true, // 生成相应的 '.map' 文件
    "outFile": "./", // 将输出文件合并为一个文件 
    "outDir": "./", // 指定输出目录 
    "rootDir": "./", // 用来控制输出目录结构 --outDir. 
    "removeComments": true, // 删除编译后的所有的注释 
    "noEmit": true, // 不生成输出文件 
    "importHelpers": true, // 从 tslib 导入辅助工具函数 
    "isolatedModules": true, // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）. 

    /* 严格的类型检查选项 */ 
    "strict": true, // 启用所有严格类型检查选项 
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true, // 启用严格的 null 检查 
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict' 

    /* 额外的检查 */ 
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "noUnusedParameters": true, // 有未使用的参数时，抛出错误 
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿） 

    /* 模块解析选项 */ 
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6) 
    "baseUrl": "./", // 用于解析非相对模块名称的基目录 
    "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表 
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容 
    "typeRoots": [], // 包含类型声明的文件列表 
    "types": [], // 需要包含的类型声明文件名列表 
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。 

    /* Source Map Options */ 
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置 
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件 
    "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性 

    /* 其他选项 */ 
    "experimentalDecorators": true, // 启用装饰器 
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持 
  } 
}
```