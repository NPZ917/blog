# 2.x

## 模板语法 指令

```javascript
<div>文本插值 {{ text }}</div>
<div v-text="text"></div>
<div v-html="html"></div>
<div v-once>内容不会改变 {{msg}}</div>
<input v-modle="value" />
<div v-if='isShow'></div>
<div v-else-if='isShow'></div>
<div v-else='isShow'></div>
<div v-else='isShow'></div>
<div v-for='(item, id) in list' key='id'></div>
<div v-bind:attribute ='isShow'></div>
<div :attribute="varOrExp"></div>
<div @event="varOrExp"></div>
<div :[attribute]="varOrExp"></div>
<div @:[event]="varOrExp"></div>
```

## 样式语法 class style

```javascript
<div :class="{ active: isActive }"></div>

data: { isActive: true }

------------------------------------------------------------------

<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }">
</div>

data: {
  isActive: true,
  hasError: false
}

-------------------------------------------------------------------

<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
<div v-bind:class="[{ active: isActive }, errorClass]"></div>

-------------------------------------------------------------------

<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

## 组件

### 注册组件

```javascript
Vue.component('ComponentGlobal', {
  components: { ComponentLocal },
  template: '<div><component-local /><span>hello!</span></div>',
})
```

### 生命周期钩子

![image.png](https://cdn.nlark.com/yuque/0/2023/png/35810819/1682357315578-13a34a71-dea2-4ecf-b9fa-bc38c7806f8a.png#averageHue=%23292723&clientId=ub6170508-66b8-4&from=paste&height=713&id=uf18fde9f&name=image.png&originHeight=989&originWidth=1169&originalType=binary&ratio=1&rotation=0&showTitle=false&size=252718&status=done&style=none&taskId=u15a878bb-af9f-49bb-b006-dc64307335f&title=&width=843)

## methods

### 修饰符

#### 表单修饰符

v-model.lazy 光标离开触发
v-model.trim 过滤掉输入内容的前后空格
v-model.number 会将输入的值转换为数值类型

#### 事件修饰符

stop 阻止了事件冒泡
prevent 阻止了事件默认行为
self 只有在 event.target 是当前元素自身时触发
once 绑定的事件只能触发一次
capture 让事件触发从包含这个元素的顶层开发往下依次触发
passive v-on:scroll.passive="onScroll" 相当于给 onscroll 事件增加了.lazy 修饰符
native 让组件变成像 html 内置标签那样监听根元素的原生事件，否则组件上使用 v-on 只会监听自定义事件

#### 鼠标按键修饰符

@click.left @click.right @click.middle

#### 键盘修饰符 @keyup.enter="onEnter"

普通按键（enter、delete、space、tab、esc…）
系统修饰键（ctrl、shift、alt…）
也可以直接用按键的代码来做修饰符（如：enter 为 13）

#### v-bind 修饰符

## watch 和 computed

```javascript
 watch: {
    a: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {},
    },
  },
  // 计算属性：基于侦听器
  computed: {
    // 侦听firstName和lastName，会将结果缓存
    fullName: {
      get() {
        return this.firstName + this.lastName;
      },
      set(val) {
        // ...
      },
    },
  },
```

## directives

```javascript
;<div v-focus></div>

// 全局
Vue.directive('focus', {
  // 参数有el、binding、vnode、oldVnode
  bind() {},
  inserted() {},
  update() {},
  componentUpdated() {},
  unbind() {},
})

// 局部
const options = {
  directives: {
    focus: {
      // ...
    },
  },
}
```

## mixins

混入规则为，同名钩子函数合并为数组，依次调用，其余属性直接被替代：

```javascript
const mixinOptions = {
  // ...
}

// 全局混入
Vue.mixin(mixinOptions)

// 局部混入
Vue.component('component-be-mixin', {
  minxins: [mixinOptions],
  // ...
})
```

## slot

## 动态组件和异步组件

## 过渡和动画

## keep-alive

## data 为何函数

## $nextTick

## Vue.set / $set

## Vue.extend

## 组件通信

## 响应式原理

## vue 模版编译

## 虚拟 dom 及其 优缺点

## diff 算法

## vue 有了数据响应式，为何还要 diff ？？

##

# 3.x

## 生命周期

![image.png](https://cdn.nlark.com/yuque/0/2023/png/35810819/1682360760010-5e2e06d2-708f-4419-be30-93733d5be58b.png#averageHue=%233d3c37&clientId=ub6170508-66b8-4&from=paste&height=625&id=ueb528e15&name=image.png&originHeight=987&originWidth=546&originalType=binary&ratio=1&rotation=0&showTitle=false&size=42431&status=done&style=none&taskId=u05a471da-55b4-492e-af36-ce045d8e389&title=&width=346)

## setup

## ref，toRef, reactive，toRefs 的区别及使用方法

## watch 和 watahEffect

## computed

## props 和 emit

## 自定义 hook 函数

vue3 的 hook 函数相当于 vue2 的 mixin，不同是 hook 是函数

## provide 和 inject

## Fragment

## Teleport

## Suspense

## 响应式原理

# 2.x 和 3.x 对比
