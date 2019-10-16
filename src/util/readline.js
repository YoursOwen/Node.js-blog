const path = require('path')
const fs = require('fs')
const readline = require('readline')

const fileFullPath = path.resolve(__dirname, '../', '../logs', 'access.log')

const readStream = fs.createReadStream(fileFullPath)

const rl = readline.createInterface({
    input: readStream
})

let QQBrowserNum = 0;
let totalNum = 0;

rl.on('line', (lineData) => {
    if (!lineData) return

    totalNum++;

    const chrome = lineData.split(' -- ')[2]

    if (chrome && chrome.indexOf('QQBrowser') > -1) {
        QQBrowserNum++
    }
})

rl.on('close', () => {
    console.log('QQ浏览器占比'+ QQBrowserNum / totalNum)
})