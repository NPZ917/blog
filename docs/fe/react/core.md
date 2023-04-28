React

## 搭建
```js
npx create-react-app 项目名称
```

## JSX
1. JSX是 JavaScript XML（HTML）的缩写，表示在 JS 代码中书写 HTML 结构
2. 优势
  - 采用类似于HTML的语法，降低学习成本
  - All In JS
  - React.createElement，存在标签嵌套，杂乱
3. JSX 并不是标准的 JS 语法，是 JS 的语法扩展，浏览器默认是不识别的，脚手架中内置的 @babel/plugin-transform-react-jsx 包，用来解析该语法

### JSX 中使用js表达式
语法: `{ js表达式 }`

### JSX 列表渲染
使用`map`，需要加key
```js
const songs = [
  { id: 1, name: '痴心绝对' },
  { id: 2, name: '像我这样的人' },
  { id: 3, name: '南山南' }
]

function App() {
  return (
    <div className="App">
      <ul>
        {
          songs.map(item => <li key={item.id}>{item.name}</li>)
        }
      </ul>
    </div>
  )
}

export default App
```

### JSX 条件渲染
根据是否满足条件生成HTML结构，比如Loading效果  
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
- JSX必须有一个根节点，如果没有根节点，可以使用<></>（幽灵节点）替代
- 所有标签必须形成闭合，成对闭合或者自闭合都可以
- JSX中的语法更加贴近JS语法，属性名采用驼峰命名法  class -> className  οnclick => onClick
- JSX支持多行（换行），如果需要换行，需使用() 包裹，防止bug出现

## 组件基础  
- 函数组件
- 类组件
### 函数组件
使用 JS 的函数（或箭头函数）创建的组件，就叫做函数组件
- 组件的名称必须首字母大写，react内部会根据这个来判断是组件还是普通的HTML标签
- 函数组件必须有返回值，表示该组件的 UI 结构；如果不需要渲染任何内容，则返回 null
- 组件就像 HTML 标签一样可以被渲染到页面中。组件表示的是一段结构内容，对于函数组件来说，渲染的内容是函数的返回值就是对应的内容
- 使用函数名称作为组件标签名称，可以成对出现也可以自闭合

```js
// 定义函数组件
function HelloFn () {
  return <div>函数组件!</div>
}

// 定义类组件
function App () {
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
- 类组件必须提供 render 方法render 方法必须有返回值，表示该组件的 UI 结构

```js
import React, { Component } from 'react'

// 定义类组件
class HelloC extends Component {
  render () {
    return <div>类组件!</div>
  }
}

