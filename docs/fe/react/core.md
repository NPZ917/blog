# React

## 搭建

```js
npx create-react-app 项目名称
```

## JSX

1. JSX 是 JavaScript XML（HTML）的缩写，表示在 JS 代码中书写 HTML 结构
2. 优势

- 采用类似于 HTML 的语法，降低学习成本
- All In JS
- React.createElement，存在标签嵌套，杂乱

3. JSX 并不是标准的 JS 语法，是 JS 的语法扩展，浏览器默认是不识别的，脚手架中内置的 @babel/plugin-transform-react-jsx 包，用来解析该语法

### JSX 中使用 js 表达式

语法: `{ js表达式 }`

### JSX 列表渲染

使用`map`，需要加 key

```js
const songs = [
  { id: 1, name: '痴心绝对' },
  { id: 2, name: '像我这样的人' },
  { id: 3, name: '南山南' },
]

function App() {
  return (
    <div className="App">
      <ul>
        {songs.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
```

### JSX 条件渲染

根据是否满足条件生成 HTML 结构，比如 Loading 效果  
可以使用`三元运算符`/`逻辑与(&&)运算符`

```js
const flag = true
function App() {
  return (
    <div className="App">
      {/* 条件渲染字符串 */}
      {flag ? 'react' : 'vue'}
      {/* 条件渲染标签/组件 */}
      {flag ? <span>this is span</span> : null}
    </div>
  )
}
export default App
```

### JSX 样式处理

行内样式 - style

```js
function App() {
  return (
    <div className="App">
      <div style={{ color: 'red' }}>this is a div</div>
    </div>
  )
}
export default App
-------------------------------------------
const styleObj = {
    color:red
}

function App() {
  return (
    <div className="App">
      <div style={ styleObj }>this is a div</div>
    </div>
  )
}

export default App
```

类名 - className（推荐）

```js
// app.css
.title {
  font-size: 30px;
  color: blue;
}
---------------------
// 动态类名
import './app.css'
const showTitle = true
function App() {
  return (
    <div className="App">
      <div className={ showTitle ? 'title' : ''}>this is a div</div>
    </div>
  )
}
export default App
```

### 注意事项

- JSX 必须有一个根节点，如果没有根节点，可以使用<></>（幽灵节点）替代
- 所有标签必须形成闭合，成对闭合或者自闭合都可以
- JSX 中的语法更加贴近 JS 语法，属性名采用驼峰命名法 class -> className οnclick => onClick
- JSX 支持多行（换行），如果需要换行，需使用() 包裹，防止 bug 出现

## 组件基础

- 函数组件
- 类组件

### 函数组件

使用 JS 的函数（或箭头函数）创建的组件，就叫做函数组件

- 组件的名称必须首字母大写，react 内部会根据这个来判断是组件还是普通的 HTML 标签
- 函数组件必须有返回值，表示该组件的 UI 结构；如果不需要渲染任何内容，则返回 null
- 组件就像 HTML 标签一样可以被渲染到页面中。组件表示的是一段结构内容，对于函数组件来说，渲染的内容是函数的返回值就是对应的内容
- 使用函数名称作为组件标签名称，可以成对出现也可以自闭合

```js
// 定义函数组件
function HelloFn() {
  return <div>函数组件!</div>
}

// 定义类组件
function App() {
  return (
    <div className="App">
      {/* 渲染函数组件 */}
      <HelloFn />
      <HelloFn></HelloFn>
    </div>
  )
}
export default App
```

### 类组件

class 创建的组件

- 类名称也必须以大写字母开头
- 类组件应该继承 React.Component 父类，从而使用父类中提供的方法或属性
- 类组件必须提供 render 方法 render 方法必须有返回值，表示该组件的 UI 结构

```js
import React, { Component } from 'react'

// 定义类组件
class HelloC extends Component {
  render() {
    return <div>类组件!</div>
  }
}

function App() {
  return (
    <div className="App">
      {/* 渲染类组件 */}
      <HelloC />
      <HelloC></HelloC>
    </div>
  )
}
export default App
```

### 函数组件事件绑定

```js
function HelloFn() {
  // 定义事件回调函数
  const clickHandler = () => {
    console.log('事件被触发了')
  }
  return (
    // 绑定事件
    <button onClick={clickHandler}>click me!</button>
  )
}
```

#### 获取事件对象

```js
function HelloFn() {
  // 定义事件回调函数
  const clickHandler = (e) => {
    console.log('事件被触发了', e)
  }
  return (
    // 绑定事件
    <button onClick={clickHandler}>click me!</button>
  )
}
```

