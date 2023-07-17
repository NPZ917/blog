## TS

- JS 的超集
- JS 的基础上加上了类型系统

## 安装 使用

```js
npm install -g typescript

tsc test.js => test.js
```

## 数据类型

- 基本类型 string number boolean symbol bigint null undefined
- 引用类型 Array Tuple-元组 object function Promise Date ....
- 特殊类型 any unknown void never enum-枚举
- 类型推论
- 字面量类型
- 交叉类型

### 基本类型

- null 和 undefined 一旦赋值，就不能再赋值给其他类型

```ts
let str: string = 'N'
let num: number = 1
let bool: boolean = false
let sym: symbol = Symbol()
let num1: bigint = 1n
let n: null = null
let u: undefined = undefined
```

### 引用类型

#### Array

- 类型名称 + []
- Array<数据类型>

```ts
let arr: number[] = [1, 2, 3, 4]
let arr1: Array<number> = [1, 2, 3, 4]
let arr2: Array<number | string> = [1, 2, 3, '4']
```

#### Tuple

限制元素的类型和个数的数组

```ts
let arr: [number, string] = [1, '2']
```

#### object

- 可读属性 `?`
- 只读属性 readonly
- 任意属性

```ts
interface A {
  a: string
  d?: number // 可选属性
  readonly e: string //只读属性 不可修改
  [f: string]: any //任意属性-索引签名
}
```

#### function

- function 箭头函数
- 定义参数 和 返回值(通常省略，TS 的类型推论可以推断)

```ts
// 函数声明
function add(num1: number, num2: number): number {
  return num1 + num2
}

// 箭头函数
const add = (num1: number, num2: number): number => {
  return num1 + num2
}

//
type AddFn = (num1: number, num2: number) => number

const add: AddFn = (num1, num2) => {
  return num1 + num2
}
```

##### 参数类型

- 可选参数 `?`
- 默认参数 `=`
- 剩余参数 `...`
- 函数重载 为用一个函数提供多个函数类型定义

```ts
// 可选参数
function add(start?: number, end?: number): void {
  console.log(start, end)
}
// 默认参数
function add(start: number = 0, end: number = 0) {}
// 剩余参数
function add(...numbers: number[]) {}
// 函数重载
function greet(name: string): string
function greet(name: string[]): string[]
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

### 特殊类型

- any 所有类型的顶级类型，任何类型都可以归于 any 类型 `不指定变量的类型，默认 any`
- unknown 比 any 严格，unknown 只能赋值给 unknown 和 any 类型
- void 函数没有返回值，TS 会默认函数的返回值为 void 类型
- never 不可能的类型
- enum 枚举 默认从 0 开始自增
  - 枚举的类型只能是 string 或 number
  - 名称不能为关键字
  - 数字枚举 字符串枚举 常量枚举 异构枚举

```ts
// unknown
let a: unknown
let b: unknown = a // ok
let b: string = a // error

// void
const add = (): void => {} // ok
const add = (): void => {
  return 1
} // error

// never
function add(): never {
  throw new Error('Error')
}
// enum
//
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
//
enum Gender {
  female,
  male,
}
type User = {
  name: string
  age: number
  // gender: 'male' | 'female' // 但后台需要 0 和 1
  gender: Gender
}

const user: User = {
  name: 'ifer',
  age: 18,
  gender: Gender.male,
}
```

### 类型推论

TS 的类型推论机制会帮助提供类型，可以不写  
常见的发生类型推论的 2 种场景：声明变量并初始化时；决定函数返回值时。

### 字面量类型

```ts
let str1 = 'Hello TS'
const str2 = 'Hello TS'
let num: 1 | 2 | 3 = 1

str1 = 'N' // error
```

### 交叉类型/`& ` 联合类型/`|`

- 交叉类型 多个类型合并成一个类型 `&` 连接
  - 同名基础属性报错
  - 同名非基础属性 ok
- 联合类型 取值可以为多种类型的一种

```ts
// 交叉类型
// 1
type person1 = { name: string }
type person2 = { age: number }

type person3 = {
  a: person1
}

type person4 = {
  a: person2
}

type Person5 = person3 & person4

const per1: Person5 = {
  a: {
    name: 'N',
    age: 18
  }
}

type Person6 = person1 & person2

const per2: Person6 = {
  name: 'N',
  age: 18,
}
// 2
ype person1 = { name: string }
type person2 = { age: number }

type person = person1 & person2

const per: person = {
  name: 'N',
  age: 18,
}

// 联合类型
let arr: Array<number | string> = [1, 2, '333']
```

## 类型断言

告诉编辑器，不用检查，变量就是为某种类型

- 类型断言
  - 尖括号
  - as 推荐
- 非空断言 `!`
- 确认值断言 告诉 TS 该属性会被明确赋值
- 断言失效 => 双重断言

```ts
// 类型断言
// as
const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement

