import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'

// 存放md文件的文件夹名
const mdDirName = 'md'
const mdFilePath = path.join(__dirname, '../docs/' + mdDirName)

// 监听目录文件发生变化
function watchDir() {
  const watcher = chokidar.watch(mdFilePath, {
    persistent: true,
  })
  watcher.on('add', (path, stats) => {
    console.log(`File ${path} has been added`)
  })
  watcher.on('change', (path, stats) => {
    console.log(`File ${path} has been changed`)
  })
  watcher.on('unlink', (path, stats) => {
    console.log(`File ${path} has been removed`)
  })
  watcher.on('error', error => {
    console.log(`Watcher error: ${error}`)
  })
}

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
  fs.readdirSync(mdFilePath).forEach((dirName, index) => {
    const text = dirName.replace(/\d*\./, '')
    sidebar.push({
      text,
      collapsed: false,
      items: [],
    })
    const filepath = path.join(mdFilePath, dirName)
    fs.readdirSync(filepath).forEach(filename => {
      sidebar[index].items.push({
        text: filename.replace('.md', '').replace(/\d*\./, ''),
        link: `/${mdDirName}/${dirName}/${filename}`,
      })
      // 按照文档前面数字进行排序
      sidebar[index].items = sidebar[index].items.sort((after, before) => {
        console.log(after)
        return (
          Number(after.text.slice(0, after.text.indexOf('.'))) -
          Number(before.text.slice(0, before.text.indexOf('.')))
        )
      })
    })
  })
  return sidebar
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
  fs.readdirSync(mdFilePath).forEach((dirName, index) => {
    const text = dirName.replace(/\d*\./, '')
    nav.push({
      text,
      items: [],
    })
    fs.readdirSync(path.join(mdFilePath, dirName)).forEach(filename => {
      nav[index].items.push({
        text: filename.replace('.md', '').replace(/\d*\./, ''),
        link: `/${mdDirName}/${dirName}/${filename}`,
        activeMatch: `/${mdDirName}/${dirName}/${filename}`,
      })
    })
    // 按照文档前面数字进行排序
    nav[index].items = nav[index].items.sort((after, before) => {
      console.log(after)
      return (
        Number(after.text.slice(0, after.text.indexOf('.'))) -
        Number(before.text.slice(0, before.text.indexOf('.')))
      )
    })
  })
  return nav
}