#### 传递额外参数

改造事件绑定为箭头函数 在箭头函数中完成参数的传递

```js
const TestComponent = () => {
  const list = [
    {
      id: 1001,
      name: 'react'
    },
    {
      id: 1002,
      name: 'vue'
    }
  ]
  const onDel = (e, id) => {
    console.log(e, id)
  }
  return (
    <ul>
      {list.map(item =>（
        <li key={item.id}>
          {item.name}
          {/*<button onClick={(e) => onDel(e, item.id)}>x</button> */}
          <button onClick={() => onDel(item.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}

function App () {
  return (
    <div>
      <TestComponent />
    </div>
  )
}

export default App
```

### 类组件事件绑定

1. 存在 this 丢失问题

```js
render(){
  return (<a href="#" onClick={this.handleClick}>click me </a>
})

render(){
 return React.createElement(
  "a",
  { onClick: this.handleClick},
  "click me"
  );
 }
```

onClick: this.handleClick，相当于相当于 onClick = {function}，onClick 只是一个中间变量, this.handleClick 作为一个回调函数传给 点击事件处理函数 调用
使用 babel 将 JSX 和 ES6 转 ES5 的时候，默认转化之后是严格模式，此时因为中间变量接收了事件处理函数，隐式丢失将使函数内 this 失去调用者，值为 undefiend

onClick={`activateLasers`} 而非 onClick={`activateLasers()`} 相当于 activateLasers()结果赋值 onClick，页面渲染的时候执行该函数，点击事件时，一直拿到的 activateLasers()的返回值，如果 activateLasers() 里面 this.setState({}), 就会一直更新状态，一直 render，死循环了，`react Maximum update depth exceeded.`

2. 解决:
   - 箭头函数
   - constructor 里 bind(this) `this.handleClick = this.handleClick.bind(this);`

```js
import React from 'react'
class Component extends React.Component {
  clickHandler = (e, num) => {
    // 这里的this指向的是正确的当前的组件实例对象
    // 可以非常方便的通过this关键词拿到组件实例身上的其他属性或者方法
    console.log(this)
  }

  clickHandler1() {
    // 这里的this 不指向当前的组件实例对象而指向undefined 存在this丢失问题
    console.log(this)
  }

  render() {
    return (
      <div>
        <button onClick={(e) => this.clickHandler(e, '123')}>click me</button>
        <button onClick={this.clickHandler1}>click me</button>
      </div>
    )
  }
}

function App() {
  return (
    <div>
      <CComponent />
    </div>
  )
}

export default App
```

### 组件状态

在 React hook 出来之前，函数式组件是没有自己的状态的

#### 初始化状态

```js
class Counter extends React.Component {
  // 初始化状态
  state = {
    count: 0,
  }
  render() {
    return <button>计数器</button>
  }
}
```

#### 读取状态

```js
class Counter extends React.Component {
  // 初始化状态
  state = {
    count: 0,
  }
  render() {
    // 读取状态
    return <button>计数器{this.state.count}</button>
  }
}
```

#### 修改状态

- this.setState({ })
- setState 是异步, 提升效率 => render
  - react18 之前 在组件生命周期或 React 合成事件中，setState 是异步 在 setTimeout 或者原生 dom 事件中，setState 是同步；18 之后默认异步？？？？？Todo
  - 多个 setState 的调用合并成一个来执行，setState 时，state 并不会立即更新
  - 解决: setState 接收的参数还可以是一个函数，在这个函数中可以拿先前的状态，并通过这个函数的返回值得到下一个状态。

```js
class Counter extends React.Component {
  // 定义数据
  state = {
    count: 0,
  }
  // 定义修改数据的方法
  setCount = () => {
    // this.setState({
    //   count: this.state.count + 1
    // })
    this.setState((prevState) => {
      return {
        count: prevState.count + 1,
      }
    })
  }
  // 使用数据 并绑定事件
  render() {
    return <button onClick={this.setCount}>{this.state.count}</button>
  }
}
```

#### 注意

1. NO

```js
state = {
  count: 0,
  list: [1, 2, 3],
  person: {
    name: 'jack',
    age: 18,
  },
}
// 直接修改简单类型Number
this.state.count++
++this.state.count
this.state.count += 1
this.state.count = 1

// 直接修改数组
this.state.list.push(123)
this.state.list.spice(1, 1)

// 直接修改对象
this.state.person.name = 'rose'
```

