const path = require('path')
const fs = require('fs')

const writeLog = (writeStream,log) => {
    writeStream.write(log + '\n')
}

const createWriteStream = (fileName) => {
    const fileFullPath = path.resolve(__dirname, '../', '../logs', fileName)
    const writeStream = fs.createWriteStream(fileFullPath,{
        flags: 'a'
    })

    return writeStream
}

const accessWriteStream = createWriteStream('access.log')

function access(log) {
    writeLog(accessWriteStream,log)
}

module.exports = {
    access
}