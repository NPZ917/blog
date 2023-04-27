# Pinia
`/piːnjʌ/`   [Pinia](https://pinia.vuejs.org/zh)

Pinia 起源于一次探索 Vuex 下一个迭代的实验，因此结合了 Vuex 5 核心团队讨论中的许多想法 Pinia 已经实现了 Vuex 5 中想要的大部分功能，

与 Vuex 相比，Pinia 不仅提供了一个更简单的 API，也提供了符合组合式 API 风格的 API，最重要的是，搭配 TypeScript 一起使用时有非常可靠的类型推断支持。
- 废弃mutation
- 不再有可命名的模块
- 不再有嵌套结构的模块
- (⊙﹏⊙)
[对比vuex](https://pinia.vuejs.org/zh/introduction.html#comparison-with-vuex)

## 安装
npm install pinia
```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```
## 基本使用
```js
// store/index.js
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 选项式
export const useCountStore = defineStore('count', {
  state: () => {
    return {
      count: 0,
    }
  },

  getters: {
    double: (state) => state.count * 2,
  },

  actions: {
    increment() {
      this.count++
    },
  },
})

export const useCounterStore = defineStore('counter', () => {
  const counter = ref(0)
  const doubleCounter = computed(() => {
    return counter.value * 2
  })
  function increment() {
    counter.value++
  }

  return {
    counter,
    doubleCounter,
    increment,
  }
})
```
```js
<template>
  <div>
    <div>-------------选项式-pinia-------------------</div>
    <h1>countStore: {{ countStore.count }}</h1>
    <h1>storeToRefs: {{ count }}</h1>
    <h2>getter:{{ countStore.double }}</h2>
    <h2>storeToRefs:{{ double }}</h2>
    <button @click="changeCount">修改值</button>
  </div>

  <div>
    <div>--------------setup-pinia------------------</div>
    <h1>counterStore: {{ counterStore.counter }}</h1>
    <h1>storeToRefs: {{ counter }}</h1>
    <h2>getter:{{ counterStore.doubleCounter }}</h2>
    <h2>storeToRefs:{{ doubleCounter }}</h2>
    <button @click="changeCounter">修改值</button>
  </div>
</template>

<script setup>
import { useCountStore, useCounterStore } from './stores'
import { storeToRefs } from 'pinia'    // storeToRefs  解构响应式

const countStore = useCountStore()
const counterStore = useCounterStore()

const { count, double } = storeToRefs(countStore)
const { counter, doubleCounter } = storeToRefs(counterStore)

// $patch 直接修改
const changeCount = () => {
  // countStore.$patch({
  //   count: 1,
  // })
  countStore.increment()
}

const changeCounter = () => {
  // counterStore.$patch((state) => {
  //   state.counter++
  // })
  counterStore.increment()
}
</script>
```


## 定义store
## State
## Getter
## Action