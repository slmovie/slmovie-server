/**
 * Created by BaoJun on 2017/3/11.
 */
const cheerio = require('cheerio')
const getSuperagent = require('../utils/mySuperagent.js')
const chinese2Gb2312 = require('../utils/chinese2Gb2312.js')
const DealError = require('../res/error.js')

exports.queryTitle = function (query, next) {
    let form = {
        show: 'title',
        keyboard: query,
    }
    let callBack = {}
    let status = {}
    getSuperagent().post('http://www.tiantangbt.com/e/search/index.php')
        .type('form')
        .send(form)
        .end(function (error, response) {
            if (error || response.statusCode == 'undefined') {
                status['code'] = 0
                status['error'] = error
                callBack['status'] = status
                next(callBack)
                return
            }
            if (response.statusCode == 200) {
                let $ = cheerio.load(response.text)
                let jsonRes = {}
                //基本信息
                let movies = []
                $('.post', '.post-grid').each(function (i, elem) {
                    let address = $('a', elem).attr('href')
                    address = address.slice(26, address.length - 5)
                    let post = $('img', 'a', $(elem)).attr('src')
                    if (post.indexOf('http') < 0) {
                        post = 'http://www.tiantangbt.com' + post
                    }
                    let name = $('a', '.entry-title', elem).attr('title')
                    let nameIndex = name.indexOf('/')
                    if (nameIndex > 0) {
                        name = name.substr(0, nameIndex)
                    }
                    nameIndex = name.indexOf(' ')
                    if (nameIndex > 0) {
                        name = name.substr(0, nameIndex)
                    }
                    let nameStrongIndex = name.indexOf('strong')
                    if (nameStrongIndex > 0) {
                        name = name.substr(8, name.length - 1)
                    }
                    movies.push({
                        //电影名称
                        'name': name,
                        //网页地址
                        'address': address,
                        //海报图片
                        'post': post,
                        //热度
                        'db': $('span[class=meta-view]', elem).text(),
                        //上映日期
                        'year': $('span[class=date]', elem).text(),
                        'from': 'ttbt',
                    })
                })
                if (movies.length == 0) {
                    status = DealError.SEARCHNONERES
                    callBack['status'] = status
                } else {
                    status['code'] = 1
                    callBack['status'] = status
                    callBack['movies'] = movies
                }
                next(callBack)
            }
        })
}

//爬取细节及下载地址
exports.detail = function (req, res) {
    let website = 'http://www.tiantangbt.com/' + req.query.code + '.html'
    getSuperagent().get(website)
        .end(function (error, response) {
            let status = {}
            let callBack = {}
            if (error || response.statusCode == 'undefined') {
                status['code'] = 0
                status['error'] = error
                callBack['status'] = status
                return
            }
            if (response.statusCode == 200) {
                let $ = cheerio.load(response.text)
                //完整返回值
                let jsonRes = {}
                //下载地址信息
                let movies = []
                let detail = []
                $('h1', '.entry-content').each(function (i, elem) {
                    if (i != 0 & i != 1) {
                        let de = $('span', elem).text()
                        detail.push(de)
                    }
                })
                //剧照
                let photos = []
                $('p', '.entry-content').each(function (i, elem) {
                    let picElem = $('img', elem).length
                    if (picElem != 0) {
                        let pic = $('img', elem).attr('src')
                        if (pic.indexOf('icon_txt') < 0) {
                            if (pic.indexOf('http') < 0) {
                                pic = 'http://www.tiantangbt.com' + pic
                            }
                            photos.push(pic)
                        }
                    }
                    let downloadElem = $('a', elem).length
                    if (downloadElem != 0) {
                        let movie = {}
                        let download = $('a', elem).attr('href')
                        if (download.indexOf('http') < 0) {
                            download = 'http://www.tiantangbt.com' + download
                        }
                        movie['download'] = download
                        if (download.indexOf('zimuku') < 0) {
                            movie['name'] = $('a', elem).attr('title')
                            movies.push(movie)
                        }
                    }

                })
                let postElem = $('img', $('h1', '.entry-content')[0]).length
                let post
                if (postElem != 0) {
                    post = $('img', $('h1', '.entry-content')[0]).attr('src')
                    if (post.indexOf('http') < 0) {
                        post = 'http://www.tiantangbt.com' + post
                    }
                } else {
                    post = photos[0]
                }
                jsonRes['post'] = post
                jsonRes['files'] = movies
                jsonRes['detail'] = detail
                jsonRes['photos'] = photos
                status['code'] = 1
                callBack['status'] = status
                callBack['movies'] = jsonRes
                console.log(callBack)
                res.json(callBack)
            }
        })
}