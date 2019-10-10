const { exec } = require('../db/mysql')

const getBlogList = (auhtor, keyword) => {
    let sql = `select title,createTime from blogs where 1=1 `

    if (auhtor) {
        sql += `and author = '${auhtor}' `
    } else if (keyword) {
        sql += `and title like '%${keyword}%' `
    }

    sql += `order by createTime desc `

    return exec(sql)
}

const getBlogDetail = (id) => {
    let sql = `select * from blogs where id = ${id} `

    return exec(sql).then(row => {
        return row[0]
    })
}

//新建blog
const newBlog = (blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()
   
    const sql = `insert into blogs (title, content, author, createTime) values ('${title}', '${content}', '${author}', '${createTime}') `
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    const title = blogData.title
    const content = blogData.content

    const sql = `update blogs set title = '${title}', content = '${content}' where id = ${id} `

    return exec(sql).then(updateRes => {
        console.log(updateRes)
        if (updateRes.changedRows !== 0) {
            return true
        } else {
            return false
        }
    })

    return false
}

const delBlog = (id) => {

    return true

}

module.exports = {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    delBlog
}