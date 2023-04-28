# React Router

## 5.x

### 基本使用
```jsx
// App.jsx
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="list-group">
          <Link className="list-group-item" to="/about">
            About
          </Link>
          <Link className="list-group-item" to="/home">
            Home
          </Link>
        </div>
        <div className="panel-body">
          <Route path="/about" component={About} />
          <Route path="/home" component={Home} />
        </div>
      </div>
    )
  }
}

```
```jsx
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import { HashRouter } from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // <HashRouter>
  //   <App />
  // </HashRouter>
  document.getElementById('root')
)

```

### NavLink   

`activeClassName` 指定高亮
```jsx
<NavLink activeClassName="active" to="/about">About</NavLink>
<NavLink activeClassName="active" to="/home">Home</NavLink>
```

### Switch
Switch 可以提高路由匹配效率，如果匹配成功，则不再继续匹配后面的路由，即单一匹配。
<!-- 只会展示 Home 组件 -->
<Switch>
  <Route path="/about" component="{About}" />
  <Route path="/home" component="{Home}" />
  <Route path="/home" component="{Test}" />
</Switch>

### 解决多级路径刷新页面样式丢失的问题
- public/index.html 中 引入样式时不写 `./` 写 `/` （常用）
- public/index.html 中 引入样式时不写 `./` 写 `%PUBLIC_URL%` （常用）
- 使用 HashRouter

```js
<link rel="stylesheet" href="/css/bootstrap.css" />
<link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css" />
```

### Redirect 

```js
<Switch>
  <Route path="/about" component="{About}" />
  <Route path="/home" component="{Home}" />
  <Redirect to="/about" />
</Switch>
```

### 嵌套路由
- 注册子路由需写上父路由的 path
- 路由的匹配是按照注册路由的顺序进行的

```jsx
<!-- 父组件 -->
<NavLink to="/about">About</NavLink>
<NavLink to="/home">Home</NavLink>

<Switch>
  <Route path="/about" component="{About}" />
  <Route path="/home" component="{Home}" />
  <Redirect to="/about" />
</Switch>
```

```jsx
<!-- 子组件 -->
<ul className="nav nav-tabs">
  <li>
    <NavLink to="/home/news">News</NavLink>
  </li>
  <li>
    <NavLink to="/home/message">Message</NavLink>
  </li>
</ul>

<Switch>
  <Route path="/home/news" component="{News}" />
  <Route path="/home/message" component="{Message}" />
  <Redirect to="/home/news" />
</Switch>
```

### 路由传参
params, search, state

- state 当前页面刷新可保留参数，但在新页面打开不能保留。前两种方式由于参数保存在 URL 地址上，因此都能保留参数。
- params seacrch 参数都会变成字符串

```jsx
<!-- 路由链接 -->
<Link to='/home/message/detail/N/21'>params</Link>
<Link to={`/home/message/detail/${item.name}/${item.age}`}>{item.name}</Link>

<Link to='/home/message/detail/?name=N&age=21'>search</Link>
<Link to={`/home/message/detail/?id=${item.name}&title=${item.age}`}>{item.name}</Link>

<Link to={{pathname: '/home/message/detail', state: {name: 'N', age: 21}}}>state</Link>

<!-- 注册路由 -->
<Route path='/home/message/detail/:name/:age' component={Detail} />
<!-- search 和 state 按正常注册即可 -->
<Route path='/home/message/detail' component={Detail} />
```

```jsx
//接收参数
const { name, age } = this.props.match.params

import qs from 'querystring'
const { search } = this.props.location
const { name, age } = qs.parse(search.slice(1))

const { name, age } = this.props.location.state
```

### 编程式导航
`this.props.history`

```jsx
this.props.history.push(path, state)
this.props.history.replace(path, state)
this.props.history.goForward()
this.props.history.goBack()
this.props.history.go(n)
```

```jsx
// 编程式导航传参
this.props.history.push(`/home/message/detail/${id}/${title}`)
this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)
this.props.history.push(`/home/message/detail`, { id: id, title: title })
```
### withRouter
加工一般组件，让其拥有路由组件的 API

```jsx
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Home extends Component {
  ...
}

export default withRouter(Home)
```

## 6.x

### 安装基本使用  

npm install react-router-dom

```jsx
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

```jsx
// App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// 准备俩个路由组件

const Home = () => <div>this is home</div>
const About = () => <div>this is about</div>

function App() {
  return (
    <div className="App">
      {/* 按照规则配置路由 */}
        {/* <Link to="/">首页</Link>
        <Link to="/about">关于</Link> */}
        <NavLink to="/">About</NavLink>
        <NavLink to="/about">Hello</NavLink>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
    </div>
  )
}

export default App
```

### <Routes/>
代替 `<Switch>`
配合`<Route>`， 必须要用 `<Routes>` 包裹 `<Route>`

### 重定向
```jsx
const Home = () => <div>this is home</div>
const About = () => <div>this is about</div>

function App() {
  return (
    <div className="App">
      {/* 按照规则配置路由 */}
        {/* <Link to="/">首页</Link>
        <Link to="/about">关于</Link> */}
        <NavLink to="/">About</NavLink>
        <NavLink to="/about">Hello</NavLink>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    </div>
  )
}

