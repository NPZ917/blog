# React Redux
## React Redux
- react-redux是一个react插件库,专门用来简化react应用中使用redux。
- React-Redux 将所有组件分成两大类：UI组件 和 容器组件
- 容器组件由 React-Redux 自动生成(connect()函数)

UI 组件
- 只负责 UI 呈现，不带有业务逻辑
- 无内部状态，通过 props 接收数据
- 不使用任何 Redux 的 API 容器组件

容器组件
- 负责管理数据和业务逻辑，和 Redux 通信，将结果交给 UI 组件
- 带有内部状态
- 使用 Redux 的 API

`provider` `connect` `mapStateToprops` `mapDispatchToProps`

1. Provider 包裹根组件
```js
import { Provider } from 'react-redux'
<Provider store={store}>
  <App />
</Provider>
```
2. connect()()
- mapStateToProps state映射到 UI 组件的参数（props）
- mapDispatchToProps UI 组件的操作映射成 Action,
```js
// containers/Count/index.jsx
// Count 容器组件

import CountUI from '../../components/Count'
import { connect } from 'react-redux'

import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/count_action'

function mapStateToProps(state) {
  return {
    count: state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add: (number) => dispatch(createIncrementAction(number)),
    sub: (number) => dispatch(createDecrementAction(number)),
    addAsync: (number) => dispatch(createIncrementAsyncAction(number, time)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountUI)
-----------------------------
// 函数写法
export default connect(
  state => ({count:state}),
  dispatch => ({
    add: number => dispatch(createIncrementAction(number)),
    sub: number => dispatch(createDecrementAction(number)),
    addAsync: (number,time) => dispatch(createIncrementAsyncAction(number,time)),
  })
)(CountUI)

// 对象写法
export default connect(
  state => ({ count: state }),
  {
    add: createIncrementAction,
    sub: createDecrementAction,
    addAsync: createIncrementAsyncAction,
  }
)(CountUI)

```
```js
// components/Count/index.jsx
// Count UI 组件
increment = () => {
  const { value } = this.selectNumber
  this.props.add(value * 1)
}

decrement = () => {
  const { value } = this.selectNumber
  this.props.sub(value * 1)
}

incrementAsync = () => {
  const { value } = this.selectNumber
  this.props.addAsync(value * 1, 500)
}

```

```js
import React, { Component } from 'react'
import {
	createIncrementAction,
	createDecrementAction,
} from '../../redux/count_action'
import {connect} from 'react-redux'

// 定义 UI 组件
class Count extends Component {
  ...
}

// 创建容器组件
export default connect(
  state => ({count: state}),
  {
    add: createIncrementAction,
    sub: createDecrementAction
  }
)(Count)
```

### 多个组件数据共享

```js
// redux/actions/person.js
import { ADD_PERSON } from '../constant.js'

export const createAddPersonAction = (personObj) => ({ type: ADD_PERSON, data: personObj })
```

```js
// redux/reducers/person.js

import { ADD_PERSON } from '../constant.js'

const initState = [{ id: '1', name: 'N', age: '18' }]
export default function personReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case ADD_PERSON:
      return [data, ...preState]
    default:
      return preState
  }
}
```
```js
// redux/store.js

import { createStore, applyMiddleware, combineReducers } from 'redux'
import countReducer from './reducers/count'
import personReducer from './reducers/person'
import thunk from 'redux-thunk'

const Reducers = combineReducers({
  total: countReducer,
  personList: personReducer,
})

export default createStore(Reducers, applyMiddleware(thunk))
```

