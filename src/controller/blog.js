const getBlogList = (auhtor, list) => {

    //mock Data
    return [
        {
            id: 1,
            title: '美丽的祖国',
            content: '我的祖国好美丽',
            auhtor: 'jack ma',
            createTime: '20190921'
        },
        {
            id: 2,
            title: '我爱你中国',
            content: '人民日报报道',
            auhtor: 'mahua teng',
            createTime: '20191001'
        }
    ]
}

const getBlogDetail = (id) => {
    return [
        {
            id: 1,
            title: '我爱你中国',
            content: '【2019诺贝尔奖生理学或医学奖揭晓】William G. Kaelin Jr，Sir Peter J. Ratcliffe 和 Gregg L. Semenza 三人获奖，以表彰他们研究发现了细胞如何感应和适应氧气供应。据记者从诺尔贝官方网站了解，自1901年以来，诺贝尔生理学或医学奖总共颁发了109次。在这109次颁奖中，39次授予了单个获奖者，33次由两人分享，37次由三人共享，共计216位获奖者，平均年龄为58岁。在这216名获奖者中，女性有12人，其中包括屠呦呦。（记者 孙庆玲 图片来源：诺贝尔奖官网）',
            auhtor: 'renming',
            createTime: '20191008'
        }
    ]
}

//新建blog
const newBlog = (blogData = {}) => {
    
    console.log('blogData: ', blogData);

    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    console.log(id)
    console.log(blogData)
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