# Redux

## Redux
### 工作流程

1. 当组件需要改变store内的数据时，发送一个action给store，
2. store收到action后调用相应的reducers函数，
3. reducers函数会返回一个新的对象来作为新的数据值回传给store，之后组件再从store里面获取更新后的数据了。
   
- store：store是保存数据state的地方，整个应用中只能有一个store 
- action：action 就是 js 普通对象。并且action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作(规定action对象里面必须有type字段，否则代码将报错)
- reducers: actions发送给store，根据action中的type来改变相应的store内的state，  
  就是通过reducers来改变的，reducers是一个纯函数，并且记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新state，而是有reducers根据action对象内的信息来改变store内的数据

- 定义action，reducers,store
- 在组件中引入store，通过store.subscribe() 自动监听store内的变化
- 组价中需要改变store是，用store.dispatch(action),执行后reducers会自动执行相应的逻辑修改store
- 组件中获取store，用store.getState()
### 简单使用
```js
// redux/constant.js

// 保存常量值
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```

```js
// redux/count_action.js

import { INCREMENT, DECREMENT } from './constant'

export const createIncrementAction = (data) => ({ type: INCREMENT, data })
export const createDecrementAction = (data) => ({ type: DECREMENT, data })

```

```js
//reducers.js 定义一个纯函数，用于处理store内的state
import { INCREMENT, DECREMENT } from './constant'

const initState = 0
const reducer = (state = initState, action) => {
  const { type, data } = action
  switch(type){
    case INCREMENT:
      return state + data;
    case DECREMENT:
      return state - data;
    default:
      return state
  }
export default reducer;
```

```js
//store.js 
import { createStore } from "redux";
import reducer from "./reducer.js";    

const store = createStore(reducer)
export default store;
```

```js
//Home.jsx
import React, { Component } from 'react';  
import store from './store';
import { createIncrementAction, createDecrementAction } from '../../redux/count_action'
export default class Home extends Component {
  componentDidMount(){
    //redux需要调用store.subscribe监听store的变化，store.getState用来获取store内的state，
    //store.subscribe调用返回的值unsubscribe在页面卸载的时候调用，目的是取消页面对store的监听，防止内存泄漏
    let unsubscribe = store.subscribe(() =>
      console.log(store.getState())
    );
    //unsubscribe();
  }
  increment = () => {
    const { value } = this.selectNumber
    // 将 value 转为数值
    // 手动 Action 对象
    store.dispatch({ type: 'increment', data: value * 1 })
    // 专门创建 Action 对象
    store.dispatch(createIncrementAction(value * 1))
  }

  decrement = () => {
    const { value } = this.selectNumber
    store.dispatch(createDecrementAction(value * 1))
  }

  incrementAsync = () => {
    const { value } = this.selectNumber
    setTimeout(() => {
      store.dispatch(createIncrementAction(value * 1))
    }, 500)
  }

  render() {
    return (
      <div>
        <h1>当前求和为：{store.getState()}</h1>
        <select ref={(c) => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementAsync}>异步加</button>
      </div>
    )
  }
}
```