// 尖括号
const myCanvas = <HTMLCanvasElement>document.getElementById('main_canvas')

// 非空断言
function fun(value: string | undefined | null) {
  const str: string = value // error value 可能为 undefined 和 null
  const str: string = value! //ok
  const length: number = value.length // error value 可能为 undefined 和 null
  const length: number = value!.length //ok
}

// 确认值断言
let num: number
let num1!: number

console.error(num) // error
console.log(num1) // ok

// 双重断言
function handle(event: Event) {
  const element = event as HTMLElement // Error
}
function handle(event: Event) {
  const element = event as any as HTMLElement // ok
}
```

## 类型守卫

- 确保 该类型在一定的范围内
- `in` 判断属性是哪个里面的
- `typeof` 判断基本数据类型
- `instanceof` A instanceof B
- `is`

```ts
// in
interface A {
  b: string
  c: number
}

interface B {
  b: string
  d: true
}

const getAttribute = (data: A | B) => {
  if ('c' in data) {
    console.error(1)
  }

  if ('d' in data) {
    console.error(2)
  }
}
getAttribute({ b: '1', c: 1 })
getAttribute({ b: '1', d: true })

// typeof
const getAttribute = (data: number | string) => {
  if (typeof data === 'string') {
  }
  if (typeof data === 'number') {
  }
}
// instanceof

// is
```

## 别名 接口

- 别名 type
- 接口 interface

- 都可以描述对象或者函数。(interface 描述时不需要 =, type 描述时需要 =)
- 都允许拓展，语法不一样(interface 是通过 extends 进行拓展, type 通过 & 符号进行拓展)
- type 除了可以描述对象或函数，实际上可以为任意类型指定别名。
- 相同的 interface 声明能够合并，相同的 type 声明会报错。
- 一般使用 interface 来描述对象结构，用 type 来描述类型关系。

## 泛型

不预先指定类型，使用时根据传入的类型来定义

### 基本语法

```ts
function id<T>(value: T): T {
  return value
}

const num = id<number>(10)
const str = id<string>('a')
```

### 多类型

```ts
const calcArray = <T, U>(name: T, age: U): { name: T; age: U } => {
  const res: { name: T; age: U } = { name, age }
  return res
}

const res = calcArray<string, number>('N', 18)
```

### 泛型接口

```ts
interface A<T> {
  data: T
}

const Info: A<string> = { data: '1' }
```

### 泛型类

```ts
class clacArray<T> {
  private arr: T[] = []

  add(value: T) {
    this.arr.push(value)
  }
  getValue(): T {
    let res = this.arr[0]
    console.log(this.arr)
    return res
  }
}

const res = new clacArray()

res.add(1)
res.add(2)
res.add(3)

res.getValue() //[1, 2, 3]
console.log(res.getValue) // 1
```

### 泛型类型别名

```ts
type Info<T> = {
  name?: T
  age?: T
}

const res: Info<string> = { name: 'N' }
const res1: Info<number> = { age: 7 }
```

### 泛型默认参数

```ts
const calcArray = <T = string>(data: T): T[] => {
  let list: T[] = []
  for (let i = 0; i < 3; i++) {
    list.push(data)
  }
  return list
}
```

### 常用

- T Type 类型
- K Key 键
- V Value 值
- E Element 元素

### 工具

- extends
- typeof
- keyof 可以获取一个对象接口的所有 key 值,可以检查对象上的键是否存在
- 索引访问操作符
- in
- infer
- Partial `Partial<T>` 作用：将所有属性变为可选的 ?
- Required `Required<T>` 作用：将所有属性变为必选的，与 Partial 相反
- Readonly `Readonly<T>` 作用：将所有属性都加上 readonly 修饰符来实现。无法修改
- Record `Record<K, T>` 作用：将 K 中所有的属性的值转化为 T 类型。
- Pick 作用：将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。
- Exclude `Exclude<T, U>` 将 T 类型中的 U 类型剔除。
- Extra `Extra<T, U>` 将 T 可分配给的类型中提取 U。与 Exclude 相反
- Omit `Omit<T, U>` 将已经声明的类型进行属性剔除获得新类型
- NonNullable `NonNullable<T>` 作用：从 T 中排除 null 和 undefined
- ReturnType `ReturnType<T>` 用于获取 函数 T 的返回类型。
- Parameters `Parameters<T>` 作用：用于获取 获取函数类型的参数类型

```ts
// extends
interface Props {
  length: number
}

