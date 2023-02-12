import fs from 'fs'
import path from 'path'

const mdFilePath = path.join(__dirname, '../docs/')
// 排除文件
const excludeFile = ['.vitepress', 'public', 'index.md', 'vite.config.ts']
// 首页名称
const homeName = '前言'
interface sidebar {
  text: string
  collapsed: boolean
  items: sidebarItem[]
}
interface sidebarItem {
  text: string
  link: string
}
export function getSidebar(sidebar = <sidebar[]>[]) {
  fs.readdirSync(mdFilePath).forEach(dirName => {
    if (!excludeFile.includes(dirName)) {
      const text = dirName.replace(/\d*\./, '')
      sidebar[text] = {
        text,
        collapsed: false,
        items: [],
      }
      const filepath = path.join(mdFilePath, dirName)
      fs.readdirSync(filepath).forEach(filename => {
        sidebar[text].items.push({
          text: filename.replace('.md', '').replace(/\d*\./, ''),
          link: `/${dirName}/${filename}`,
        })
      })
      // 首页
      if (text === '入门') {
        sidebar[text].items.push({
          text: homeName,
          link: '/',
        })
      }
      // 把首页移到数组第一个
      const index = sidebar[text].items.findIndex(item => item.text === homeName)
      const item = sidebar[text].items.splice(index, 1)
      sidebar[text].items.unshift(item[0])
      // 按照文档前面数字进行排序
      sidebar[text].items = sidebar[text].items.sort((after, before) => {
        return (
          Number(after.text.slice(0, after.text.indexOf('.'))) -
          Number(before.text.slice(0, before.text.indexOf('.')))
        )
      })
    }
  })
  return Object.values(sidebar)
}

interface nav {
  text: string
  items: navItem[]
}
interface navItem {
  text: string
  link: string
  activeMatch: string
}
export function getNav(nav = <nav[]>[]) {
  fs.readdirSync(mdFilePath).forEach(dirName => {
    if (!excludeFile.includes(dirName)) {
      const text = dirName.replace(/\d*\./, '')
      nav[text] = {
        text,
        items: [],
      }
      fs.readdirSync(path.join(mdFilePath, dirName)).forEach(filename => {
        nav[text].items.push({
          text: filename.replace('.md', '').replace(/\d*\./, ''),
          link: `/${dirName}/${filename}`,
          activeMatch: `/${dirName}/${filename}`,
        })
      })
      // 首页
      if (text === '入门') {
        nav[text].items.push({
          text: homeName,
          link: '/',
          activeMatch: '/',
        })
      }
      // 把首页移到数组第一个
      const index = nav[text].items.findIndex(item => item.text === homeName)
      const item = nav[text].items.splice(index, 1)
      nav[text].items.unshift(item[0])
      // 按照文档前面数字进行排序
      nav[text].items = nav[text].items.sort((after, before) => {
        return (
          Number(after.text.slice(0, after.text.indexOf('.'))) -
          Number(before.text.slice(0, before.text.indexOf('.')))
        )
      })
    }
  })

  return Object.values(nav)
}