export default App

```

### useRoutes()
```jsx
// 路由表
// routes/index.js
import { Navigate } from 'react-router-dom'
import About from '../components/About/About'
import Hello from '../components/Hello/Hello'

const routes = [
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/hello',
    element: <Hello />,
  },
  {
    path: '/',
    element: <Navigate to="/about" />,
  },
]

export default routes
```
```jsx
// 引入路由表
// App.js
import { NavLink, useRoutes } from 'react-router-dom'
import routes from './routes'

export default function App() {
  // 生成路由规则
  const element = useRoutes(routes)

  return (
    <div>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/hello">Hello</NavLink>
      <hr />
      {element}
    </div>
  )
}
```
### Outlet
- 嵌套路由中，需要使用 `<Outlet>` 设置子路由的路由出口，即在何处渲染子路由。
- 设置二级路由链接时，可以是 to="news"、to="./news"，但不能是 to="/news"。
```jsx
// App.js
export default function App() {
  return (
    <div>
      <NavLink to="about">About</NavLink>
      <NavLink to="hello">Hello</NavLink>
      <hr />
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="hello" element={<Hello />}>
          <Route path="news" element={<News />} />
          <Route path="message" element={<Message />} />
        </Route>
        <Route path="/" element={<Navigate to="about" />} />
      </Routes>
    </div>
  )
}
```

```jsx
// 路由表
const routes = [
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/hello',
    element: <Hello />,
    // 定义二级路由，注意不要加 /
    children: [
      {
        path: 'news',
        element: <News />,
      },
      {
        path: 'message',
        element: <Message />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/about" />,
  },
]
------------------------------------
// Hello 子组件
import React, { Fragment } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Hello() {
  return (
    <Fragment>
      <h2>I am Hello!</h2>
      {/* 子路由链接 */}
      <NavLink to="news">News</NavLink>
      <NavLink to="message">Message</NavLink>
      <hr />
      {/* 子路由出口 */}
      <Outlet></Outlet>
    </Fragment>
  )
}
```

### 路由传参
1. params
```jsx
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="hello" element={<Hello />}>
          <Route path="message" element={<Message />}>
            <Route path="detail/:id/:name/:age" element={<Detail />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

<Link to={`detail/${item.id}/${item.name}/${item.age}`}>{item.name}</Link>
---------------------------------
import React from 'react'
import { useParams, useMatch } from 'react-router-dom'

export default function Detail() {
  // 解构赋值
  const { id, name, age } = useParams()
  return (
    <div>
      <li>id:{id}</li>
      <li>name:{name}</li>
      <li>age:{age}</li>
    </div>
  )
}
```
2. search
```jsx
<Route path="detail" element={<Detail />} />

<Link to={`detail?id=${item.id}&name=${item.name}&age=${item.age}`}>{item.name}</Link>

import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Detail() {
  // 数组的解构赋值
  const [searchParams, setSearchParams] = useSearchParams()
  // 需要调用 get() 方法获取对应的参数值
  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const age = searchParams.get('age')

  function change() {
    setSearchParams('id=666&name=Lily&age=888')
  }

  return (
    <div>
      <li>id:{id}</li>
      <li>name:{name}</li>
      <li>age:{age}</li>
      <button onClick={change}>Change search params</button>
    </div>
  )
}

```

3. state
```jsx
<Route path="detail" element={<Detail />} />

<Link to="detail" state={{ id: item.id, name: item.name, age: item.age }}>
  {item.name}
</Link>

import { useLocation } from 'react-router-dom'

export default function Detail() {
  // 连续解构赋值
  const {
    state: { id, name, age },
  } = useLocation()

  return (
    <div>
      <li>id:{id}</li>
      <li>name:{name}</li>
      <li>age:{age}</li>
    </div>
  )
}
```

### 编程式路由导航 / `useNavigate()`
```jsx
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Message() {
  const [list] = useState([
    { id: 1, name: 'Bruce', age: 33 },
    { id: 2, name: 'You', age: 3 },
    { id: 3, name: 'React', age: 333 },
  ])

  const navigate = useNavigate()

  function showDetail(item) {
    navigate('detail', {
      replace: true,
      state: {
        id: item.id,
        name: item.name,
        age: item.age,
      },
    })
  }

  function back() {
    navigate(1)
  }

  function forward() {
    navigate(-1)
  }

  return (
    <div>
      <ul>
        {list.map((item) => {
          return (
            <li key={item.id}>
              <button onClick={() => showDetail(item)}>查看详情</button>
              <button onClick={back}>后退</button>
              <button onClick={forward}>前进</button>
            </li>
          )
        })}
      </ul>
      <Outlet></Outlet>
    </div>
  )
}
```

## 总结
1. `<Switch>`重命名为`<Routes>`
2. Route 的 render 和 component 改为 element
3. 嵌套路由变得更简单
4. to、navigate、path 不以 / 开头，都是相对路径
5. 用 Navigate 代替 Redirect
6. 用useNavigate代替useHistory
7. 大小减少：从20kb到8kb
