## vite 自动导入

pnpm install element-plus  
pnpm install -D unplugin-vue-components unplugin-auto-import

pnpm install @element-plus/icons-vue  
pnpm install -D unplugin-icons

```js
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

plugins: [
  AutoImport({
    // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
    // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
    resolvers: [
      // Auto import icon components
      // 自动导入图标组件
      IconsResolver({
        prefix: 'Icon'
      }),
      ElementPlusResolver()
    ]
  }),
  Components({
    resolvers: [
      // Auto register icon components
      // 自动注册图标组件
      IconsResolver({
        enabledCollections: ['ep']
      }),
      // Auto register Element Plus components
      // 自动导入 Element Plus 组件
      ElementPlusResolver()
    ]
  }),
  Icons({
    autoInstall: true
  })
],
```

组件使用时需使用 `<IEpSearch />` 或者`<i-ep-search />`