2. 基于当前状态创建新值

```js
this.setState({
  count: this.state.count + 1
  list: [...this.state.list, 4],
  person: {
    ...this.state.person,
    // 覆盖原来的属性 就可以达到修改对象中属性的目的
    name: 'rose'
  }
})
```

### 表单处理

- 受控表单组件
- 非受控表单组件

1. 受控表单组件
   input 框自己的状态被 React 组件状态控制 - 将 `state` 和 `input value` 关联

```js
import React from 'react'

class InputComponent extends React.Component {
  // 声明组件状态
  state = {
    message: 'this is message',
  }
  // 声明事件回调函数
  changeHandler = (e) => {
    this.setState({ message: e.target.value })
  }
  render() {
    return (
      <div>
        {/* 绑定value 绑定事件*/}
        <input value={this.state.message} onChange={this.changeHandler} />
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <InputComponent />
    </div>
  )
}
export default App
```

2. 非受控表单组件
   通过手动操作 dom 的方式获取文本框的值，文本框的状态不受 react 组件的 state 中的状态控制，直接通过原生 dom 获取输入框的值

```js
import React, { createRef } from 'react'

class InputComponent extends React.Component {
  // 使用createRef产生一个存放dom的对象容器
  msgRef = createRef()

  changeHandler = () => {
    console.log(this.msgRef.current.value)
  }

  render() {
    return (
      <div>
        {/* ref绑定 获取真实dom */}
        <input ref={this.msgRef} />
        <button onClick={this.changeHandler}>click</button>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <InputComponent />
    </div>
  )
}
export default App
```

## 组件通信

- 父子关系
- 兄弟关系 自定义事件模式产生技术方法 eventBus / 通过共同的父组件通信
- 其他关系 mobx / redux / zustand

### 父传子

```js
import React from 'react'

// 函数式子组件
function FSon(props) {
  console.log(props)
  return (
    <div>
      子组件1
      {props.msg}
    </div>
  )
}

// 类子组件
class CSon extends React.Component {
  render() {
    return (
      <div>
        子组件2
        {this.props.msg}
      </div>
    )
  }
}
// 父组件
class App extends React.Component {
  state = {
    message: 'this is message',
  }
  render() {
    return (
      <div>
        <div>父组件</div>
        <FSon msg={this.state.message} />
        <CSon msg={this.state.message} />
      </div>
    )
  }
}

export default App
```

### props

1.  props 是只读对象（readonly）
    根据单项数据流的要求，子组件只能读取 props 中的数据，不能进行修改

2.  props 可以传递任意数据
    数字、字符串、布尔值、数组、对象、函数、JSX

```js
class App extends React.Component {
  state = {
    message: 'this is message',
  }
  render() {
    return (
      <div>
        <div>父组件</div>
        <FSon
          msg={this.state.message}
          age={20}
          isMan={true}
          cb={() => {
            console.log(1)
          }}
          child={<span>this is child</span>}
        />
        <CSon msg={this.state.message} />
      </div>
    )
  }
}
```

### 子传父

父组件给子组件传递回调函数，子组件调用

```js
import React from 'react'

// 子组件
function Son(props) {
  function handleClick() {
    // 调用父组件传递过来的回调函数 并注入参数
    props.changeMsg('this is newMessage')
  }
  return (
    <div>
      {props.msg}
      <button onClick={handleClick}>change</button>
    </div>
  )
}

class App extends React.Component {
  state = {
    message: 'this is message',
  }
  // 提供回调函数
  changeMessage = (newMsg) => {
    console.log('子组件传过来的数据:', newMsg)
    this.setState({
      message: newMsg,
    })
  }
  render() {
    return (
      <div>
        <div>父组件</div>
        <Son
          msg={this.state.message}
          // 传递给子组件
          changeMsg={this.changeMessage}
        />
      </div>
    )
  }
}

export default App
```

### 兄弟

通过状态提升机制，利用共同的父组件实现兄弟通信

```js
import React from 'react'

// 子组件A
function SonA(props) {
  return (
    <div>
      SonA
      {props.msg}
    </div>
  )
}
// 子组件B
function SonB(props) {
  return (
    <div>
      SonB
      <button onClick={() => props.changeMsg('new message')}>changeMsg</button>
    </div>
  )
}

// 父组件
class App extends React.Component {
  // 父组件提供状态数据
  state = {
    message: 'this is message',
  }
  // 父组件提供修改数据的方法
  changeMsg = (newMsg) => {
    this.setState({
      message: newMsg,
    })
  }

  render() {
    return (
      <>
        {/* 接收数据的组件 */}
        <SonA msg={this.state.message} />
        {/* 修改数据的组件 */}
        <SonB changeMsg={this.changeMsg} />
      </>
    )
  }
}

export default App
```