function App () {
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
function HelloFn () {
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
function HelloFn () {
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
1. 存在this丢失问题  
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
  onClick: this.handleClick，相当于相当于 onClick = {function}，onClick只是一个中间变量, this.handleClick 作为一个回调函数传给 点击事件处理函数 调用
  使用babel将JSX和ES6转ES5的时候，默认转化之后是严格模式，此时因为中间变量接收了事件处理函数，隐式丢失将使函数内this失去调用者，值为undefiend

  onClick={`activateLasers`} 而非 onClick={`activateLasers()`} 相当于 activateLasers()结果赋值onClick，页面渲染的时候执行该函数，点击事件时，一直拿到的activateLasers()的返回值，如果activateLasers() 里面this.setState({}), 就会一直更新状态，一直render，死循环了，`react Maximum update depth exceeded.`
 
2. 解决:
   - 箭头函数 
   - constructor里bind(this)  `this.handleClick = this.handleClick.bind(this);`

```js
import React from "react"
class Component extends React.Component {
  clickHandler = (e, num) => {
    // 这里的this指向的是正确的当前的组件实例对象 
    // 可以非常方便的通过this关键词拿到组件实例身上的其他属性或者方法
    console.log(this)
  }

  clickHandler1 () {
    // 这里的this 不指向当前的组件实例对象而指向undefined 存在this丢失问题
    console.log(this)
  }

  render () {
    return (
      <div>
        <button onClick={(e) => this.clickHandler(e, '123')}>click me</button>
        <button onClick={this.clickHandler1}>click me</button>
      </div>
    )
  }
}

function App () {
  return (
    <div>
      <CComponent />
    </div>
  )
}

export default App
```
### 组件状态
在React hook出来之前，函数式组件是没有自己的状态的
#### 初始化状态
```js
class Counter extends React.Component {
  // 初始化状态
  state = {
    count: 0
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
    count: 0
  }
  render() {
    // 读取状态
    return <button>计数器{this.state.count}</button>
  }
}
```
#### 修改状态
- this.setState({  })
- setState是异步, 提升效率 => render  
  - react18 之前 在组件生命周期或React合成事件中，setState是异步 在setTimeout或者原生dom事件中，setState是同步；18之后默认异步？？？？？Todo
  - 多个setState的调用合并成一个来执行，setState时，state并不会立即更新 
  - 解决: setState接收的参数还可以是一个函数，在这个函数中可以拿先前的状态，并通过这个函数的返回值得到下一个状态。
```js
class Counter extends React.Component {
  // 定义数据
  state = {
    count: 0
  }
  // 定义修改数据的方法
  setCount = () => {
    // this.setState({
    //   count: this.state.count + 1
    // })
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      };
    });
  }
  // 使用数据 并绑定事件
  render () {
    return <button onClick={this.setCount}>{this.state.count}</button>
  }
}
```
#### 注意
1. NO
```js
state = {
  count : 0,
  list: [1,2,3],
  person: {
     name:'jack',
     age:18
  }
}
// 直接修改简单类型Number
this.state.count++
++this.state.count
this.state.count += 1
this.state.count = 1

// 直接修改数组
this.state.list.push(123)
this.state.list.spice(1,1)

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
input框自己的状态被React组件状态控制 - 将 `state` 和 `input value` 关联
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
  render () {
    return (
      <div>
        {/* 绑定value 绑定事件*/}
        <input value={this.state.message} onChange={this.changeHandler} />
      </div>
    )
  }
}

function App () {
  return (
    <div className="App">
      <InputComponent />
    </div>
  )
}
export default App
```

2. 非受控表单组件
通过手动操作dom的方式获取文本框的值，文本框的状态不受react组件的state中的状态控制，直接通过原生dom获取输入框的值

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

function App () {
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
- 兄弟关系 自定义事件模式产生技术方法 eventBus  /  通过共同的父组件通信
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
    message: 'this is message'
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
1.  props是只读对象（readonly）
根据单项数据流的要求，子组件只能读取props中的数据，不能进行修改

2. props可以传递任意数据
数字、字符串、布尔值、数组、对象、函数、JSX

```js
class App extends React.Component {
  state = {
    message: 'this is message'
  }
  render() {
    return (
      <div>
        <div>父组件</div>
        <FSon 
          msg={this.state.message} 
          age={20} 
          isMan={true} 
          cb={() => { console.log(1) }} 
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
    message: 'this is message'
  }
  // 提供回调函数
  changeMessage = (newMsg) => {
    console.log('子组件传过来的数据:',newMsg)
    this.setState({
      message: newMsg
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
    message: 'this is message'
  }
  // 父组件提供修改数据的方法
  changeMsg = (newMsg) => {
    this.setState({
      message: newMsg
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

### 跨组件通信Context
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
import React, { createContext }  from 'react'

// 1. 创建Context对象 
const { Provider, Consumer } = createContext()


// 3. 消费数据
function ComC() {
  return (
    <Consumer >
      {value => <div>{value}</div>}
    </Consumer>
  )
}

function ComA() {
  return (
    <ComC/>
  )
}

// 2. 提供数据
class App extends React.Component {
  state = {
    message: 'this is message'
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

### children属性
表示该组件的子节点，只要组件内部有子节点，props中就有该属性
children可以是
- 普通文本
- 普通标签元素
- 函数 / 对象
- JSX

### props校验-场景和使用
组件的使用者可能报错了也不知道为什么
- 安装属性校验包：npm i prop-types -S
- 导入prop-types 包
- 使用 组件名.propTypes = {} 给组件添加校验规则

```js
import PropTypes from 'prop-types'

const List = props => {
  const arr = props.colors
  const lis = arr.map((item, index) => <li key={index}>{item.name}</li>)
  return <ul>{lis}</ul>
}

List.propTypes = {
  colors: PropTypes.array
}
```
### props校验-规则说明
四种常见结构
- 常见类型：array、bool、func、number、object、string
- React元素类型：element
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
### props校验-默认值
通过 defaultProps 可以给组件的props设置默认值，在未传入props的时候生效
#### 函数组件
直接使用函数参数默认值
```js
function List({pageSize = 10}) {
  return (
    <div>
      此处展示props的默认值：{ pageSize }
    </div>
  )
}

<List />
```
#### 类组件
使用类静态属性声明默认值，static defaultProps = {}
```js
class List extends Component {
  static defaultProps = {
    pageSize: 10
  }
  render() {
    return (
      <div>
        此处展示props的默认值：{this.props.pageSize}
      </div>
    )
  }
}
<List />
```

### 生命周期
旧版
1. 挂载阶段
  - `constructor` -> `componentWillMount`(UNSAFE_) -> `render` -> `componentDidMount`(请求，dom)
2. 更新阶段  
- 父组件重新 render 触发的更新
   - `componentWillReceiveProps`(UNSAFE_)
   - `shouldComponentUpdate`  控制组件是否更新的阀门，返回值为布尔值，默认为 true 。若返回 false ，则后续流程不会进行。
   - `componentWillUpdate`(UNSAFE_)
   - `render`
   - `componentDidUpdate`
- 组件内部调用 this.setState() 修改状态 
    - `shouldComponentUpdate`
    - `componentWillUpdate`(UNSAFE_)
    - `render`
    - `componentDidUpdate`
- 组件内部调用 this.forceUpdate() 强制更新
    - `componentWillUpdate`(UNSAFE_)
    - `render`
    - `componentDidUpdate`
3. 卸载阶段
  - `componentWillUnmount` (关闭定时器、取消订阅消息)
新版
废弃 `componentWillMount` `componentWillReceiveProps` `componentWillUpdate`  UNSAFE_
新增两个钩子 `getDerivedStateFromProps`  `getSnapshotBeforeUpdate`

## 虚拟DOM Diff算法

## Hooks 基础
1. 一套能够使函数组件更强大，更灵活的“钩子”
2. 为函数组件提供状态

### useState
useState为函数组件提供状态（state）
```js
import { useState } from 'react'

function App() {
  // 参数：状态初始值比如,传入 0 表示该状态的初始值为 0
  // 返回值：数组,包含两个值：1 状态值（state） 2 修改该状态的函数（setState）
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => { setCount(count + 1) }}>{count}</button>
  )
}
export default App
```
### useEffect
对于 React 组件来说，主作用就是根据数据（state/props）渲染 UI，除此之外都是副作用（比如，手动修改 DOM，localstorage操作）
1. 使用
```js
import { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
 
  useEffect(()=>{
    // dom操作
    document.title = `当前已点击了${count}次`
  })
  return (
    <button onClick={() => { setCount(count + 1) }}>{count}</button>
  )
}

export default App
```
2. 依赖项控制执行时机
  - 不添加依赖项 组件首次渲染执行一次，以及不管是哪个状态更改引起组件更新时都会重新执行
  - 添加空数组  组件只在首次渲染时执行一次
  - 添加特定依赖项 副作用函数在首次渲染时执行，在依赖项发生变化时重新执行
  - 清理副作用 副作用函数中的末尾return一个新的函数

```js
useEffect(()=>{
  console.log('副作用执行了')
})
```

```js
useEffect(()=>{
	 console.log('副作用执行了')
},[])
```

```js
function App() {  
  const [count, setCount] = useState(0)  
  const [name, setName] = useState('zs') 
  
  useEffect(() => {    
      console.log('副作用执行了')  
  }, [count])  
  
  return (    
    <>      
      <button onClick={() => { setCount(count + 1) }}>{count}</button>      
      <button onClick={() => { setName('cp') }}>{name}</button>    
    </>  
  )
}
```
```js
import { useEffect, useState } from "react"

const App = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timerId = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    return () => {
      // 用来清理副作用的事情
      clearInterval(timerId)
    }
  }, [count])
  return (
    <div>
      {count}
    </div>
  )
}

