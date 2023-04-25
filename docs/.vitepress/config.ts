import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'N',
  description: 'Blog',
  base: '/blog/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '前端',
        items: [
          { text: 'HTML/CSS', link: '/fe/html-css/html' },
          { text: 'JavaScript', link: '/fe/js/core' },
          { text: 'Vue', link: '/fe/vue/core' },
          { text: 'React', link: '/fe/react/core' },
          { text: '构建工具', link: '/fe/build/webpack' },
          { text: '跨端', link: '/fe/multiterminal/uniapp' },
          { text: 'WX', link: '/fe/wx/wx' },
          { text: 'Node', link: '/fe/node/node' },
          { text: '可视化', link: '/fe/visualization/visualization' },
        ],
      },
      {
        text: '软工理论',
        items: [{ text: '计算机网络', link: '/sem/network' }],
      },
      { text: '日常笔记', link: '/daily-notes/index' },
      { text: 'Bug汇总', link: '/bug/index' },
    ],
    sidebar: {
      '/fe/': [
        {
          text: 'HTML/CSS',
          collapsed: true,
          items: [
            { text: 'HTML', link: '/fe/html-css/html' },
            { text: 'CSS', link: '/fe/html-css/css' },
            { text: 'SASS', link: '/fe/html-css/sass' },
            { text: 'LESS', link: '/fe/html-css/less' },
          ],
        },
        {
          text: 'JavaScript',
          collapsed: true,
          items: [
            { text: 'Core', link: '/fe/js/core' },
            { text: 'BOM', link: '/fe/js/bom' },
            { text: 'DOM', link: '/fe/js/dom' },
            { text: 'ES2015 -- 今', link: '/fe/js/es6' },
            { text: 'TypeScript', link: '/fe/js/ts' },
          ],
        },
        {
          text: 'Vue',
          collapsed: true,
          items: [
            { text: 'Core', link: '/fe/vue/core' },
            { text: 'Vue Router', link: '/fe/vue/vue-router' },
            { text: 'Vuex', link: '/fe/vue/vuex' },
            { text: 'Pinia', link: '/fe/vue/Pinia' },
          ],
        },
        {
          text: 'React',
          collapsed: false,
          items: [
            { text: 'Core', link: '/fe/react/core' },
            { text: 'Rect Router', link: '/fe/react/react-router' },
            { text: 'Redux', link: '/fe/react/redux' },
            { text: 'Recat Redux', link: '/fe/react/react-redux' },
          ],
        },
        {
          text: '构建工具',
          collapsed: false,
          items: [
            { text: 'webpack', link: '/fe/build/webpack' },
            { text: 'Vite', link: '/fe/build/vite' },
            { text: 'Gulp', link: '/fe/build/gulp' },
            { text: 'rollup', link: '/fe/build/rollup' },
            { text: 'esbuild', link: '/fe/build/esbuild' },
          ],
        },
        {
          text: '跨端',
          collapsed: false,
          items: [
            { text: 'uniapp', link: '/fe/multiterminal/uniapp' },
            { text: 'Taro', link: '/fe/multiterminal/taro' },
            { text: 'React Native', link: '/fe/multiterminal/rn' },
            { text: 'Flutter', link: '/fe/multiterminal/flutter' },
          ],
        },
        { text: '微信小程序', link: '/fe/wx/wx' },
        { text: 'Node', link: '/fe/node/node' },
        { text: '可视化', link: '/fe/visualization/visualization' },
      ],
      '/sem/': [{ text: '计算机网络', link: '/sem/network' }],
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Evan You',
    },

    search: {
      provider: 'local',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com' }],
  },
})
