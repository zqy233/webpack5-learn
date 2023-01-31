import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/webpack5-learn/',
  title: 'webpack5入门到进阶',
  description: 'webpack5入门到进阶',
  head: [['link', { rel: 'icon', href: '/webpack5-learn/favicon.ico' }]],
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    // https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
    theme: 'one-dark-pro',
  },
  themeConfig: {
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
    },
    outlineTitle: '目录',
    lastUpdatedText: '更新日期',
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2022.4-${new Date().getFullYear()}.${new Date().getMonth() + 1}`,
    },
    editLink: {
      pattern: 'https://github.com/zqy233/webpack5-learn/edit/master/docs/:path',
      text: '在GitHub编辑此页',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/zqy233/webpack5-learn',
      },
    ],
    nav: [
      {
        text: '入门',
        items: [
          {
            text: '前言',
            link: '/',
            activeMatch: '/',
          },
          {
            text: '安装',
            link: '/start/start',
            activeMatch: '/start/start',
          },
        ],
      },
      {
        text: '进阶',
        items: [
          {
            text: '实现一个vue脚手架',
            link: '/advanced/vuecli',
            activeMatch: '/advanced/vuecli',
          },
        ],
      },
    ],
    sidebar: [
      {
        text: '入门',
        collapsible: true,
        items: [
          {
            text: '前言',
            link: '/',
          },
          {
            text: '安装',
            link: '/start/start',
          },
        ],
      },
      {
        text: '进阶',
        collapsible: true,
        items: [
          {
            text: '实现一个vue脚手架',
            link: '/advanced/vuecli',
          },
        ],
      },
    ],
  },
})
