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

module.exports = {
    getBlogList
}