### 跨组件通信 Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法

```js
const { Provider, Consumer } = createContext()

<Provider value={this.state.message}>
    {/* 根组件 */}
</Provider>

<Consumer >
    {value => /* 基于 context 值进行渲染*/}
</Consumer>
```

```js
import React, { createContext } from 'react'

// 1. 创建Context对象
const { Provider, Consumer } = createContext()

// 3. 消费数据
function ComC() {
  return <Consumer>{(value) => <div>{value}</div>}</Consumer>
}

function ComA() {
  return <ComC />
}

// 2. 提供数据
class App extends React.Component {
  state = {
    message: 'this is message',
  }
  render() {
    return (
      <Provider value={this.state.message}>
        <div className="app">
          <ComA />
        </div>
      </Provider>
    )
  }
}

export default App
```

## 组件进阶

### children 属性

表示该组件的子节点，只要组件内部有子节点，props 中就有该属性
children 可以是

- 普通文本
- 普通标签元素
- 函数 / 对象
- JSX

### props 校验-场景和使用

组件的使用者可能报错了也不知道为什么

- 安装属性校验包：npm i prop-types -S
- 导入 prop-types 包
- 使用 组件名.propTypes = {} 给组件添加校验规则

```js
import PropTypes from 'prop-types'

const List = (props) => {
  const arr = props.colors
  const lis = arr.map((item, index) => <li key={index}>{item.name}</li>)
  return <ul>{lis}</ul>
}

List.propTypes = {
  colors: PropTypes.array,
}
```

### props 校验-规则说明

四种常见结构

- 常见类型：array、bool、func、number、object、string
- React 元素类型：element
- 必填项：isRequired
- 特定的结构对象：shape({})

```js
// 常见类型
optionalFunc: PropTypes.func,
// 必填 只需要在类型后面串联一个isRequired
requiredFunc: PropTypes.func.isRequired,
// 特定结构的对象
optionalObjectWithShape: PropTypes.shape({
	color: PropTypes.string,
	fontSize: PropTypes.number
})
```

### props 校验-默认值

通过 defaultProps 可以给组件的 props 设置默认值，在未传入 props 的时候生效

#### 函数组件

直接使用函数参数默认值

```js
function List({ pageSize = 10 }) {
  return <div>此处展示props的默认值：{pageSize}</div>
}

;<List />
```

#### 类组件

使用类静态属性声明默认值，static defaultProps = {}

```js
class List extends Component {
  static defaultProps = {
    pageSize: 10,
  }
  render() {
    return <div>此处展示props的默认值：{this.props.pageSize}</div>
  }
}
;<List />
```

### 生命周期

旧版

1. 挂载阶段

- `constructor` -> `componentWillMount`(UNSAFE\_) -> `render` -> `componentDidMount`(请求，dom)

2. 更新阶段

- 父组件重新 render 触发的更新
  - `componentWillReceiveProps`(UNSAFE\_)
  - `shouldComponentUpdate` 控制组件是否更新的阀门，返回值为布尔值，默认为 true 。若返回 false ，则后续流程不会进行。
  - `componentWillUpdate`(UNSAFE\_)
  - `render`
  - `componentDidUpdate`
- 组件内部调用 this.setState() 修改状态
  - `shouldComponentUpdate`
  - `componentWillUpdate`(UNSAFE\_)
  - `render`
  - `componentDidUpdate`
- 组件内部调用 this.forceUpdate() 强制更新
  - `componentWillUpdate`(UNSAFE\_)
  - `render`
  - `componentDidUpdate`

3. 卸载阶段

- `componentWillUnmount` (关闭定时器、取消订阅消息)
  新版
  废弃 `componentWillMount` `componentWillReceiveProps` `componentWillUpdate` UNSAFE\_
  新增两个钩子 `getDerivedStateFromProps` `getSnapshotBeforeUpdate`

## 高阶组件

是什么: 参数为组件，返回值为新组件的函数

为什么:

- 抽取重复代码，实现组件复用 如页面复用
- 条件渲染，控制组件的渲染逻辑/渲染劫持 如权限控制
- 捕获/劫持被处理的组件的生命周期 如日志打点

怎么做:

- 属性代理
- 反向继承

