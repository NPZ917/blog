# Vue Router

## 3.x
### 安装
npm i vue-router
```js
// router/index.js 
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About },
]

const router = new VueRouter({
  routes,
})

export default router
```
```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
```

```js
<template>
  <div class="app-container">
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-link to="/movie">电影</router-link>

    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>
```
- 每个组件都有 `$route` 属性，存储着组件的路由规则信息
- `$router` 是路由器对象，整个 SPA 只有一个

### 声明式导航
- `to`  用于指定跳转路由
- `tag` 最终被渲染为何种标签 默认是 a 标签
- `replace`  替换当前历史
- `active-class` 指明路由被激活时添加的类名 默认为 router-link-active

```js
<router-link to="/home" tag="li" replace active-class="active"></router-link>
```
路由高亮
```js
// 1
const router = new VueRouter({
  // 默认的 router-link-active 会被覆盖
  linkActiveClass: 'active-h',
  routes,
})

// 2
<!-- router-link-active 会被覆盖为 active -->
<router-link active-class="active" to="/about">About</router-link>
```
### 路由重定向
```js
const routes = [
  // 访问 / 跳转到 /home
  { path: '/', redirect: '/home' },
  { path: '/home', component: 'Home' },
]
```
### 嵌套路由
```js
// About.vue
<template>
  <div class="about-container">
    <router-link to="/about/a">a</router-link>
    <router-link to="/about/b">b</router-link>

    <router-view></router-view>
  </div>
</template>
```
```js
const routes = [
  {
    path: '/about',
    component: 'About',
    children: [
      // 注意不要写成 /tab1
      { path: 'a', component: A },
      { path: 'b', component: B },
    ],
  },
]
```
### 编程式导航
- `this.$router.push()` 跳转到指定页面，并增加一条历史记录
- `this.$router.replace()` 跳转页面，而是替换当前的历史记录
- `this.$router.go()` 前进或后退
- `this.$router.forward()` 前进一步
- `this.$router.back()` 后退一步

### 命名路由
```js
const routes = [
  {
    name: 'about',
    path: '/about',
    component: About,
  },
]
```
```js
<router-link :to="{ name: 'about'} "></router-link>
<router-link :to="{ name: 'about', query: { id: 0, title: 'a' }}"></router-link>
```
### 路由传参  
:::tip
  1. `query`: name 和 path 都可搭配使用  ?a=a&b=b
  2. `params`  
  - 只能搭配 `name` 使用
  - 路由需配置 `/user/:id`,否则页面刷新失去参数
  - `/user/1` 导航到` /user/2`，原来的组件会复用，需watch $route, 或者 beforeRouteUpdate(to, from, next)
:::
#### query
```js
<router-link :to="`/home/detail?id=${id}&title=${title}`">字符串</router-link>
<router-link
  :to="{
    path: '/home/detail',
    query: {
      id: 1,
      title: 'a',
    }
  }">
  对象
</router-link>

// 接收参数
this.$route.query.id
this.$route.query.title
```
#### parmas / 动态路由
```js
<router-link :to="/person/1/21">字符串</router-link>
<router-link
  :to="{
  name: 'peron',
  params: {
    id: 1,
    age: 21
  }
}">
  对象
</router-link>
```
### 路由元信息/meta
```js
const routes = [
  {
    name: 'about',
    path: '/about',
    component: About,
    meta: { title: 'a', isAuth: true },
  },
]
```
### 路由守卫
1. 权限控制
2. 全局守卫、独享守卫、组件内守卫

全局守卫
- beforeEach(to, from, next)
- afterEach(to, from)

- to: 将要访问的路由对象，即$route  
- from: 将要离开的路由对象
- next: 一定要调用该方法来 resolve 这个钩子。执行结果依赖 next 方法的调用参数
  - next() 进入下一个钩子
  - next('/') 跳转路由 
  - next(false) 中断跳转
```js
router.beforeEach((to, from, next) => {
  if(to.path === '/main') {
    const token = localStorage.getItem('token')

    if(token) {
      next()
    } else {
      next('/login')
    }
  } else {
      next()
  }
})

router.afterEach((to,from) => {
  if(to.meta.title) {
    // 修改网页标题
    document.title = to.meta.title
  } else {
    document.title = 'N'
  }
})

```
独享守卫
```js
{
  path: 'about',
  component: About,
  beforeEnter(to, from ,next) {
    ...
  }
}

```
组件内守卫
```js
export default {
  name: 'About',

  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },

  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },

  beforeRouteLeave (to, from, next) {
     // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}

```
### 滚动行为
这个功能只在支持 history.pushState 的浏览器中可用。
```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }

    return {
      selector: to.hash,   // 滚动锚点
      behavior: 'smooth',  // 平滑滚动
    }
  }
})
```
### 路由懒加载
```js
const Foo = () => import('./Foo.vue')

const router = new VueRouter({
  routes: [{ path: '/foo', component: Foo }]
})
```
```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```
### 路由模式
- hash 默认
- history  需后端配置  找不到资源时返回同一个index.html
```js
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
```
### addRoutes已废弃，使用addRoute

## 4.x

### 安装
npm install vue-router@4
```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/home', component: Home }],
})

export default router
```
```js
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
```

### 大致对比  

#### 创建
```js
import { useRouter } fom vue-router

export default {
  setup() {
    const router = useRouter()
    router.push()
    router.replace()
  }
}
```

```js
import {useRoute} fom vue-router

export default {
  setup() {
    const route = useRoute()
    const {id} = route.query
    const {id} = route.params
  }
}
```
#### 组件内守卫
```js
// vue2中都必须显示调用next方法
beforeRouteEnter(to, from, next) {
  console.log("beforeRouteEnter");
  next();
},

beforeRouteUpdate(to, from, next) {
  console.log("beforeRouteUpdate");
  next();
},

beforeRouteLeave(to, from, next) {
  console.log("beforeRouteLeave");
  next();
},

---------------------------------------
// beforeRouteEnter 移除了
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

export default {
  setup() {
    onBeforeRouteLeave((to, from, next) => {})
    onBeforeRouteUpdate((to, from, next) => {})
  }
}
```
#### keep-alive
```js
<keep-alive>
  <router-view></router-view>
</keep-alive>
-------------------------------
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

#### 滚动行为
```js
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    // return { x: 0, y: 0 }
    // return { selector: to.hash }
  }
}
----------------------------------------------
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    // return { top: 0, left: 0 }
    // return { el: to.hash }
  }
}
```