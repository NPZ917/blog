# Vuex
## 3.x
### 安装
npm i vuex --save
### 使用
```js
import Vue from 'vue'
// 引入vuex模块
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
   user: 'admin',
    count: "100"
  },
  mutations: {
    increment(state, payload) {
      state.count += payload
    },
    decrement(state) {
      state.count -= 10
    }
  },
  getters: {},
  actions: {},
  modules: {}
})
```
```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```
### State
`state` 提供唯一的公共数据源，所有的共享的数据都要放到 `Store` 中进行存储  

组件访问`state`中数据的两种方式
- `template`  中  `$store.state.user`,`script` 中 `this.$store.state.user`
- mapState 映射为计算属性
```js
<template>
  <div class="home">
  {{ $store.state.user }}
  {{ count }}
  {{ xCount }}
  </div>
</template>

//1.导入辅助函数mapState
import { mapState } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    // mapState 可以接收数组或对象形式的参数 映射为计算属性，下面分别示例
    //2.1 传入数组
    ...mapState(['count']),

    //2.2 对象形式 可以自定义名称
    ...mapState({
      xCount:state => state.count
    })
  }
}
```
### Getter
Store中的数据进行加工处理形成新的数据。  
不会修改 Store 中的原数据，它只起到一个包装器的作用，将Store中的数据加工后输出出来。  

组件访问`getters`中数据的两种方式
- this.$store.getters()
- mapGetters 映射为计算属性

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    showNum(state){
      return '当前最新的数量是' + state.count	
    }
  }
})

<h3>{{$store.getters.showNum}}</h3>
<h3>{{showNum}}</h3>

import { mapGetters } from 'vuex'
computed: {
	...mapGetters (['showNum'])
}
```
### Mutation
Mutations用于变更 Store中的数据
- 只有 mutations 里的函数，才有权利修改 state 的数据
- mutations 里不能包含异步操作  
  
使用  
- this.$store.commit() 触发 mutations
- mapMutations 映射为方法
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count ++
    }
  }
})	

import { mapMutations } from 'vuex'
methods: {
  ...mapMutations(['add']),
  increment() {
    this.add(5)
  },
  increment1() {
    // this.$store.commit('add')
    this.$store.commit('add', 5)
  },
}
```

### Action
用于处理异步任务。
在Actions 中不能直接修改 state 中的数据，要通过 提交 mutation 修改。  

使用
- this.$store.dispatch() 触发 actions
- mapActions 映射为方法
  
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count ++
    },
    add1(state) {
      state.count ++
    }
  },
  actions: {
    addCount(context) {
      context.commit('add')
    },

    addCount1({commit}, payload) {
      commit('add1', payload)
    }
  }
})

// 1
methods: {
  increment() {
    this.$store.dispath('addCount')
  }
}

// 2
import { mapActions } from 'vuex'
methods: {
  ...mapActions (['addCount', 'addCount1']),
  increment() {
    this.addCount()		// 不传值
    this.addCount1(5)   // 传值
  },
}
```
### module

```js
const countStore = {
  state: {
    num: 0
  },
  getters: {
    bigSum(state) { return state.num * 2 }
  },
  mutations: {ADD() {}},
  actions: {add(){}}
}
const personStore = {
  namespaced: true,   // // 开启命名空间
  state: { persons: [] },
  getters: {siftPerson() {}},
  mutations: {DELPERSON(){}},
  actions: {delPeron}
}

export default new Vuex.Store({
  modules: {
    countStore,
    personStore
  }
})
```

state
```js
this.$store.state.countStore.num
...mapState(['num']),

this.$store.state.personStore.persons
...mapState('personStore',['persons']),
```
getter
```js
this.$store.getters.bigSum
...mapGetters(['bigSum']),

this.$store.getters['personStore/persons']
...mapGetters('personStore',['persons']),
```
mutation
```js
this.$store.commit('ADD', ...)
...mapMutations('ADD')

this.$store.commit('personStore/ADD', ...)
...mapMutations('personStore', ['ADD'])
```

action
```js
this.$store.dispatch('add', ...)
...mapActions('add')

this.$store.dispatch('personStore/delPeron', ...)
...mapActions('personStore', ['delPeron'])
```

### setup()
```js
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  setup() {
    const store = useStore()

    const count = computed(() => store.state.countStore.count)
    const double = computed(() => store.getters.double)
    const doubleList = computed(() => store.getters.doubleList)

    const changeCountm = () => {
      store.commit('INCREMENT')
    }
    const changeCounta = () => {
      store.dispatch('increment')
    }
    const changeList = () => {
      store.commit('CHANGElIST')
    }

    return {
      count,
      double,
      doubleList,
      changeCountm,
      changeCounta,
      changeList,
    }
  }
}
```

## 4.x
  过渡
## 5.x
  理念大致和Pinia相同 => [Pinia](https://pinia.vuejs.org/zh/)