```jsx

```

## Hooks

- 以 `use` 开头的函数被称为 Hook
- 状态逻辑复用，维护
- 函数式组件可以拥有自己的状态，处理一些副作用
- 只能在组件或者自定义 Hook 的最顶层使用。不能在条件语句、循环语句或者其他嵌套函数内调用 Hook

|     hooks      |        hooks         |                        功能                        |
| :------------: | :------------------: | :------------------------------------------------: |
|    数据更新    |       useState       |                        状态                        |
|                |      useReducer      |          订阅状态，创建 reducer，更新视图          |
|                | useSyncExternalStore |    concurrent 模式下，订阅外部数据源，触发更新     |
|                |    useTransition     |          concurrent 模式下，过渡更新任务           |
|                |   useDeferredValue   |          concurrent 模式下，更新章台滞后           |
|   执行副作用   |      useEffect       |         异步状态下，视图更新后，执行副作用         |
|                |   useLayoutEffect    |         同步状态下，试图更新前，执行副作用         |
|                |  useInsertionEffect  |            用于处理 css in js 缺陷问题             |
| 状态获取与传递 |      useContext      | 订阅获取 react context 上下文，用于跨层级状态传递  |
|                |        useRef        |                获取元素或者组件实例                |
|                | useImperativeHandle  |            用于函数组件能够被 ref 获取             |
|    性能优化    |       useMemo        |                 派生并缓存新的状态                 |
|                |     useCallback      | 缓存状态，常用于缓存提供给子代组件的 callback 回调 |
|      工具      |    useDebugValue     |                   devtool debug                    |
|                |        useId         |                     服务端渲染                     |

1，useState
使得函数组件拥有 state , 函数组件通过 useState 可以让组件重新渲染，更新视图

```jsx
import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

2. useReducer
   用于在组件中使用状态和状态更新逻辑

```jsx
import React, { useReducer } from 'react'

function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      return state
  }
}

function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0)

  const increment = () => {
    dispatch({ type: 'increment' })
  }

  const decrement = () => {
    dispatch({ type: 'decrement' })
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}
```

3. useSyncExternalStore

```jsx

```

4. useTransition

```jsx

```

5. useDeferredValue

```jsx

```

6. useEffect
   用于在组件渲染后执行副作用操作

```jsx
import React, { useEffect } from 'react'

function Example() {
  useEffect(() => {
    console.log('Component did mount')

    return () => {
      console.log('Component will unmount')
    }
  }, [])

  return <p>Hello, React!</p>
}
```

7. useLayoutEffect
   与 useEffect 类似，但在 DOM 更新之后同步触发副作用操作

```jsx
import React, { useLayoutEffect } from 'react'

function Example() {
  useLayoutEffect(() => {
    console.log('Component did mount')

    return () => {
      console.log('Component will unmount')
    }
  }, [])

  return <p>Hello, React!</p>
}
```

8. useInsertionEffect

```jsx

```

9.  useContext
    用于在组件中访问 React 的上下文（context）

```jsx
import React, { useContext } from 'react'

const ThemeContext = React.createContext('light')

function Button() {
  const theme = useContext(ThemeContext)

  return <button style={{ background: theme }}>Button</button>
}
```

10. useRef
    用于在组件之间共享可变的引用值

```jsx
import React, { useRef } from 'react'

function TextInput() {
  const inputRef = useRef()

  const focusInput = () => {
    inputRef.current.focus()
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  )
}
```

11. useImperativeHandle
    用于在 React 开发者工具中显示自定义 hook 的标签

```jsx
import { useDebugValue } from 'react'

function useCustomHook() {
  const value = 'Custom Value'
  useDebugValue(value)

  return value
}
```

12. useMemo
    用于缓存计算结果，以避免不必要的重复计算

```jsx
import React, { useMemo } from 'react'

function ExpensiveCalculation({ a, b }) {
  const result = useMemo(() => {
    console.log('Calculating...')
    return a + b
  }, [a, b])

  return <p>Result: {result}</p>
}
```

13. useCallback
    用于缓存回调函数，以避免不必要的函数创建

```jsx
import React, { useState, useCallback } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => {
    setCount(count + 1)
  }, [count])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

14. useDebugValue

```jsx

```

15. useId
    在 client 和 server 生成唯一的 id, 解决了在服务器渲染中，服务端和客户端产生 id 不一致的问题，更重要的是保障了在 streaming renderer(流式渲染) 中 id 的稳定性

```jsx

```