const calcArray = <T>(data: T): number => {
  return data.length // error
}
const calcArray = <T extends Props>(data: T): number => {
  return data.length // ok
}
-------------------------------------------------------------

// typeof
let info = {
  name: 'N',
  age: 18,
  male: true,
}
type Data = typeof info // type Data = { name: string; age: number; male: boolean }

const getInfo = (data: Data) => {
  return data.age
}
-------------------------------------------------------------

// keyof
interface Props {
  name: string
  age: number
  sex: boolean
}

type PropsKey = keyof Props //包含 name， age， sex

const res: PropsKey = 'name' // ok
const res1: PropsKey = 'tel' // error

// 泛型中的应用
const getInfo = <T, K extends keyof T>(data: T, key: K): T[K] => {
  return data[key]
}

const info = {
  name: '小杜杜',
  age: 7,
  sex: true,
}

getInfo(info, 'name') //ok
getInfo(info, 'tel') //error
-------------------------------------------------------------

// 索引访问操作符
interface Props {
  name: string
  age: number
}

type age = Props['age']
-------------------------------------------------------------

// in
type name = 'name' | 'age' | 'sex'

type Props = {
  [p in name]: any
}

// infer
type Info<T> = T extends { a: infer U; b: infer U } ? U : never;

type Props = Info<{ a: string; b: number }>; // Props类： string | number

type Props1 = Info<number> // Props类型： never

// Partial
interface Props {
  name: string,
  age: number
}

const info: Partial<Props> = {
  name: 'N'
}

// Required
interface Props {
  name: string,
  age: number,
  sex?: boolean
}

const info: Required<Props> = {
  name: 'N',
  age: 7,
  sex: true
}

// Readonly
interface Props {
  name: string
  age: number
}

let info: Readonly<Props> = {
  name: 'N',
  age: 7
}

info.age = 1 //error read-only 只读属性

// Record
interface Props {
  name: string,
  age: number
}

type InfoProps = 'JS' | 'TS'

const Info: Record<InfoProps, Props> = {
  JS: {
    name: 'N',
    age: 7
  },
  TS: {
    name: 'TypeScript',
    age: 11
  }
}

// Pick
interface Props {
  name: string,
  age: number,
  sex: boolean
}

type nameProps = Pick<Props, 'name' | 'age'>

const info: nameProps = {
  name: 'N',
  age: 7
}

// Exclude
// 数字类型
type numProps = Exclude<1 | 2 | 3, 1 | 2> // 3
type numProps1 = Exclude<1, 1 | 2> // nerver
type numProps2 = Exclude<1, 1> // nerver
type numProps3 = Exclude<1 | 2, 7> // 1 2

// 字符串类型
type info = "name" | "age" | "sex"
type info1 = "name" | "age"
type infoProps = Exclude<info, info1> //  "sex"

// 类型
type typeProps = Exclude<string | number | (() => void), Function> // string | number

// 对象
type obj = { name: 1, sex: true }
type obj1 = { name: 1 }
type objProps = Exclude<obj, obj1> // nerver

// Extra
type numProps = Extract<1 | 2 | 3, 1 | 2> // 1 | 2

// Omit
type InfoProps = {
  name: string,
  age: number,
  sex: boolean
}

type Props = Omit<InfoProps, 'sex'> // { name: string; age: number }

// NonNullable
type Props = NonNullable<string | number | undefined | null> // { string | number }

// ReturnType
type Props = ReturnType<() => string> // string
type Props1 = ReturnType<<T extends U, U extends number>() => T>; // number
type Props2 = ReturnType<any>; // any
type Props3 = ReturnType<never>; // any

// Parameters
type Props = Parameters<() => string> // []
type Props1 = Parameters<(data: string) => void> // [string]
type Props2 = Parameters<any>; // unknown[]
type Props3 = Parameters<never>; // never

```

## class

### 基本方法

```ts
class Info {
  public readonly name: string // 只读属性
  #name: string //私有字段
  //静态属性
  static name1: string = 'Domesy'

  //成员属性，实际上是通过public上进行修饰，只是省略了
  nmae2: string = 'Hello' //ok
  name3: string //error
  name4!: string //ok 不设置默认值的时候必须加入 !

  //构造方法
  constructor(_name: string) {
    this.name4 = _name
  }

  //静态方法
  static getName = () => {
    return '我是静态方法'
  }

  //成员方法
  getName4 = () => {
    return `我是成员方法:${this.name4}`
  }

  //get 方法
  get name5() {
    return this.name4
  }

  //set 方法
  set name5(name5) {
    this.name4 = name5
  }
}

const setName = new Info('你好')
console.log(Info.name1) //  "Domesy"
console.log(Info.getName()) // "我是静态方法"
console.log(setName.getName4()) // "我是成员方法:你好"
```