```js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAddPersonAction } from '../../redux/actions/person'
import { nanoid } from 'nanoid'

class Person extends Component {
  addPerson = () => {
    const name = this.nameInput.value
    const age = this.ageInput.value
    const personObj = { id: nanoid(), name, age }
    this.props.addPerson(personObj)
    this.nameInput.value = ''
    this.ageInput.value = ''
  }

  render() {
    return (
      <div>
        <h2>在Person组件拿到Count组件的数据：{this.props.count}</h2>
        <input type="text" ref={(c) => (this.nameInput = c)} placeholder="Please input name" />
        <input type="text" ref={(c) => (this.ageInput = c)} placeholder="Please input age" />
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {this.props.personList.map((item) => {
            return (
              <li key={item.id}>
                {item.name} -- {item.age}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default connect(
  // state 是 Redux 保存的状态对象
  // 容器组件从 Redux 中取出需要的状态，并传递给 UI 组件
  state => ({personList: state.personList, count: state.total}),
  {
    addPerson: createAddPersonAction
  }
)(Person)

```


## other
yarn create vite react-redux --template react  
yarn add  @reduxjs/toolkit react-redux

1. 创建子模块
```js
// store/modules/counterStore.js
import { createSlice } from '@reduxjs/toolkit'

const counter = createSlice({
  // 模块名称独一无二
  name: 'counter',
  // 初始数据
  initialState: {
    count: 1
  },
  // 修改数据的同步方法
  reducers: {
    add (state) {
      state.count++
    }
  }
})

const { add } = counter.actions
const counterReducer = counter.reducer

// 导出修改数据的函数
export { add }
// 导出reducer
export default counterReducer
```
2. 组合子模块
```js
import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counterStore'

export default configureStore({
  reducer: {
    // 注册子模块
    counter: counterReducer
  }
})
```
3. 为React提供Redux store
```js
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// 导入store
import store from './store'
// 导入store提供组件Provider
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  // 提供store数据
  <Provider store={store}>
    <App />
  </Provider>
)
```
4. 组件使用store中的数据
```js
// App
import { useSelector } from 'react-redux'

function App () {
  // 使用数据
  const { count } = useSelector(state => state.counter)
  
  return (
    <div className="App">
      {count}
      <button onClick={clickHandler}>+</button>
    </div>
  )
}

export default App
```
5. 组件修改store中的数据
```js
// 修改数据
1. 使用counterStore模块中导出的add方法创建action对象
2 .通过dispatch函数以action作为参数传入完成数据更新
import { useSelector, useDispatch } from 'react-redux'
import { add } from './store/counterStore'

function App () {
  // 使用数据
  const { count } = useSelector(state => state.counter)
  // 修改数据
  const dispatch = useDispatch()
  const clickHandler = () => {
    // 1. 生成action对象
    const action = add()
    // 2. 提交action进行数据更新
    dispatch(action)
  }
  return (
    <div className="App">
      {count}
      <button onClick={clickHandler}>+</button>
    </div>
  )
}

export default App
```

6. 组件修改数据并传参  
   
修改数据的方法中补充第二个参数action
```js
import { createSlice } from "@reduxjs/toolkit"
const counterStore = createSlice({
  name: 'counter', // 独一无二不重复的名字语义化
  // 定义初始化的数据
  initialState: {
    taskList: ['react']
  },
  reducers: {
    // action为一个对象 对象中有一个固定的属性叫做payload 为传递过来的参数
    addTaskList (state, action) {
      state.taskList.push(action.payload)
    }
  }
})

// 生成修改数据的方法导出
const { addTaskList } = counterStore.actions
export { addTaskList }
// 生成reducer 导出 供index.js做组合模块
const counterReducer = counterStore.reducer

export default counterReducer
```
dispatch的时候传入实参
```js
<button onClick={() => dispatch(addTaskList('vue'))}>addList</button>
```

1. Redux异步处理
```js
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const channelStore = createSlice({
  name: 'channel',
  initialState: {
    channelList: []
  },
  reducers: {
    setChannelList (state, action) {
      state.channelList = action.payload
    }
  }
})


// 创建异步
const { setChannelList } = channelStore.actions
const url = '...'
// 封装一个函数 在函数中return一个新函数 在新函数中封装异步
// 得到数据之后通过dispatch函数 触发修改
const fetchChannelList = () => {
  return async (dispatch) => {
    const res = await axios.get(url)
    console.error(res);
  }
}

export { fetchChannelList }

const channelReducer = channelStore.reducer
export default channelReducer
```