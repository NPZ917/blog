import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Blog',
  description: 'Blog',
  base: '/blog/', // base url
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
      // { text: 'Examples', link: '/markdown-examples' },
      // { text: 'Examples', link: '/markdown-examples' },
      // { text: 'Examples', link: '/markdown-examples' },
      {
        text: 'vue',
        items: [
          // 可以配置成下拉
          { text: 'core', link: '/vue/core' },
          { text: 'vuex', link: '/vue/vuex' },
        ],
      },
    ],

    sidebar: [
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' },
      //   ],
      // },
      {
        text: 'Vue',
        items: [
          { text: 'Vue', link: '/vue/core' },
          { text: 'Vuex', link: '/vue/vuex' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com' }],
  },
})
