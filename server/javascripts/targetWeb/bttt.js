/**
 * Created by BaoJun on 2017/2/11.
 * bt天堂
 */
const cheerio = require('cheerio')
const getSuperagent = require('../utils/mySuperagent.js')
const chinese2Gb2312 = require('../utils/chinese2Gb2312.js')
const DealError = require('../res/error.js')

exports.queryTitle = function (query, next) {
    let form = {
        show: 'title,ftitle,type,area,time,director,player,actor,imdb',
        tbname: 'movie',
        tempid: '1',
        keyboard: query,
    }
    let callBack = {}
    let status = {}
    status['code'] = 101
    callBack['status'] = status
    next(callBack)
    return
    // getSuperagent().post('http://www.bttt99.com/e/search/')
    //     .timeout(5000)
    //     .type('form')
    //     .send(form)
    //     .end(function (error, response) {
    //         if (error || response.statusCode == 'undefined') {
    //             status['code'] = 0
    //             status['error'] = error
    //             callBack['status'] = status
    //             next(callBack)
    //             return
    //         }
    //         if (response.statusCode == 200) {
    //             let $ = cheerio.load(response.text)
    //             let jsonRes = {}
    //             //基本信息
    //             let movies = []
    //             $('.title').each(function (i, elem) {
    //                 let address = $('a', elem).attr('href')
    //                 if (address.indexOf('bttt99') < 0)
    //                     address = 'http://www.bttt99.com' + address
    //                 movies.push({
    //                     //电影名称
    //                     'name': $('b', elem).text(),
    //                     //网页地址
    //                     'address': address.split('/')[4],
    //                     //海报图片
    //                     'post': $('img', $(elem).next()).attr('src'),
    //                     //豆瓣评分
    //                     'douban': $('strong', elem).text(),
    //                     //上映日期
    //                     'year': $('font', 'b', elem).text(),
    //                     'from': 'bttt',
    //                 })
    //             })
    //             if (movies.length == 0) {
    //                 status = DealError.SEARCHNONERES
    //                 callBack['status'] = status
    //             } else {
    //                 status['code'] = 1
    //                 callBack['status'] = status
    //                 callBack['movies'] = movies
    //             }
    //             next(callBack)
    //         }
    //     })
}

//爬取细节及下载地址
exports.detail = function (req, res) {
    let website = 'http://www.bttt99.com/e/show.php?classid=1&id=' + req.query.code
    getSuperagent().get(website)
        .set('Referer', 'http://www.bttt99.com/v/' + req.query.code + '/')
        .end(function (error, response) {
            let status = {}
            let callBack = {}
            if (error || response.statusCode == 'undefined') {
                status['code'] = 0
                status['error'] = error
                callBack['status'] = status
                res.json(callBack)
                return
            }
            if (response.statusCode == 200) {
                let $ = cheerio.load(response.text)
                //完整返回值
                let jsonRes = {}
                //下载地址信息
                let movies = []
                $('.downurl').each(function (i, elem) {
                    $('li', elem).each(function (x, xelem) {
                        let movie = {}
                        //文件名称
                        movie['name'] = $('a', xelem).text()
                        //下载地址
                        movie['download'] = $('a', xelem).attr('href')
                        //文件大小
                        movie['fileSize'] = ''
                        movies.push(movie)
                    })
                })
                jsonRes['files'] = movies

                //剧照
                let photos = []
                jsonRes['photos'] = photos
                movieDetail(req, res, jsonRes)
            }
        })
}

function movieDetail(req, res, jsonRes) {
    getSuperagent().get('http://www.bttt99.com/v/' + req.query.code + '/')
        .end(function (error, response) {
            if (error || response.statusCode == 'undefined') {
                res.send(jsonRes)
                return
            }
            if (response.statusCode == 200) {
                let detail = []
                let $ = cheerio.load(response.text)
                $('li', '.moviedteail_list').each(function (i, elem) {
                    detail.push($(elem).text())
                })
                jsonRes['detail'] = detail
                jsonRes['post'] = $('img', '.moviedteail_img').attr('src')
                res.json(jsonRes)
            }
        })
}