const fs = require("fs")

function findMarkdown(dir, callback) {
  fs.readdir(dir, function (err, files) {
    if (err) throw err
    files.forEach(fileName => {
      let innerDir = `${dir}/${fileName}`
      fs.stat(innerDir, function (err, stat) {
        if (stat.isDirectory()) {
          findMarkdown(innerDir, callback)
        } else {
          if (fileName.indexOf(".md") > -1) {
            callback(innerDir)
          }
        }
      })
    })
  })
}

module.exports = findMarkdown
