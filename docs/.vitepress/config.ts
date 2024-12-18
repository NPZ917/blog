import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'N',
  description: 'Blog',
  base: '/blog/',
  markdown: {
    // 代码块行号
    lineNumbers: true,
  },
  head: [
    [
      'link',
      {
        rel: 'shortcut icon',
        href: 'https://img.syt5.com/2020/1126/20201126030956380.jpg',
        crossorigin: '',
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Front End',
        items: [
          { text: 'HTML/CSS', link: '/fe/html_css/html' },
          { text: 'JavaScript', link: '/fe/js/core' },
          { text: 'Vue', link: '/fe/vue/2.x.md' },
          { text: 'React', link: '/fe/react/core' },
          { text: '工程化', link: '/fe/module/' },
          // { text: '跨端', link: '/fe/multiterminal/uniapp' },
          { text: 'WX', link: '/fe/wx/wx' },
          { text: 'Node', link: '/fe/node/core' },
          // { text: '可视化', link: '/fe/visualization/visualization' },
        ],
      },
      {
        text: 'Web',
        items: [{ text: '计算机网络', link: '/sem/network' }],
      },
      { text: 'Essay', link: '/daily_notes/' },
      { text: 'Pit', link: '/bug/node' },
      { text: 'Other', link: '/other/upload' },
    ],
    sidebar: {
      '/fe/': [
        {
          text: 'HTML/CSS',
          collapsed: true,
          items: [
            { text: 'HTML', link: '/fe/html_css/html' },
            { text: 'CSS', link: '/fe/html_css/css' },
            // { text: 'SASS', link: '/fe/html_css/sass' },
            // { text: 'LESS', link: '/fe/html_css/less' },
          ],
        },
        {
          text: 'JavaScript',
          collapsed: true,
          items: [
            { text: 'Core', link: '/fe/js/core' },
            { text: 'BOM', link: '/fe/js/bom' },
            { text: 'DOM', link: '/fe/js/dom' },
            { text: 'ES2015+', link: '/fe/js/es6' },
            { text: 'TypeScript', link: '/fe/js/ts' },
            { text: 'Extend', link: '/fe/js/extend' },
          ],
        },
        {
          text: 'Vue',
          collapsed: true,
          items: [
            { text: '2.x', link: '/fe/vue/2.x.md' },
            { text: '2.x Analysis', link: '/fe/vue/vue2-analysis.md' },
            { text: '3.x', link: '/fe/vue/3.x.md' },
            { text: 'Vue Router', link: '/fe/vue/vue-router' },
            { text: 'Vuex', link: '/fe/vue/vuex' },
            { text: 'Pinia', link: '/fe/vue/pinia' },
          ],
        },
        {
          text: 'React',
          collapsed: true,
          items: [
            { text: 'Core', link: '/fe/react/core' },
            { text: 'React Router', link: '/fe/react/react-router' },
            { text: 'Redux', link: '/fe/react/redux' },
            { text: 'React Redux', link: '/fe/react/react-redux' },
            { text: 'Mobx', link: '/fe/react/mobx' },
          ],
        },
        {
          text: '工程化',
          collapsed: true,
          items: [
            { text: '初识', link: '/fe/module/' },
            {
              text: 'Webpack5',
              link: '/fe/module/webpack',
              // items: [
              //   {
              //     text: 'Core',
              //     link: '/fe/module/webpack',
              //   },
              //   // {
              //   //   text: 'webpack5 + vue3 + ts',
              //   //   link: '/fe/module/webpack5-vue3-ts',
              //   // },
              //   // {
              //   //   text: 'webpack5 + vue3',
              //   //   link: '/fe/module/',
              //   // },
              //   // {
              //   //   text: 'webpack5 + vue3 + ts',
              //   //   link: '/fe/module/',
              //   // },
              //   // {
              //   //   text: 'webpack5 + react18 + ts',
              //   //   link: '/fe/module/',
              //   // },
              // ],
            },
            // { text: 'webpack', link: '/fe/module/webpack' },
            { text: 'Vite', link: '/fe/module/vite' },
            // { text: 'Gulp', link: '/fe/module/gulp' },
            // { text: 'rollup', link: '/fe/module/rollup' },
            // { text: 'esbuild', link: '/fe/module/esbuild' },
          ],
        },
        // {
        //   text: '跨端',
        //   collapsed: false,
        //   items: [
        //     { text: 'uniapp', link: '/fe/multiterminal/uniapp' },
        //     { text: 'Taro', link: '/fe/multiterminal/taro' },
        //     { text: 'React Native', link: '/fe/multiterminal/rn' },
        //     { text: 'Flutter', link: '/fe/multiterminal/flutter' },
        //   ],
        // },
        { text: '微信小程序', link: '/fe/wx/wx' },
        {
          text: 'Node',
          collapsed: true,
          items: [
            { text: 'core', link: '/fe/node/core' },
            { text: 'express', link: '/fe/node/express' },
          ],
        },
        // { text: '可视化', link: '/fe/visualization/visualization' },
      ],
      '/sem/': [{ text: '计算机网络', link: '/sem/network' }],
      '/other/': [
        { text: '文件上传', link: '/other/upload' },
        { text: '性能优化', link: '/other/optimize' },
        { text: '图片懒加载', link: '/other/lazy_load' },
        { text: 'Git 多账号', link: '/other/git' },
      ],
      '/bug/': [
        { text: 'Node', link: '/bug/node' },
        { text: 'Element-plus', link: '/bug/element-plus' },
      ],
    },

    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2023-present N',
    // },

    // 标题深度，[2,3] 表示提取 h2 和 h3 标题
    outline: 'deep',

    search: {
      provider: 'local',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com' }],
  },
})
