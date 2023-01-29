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
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2022.4-${new Date().getFullYear()}.${new Date().getMonth() + 1}`,
    },
    editLink: {
      pattern: 'https://github.com/zqy233/formatAndSave/edit/master/blog/:path',
      text: 'Edit this page on GitHub',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/zqy233/formatAndSave',
      },
    ],
    nav: [
      {
        text: '起步',
        items: [
          {
            text: '什么是 webpack',
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
    ],
    sidebar: {
      '/': [
        {
          text: '起步',
          items: [
            {
              text: '什么是 webpack',
              link: '/',
            },
            {
              text: '安装',
              link: '/start/start',
            },
          ],
        },
      ],
    },
  },
})