export default App
```
## hooks 进阶  

### useState - 回调函数的参数
如果初始 state 需要通过计算才能获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用
```js
const [name, setName] = useState(()=>{   
  // 编写计算逻辑    return '计算之后的初始值'
})
```
```js
import { useState } from 'react'

function Counter(props) {
  const [count, setCount] = useState(() => {
    return props.count
  })
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

function App() {
  return (
    <>
      <Counter count={10} />
      <Counter count={20} />
    </>
  )
}

export default App
```

### useEffect - 发送网络请求
不可以直接在useEffect的回调函数外层直接包裹 await ，因为异步会导致清理函数无法立即返回

```js
// No
useEffect(async ()=>{    
  const res = await axios.get('...')   
  console.log(res)
},[])

------------------------------
// Yes
useEffect(()=>{   
  async function fetchData(){      
    const res = await axios.get('...')                            
    console.log(res)   
  } 
},[])
```

### useRef
在函数组件中获取真实的dom元素对象或者是组件对象

1. 获取dom
```js
import { useEffect, useRef } from 'react'
function App() {  
  const h1Ref = useRef(null)  
  useEffect(() => {    
      console.log(h1Ref)  
  },[])  
  return (    
    <div>      
        <h1 ref={ h1Ref }>this is h1</h1>    
    </div>  
  )
}
export default App
```

2. 获取组件实例
```js
// Foo.js
class Foo extends React.Component {  
  sayHi = () => {    
    console.log('say hi')  
  }  
  render(){    
    return <div>Foo</div>  
  }
}
    
export default Foo

// App.js
import { useEffect, useRef } from 'react'
import Foo from './Foo'
function App() {  
  const h1Foo = useRef(null)  
  useEffect(() => {    
    console.log(h1Foo)  
  }, [])  
  return (    
    <div> <Foo ref={ h1Foo } /></div>  
  )
}
export default App
```

### useContext

```js
import { createContext, useContext } from 'react'
// 创建Context对象
const Context = createContext()

function Foo() {  
  return <div>Foo <Bar/></div>
}

function Bar() {  
  // 底层组件通过useContext函数获取数据  
  const name = useContext(Context)  
  return <div>Bar {name}</div>
}

function App() {  
  return (    
    // 顶层组件通过Provider 提供数据    
    <Context.Provider value={'this is name'}>     
      <div><Foo/></div>    
    </Context.Provider>  
  )
}

export default App
```
### useReducer
### useCallback
- 缓存的结果是函数，主要用于缓存函数，应用场景如需要缓存的函数  
- 因为函数式组件每次任何一个state发生变化，会触发整个组件更新，一些函数是没有必要更新的，此时就应该缓存起来，提高性能，减少对资源的浪费  
- useCallback应该和React.memo配套使用，缺了一个都可能导致性能不升反而下降。
```js
import React, { useState, useCallback } from 'react';

function SubmitButton(props) {
  const { onButtonClick, children } = props;
  console.log(`${children} updated`);

  return (
    <button onClick={onButtonClick}>{children}</button>
  );
}
// 使用 React.memo 检查 props 变更，复用最近一次渲染结果
SubmitButton = React.memo(submitButton);

export default function CallbackForm() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleAdd1 = () => {
    setCount1(count1 + 1);
  }

  // 调用 useCallback 返回一个 memoized 回调，该回调在依赖项更新时才会更新
  const handleAdd2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);

  return (
    <>
      <div>
        <p>count1: {count1}</p>
        <SubmitButton onButtonClick={handleAdd1}>button1</SubmitButton>
      </div>
      <div>
        <p>count2: {count2}</p>
        <SubmitButton onButtonClick={handleAdd2}>button2</SubmitButton>
      </div>
    </>
  )
}
```
### useMemo
缓存的结果是回调函数中return回来的值，主要用于缓存计算结果的值，应用场景如需要计算的状态
```js
import React, { useState, useMemo } from 'react';

function counterText({ countInfo }) {
  console.log(`${countInfo.name} updated`);

  return (
    <p>{countInfo.name}: {countInfo.number}</p>
  );
}
// // 使用 React.memo 检查 props 变更，复用最近一次渲染结果
const CounterText = React.memo(counterText);

export default function Counter() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const countInfo1 = {
    name: 'count1',
    number: count1
  };
  // 使用 useMemo 缓存最近一次计算结果，会在依赖项改变时才重新计算
  const countInfo2 = useMemo(() => ({
    name: 'count2',
    number: count2
  }), [count2]);

  return (
    <>
      <div>
        <CounterText countInfo={countInfo1} />
        <button onClick={() => setCount1(count1 + 1)}>Add count1</button>
      </div>
      <div>
        <CounterText countInfo={countInfo2} />
        <button onClick={() => setCount2(count2 + 1)}>Add count2</button>
      </div>
    </>
  );
}
```