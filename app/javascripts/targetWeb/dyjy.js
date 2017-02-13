/**
 * Created by BaoJun on 2017/2/11.
 * 電影家園
 */
const cheerio = require('cheerio')
const chinese2Gb2312 = require('../utils/chinese2Gb2312.js')
const getSuperagent = require('../utils/mySuperagent.js')

//爬取标题图片等信息
exports.queryTitle = function (query, next) {
    let name = chinese2Gb2312(query)
    let callBack = {}
    let status = {}
    getSuperagent().get('http://s.imp4la.com/s.asp?w=' + name)
        .charset('gb2312')
        .end(function (error, response) {
            if (error) {
                status['code'] = 0
                status['error'] = error
                callBack['status'] = status
                next(callBack)
            }
            if (response.statusCode == 200) {
                status['code'] = 1
                callBack['status'] = status
                let $ = cheerio.load(response.text)
                //基本信息
                let movies = []
                $('.play-img').each(function (i, elem) {
                    movies.push({
                        'name': $(elem).attr('title'),
                        //网页地址
                        'address': $(elem).attr('href'),
                        //海报图片
                        'post': $('img', elem).attr('src'),
                        //豆瓣评分
                        'db': $('info', '.pRightBottom', elem).text(),
                        //上映日期
                        'year': $('info', '.pLeftTop', elem).text()
                    })
                })
                callBack['movies'] = movies
                next(callBack)
            }
        })
}

//爬取细节及下载地址下载地址
exports.detail = function (req, res) {
    let website = 'http://www.idyjy.com/sub/23016.html'
    getSuperagent().get(website)
        .charset('gb2312')
        .end(function (error, response) {
            if (error) {
                res.send(error)
            }
            if (response.statusCode == 200) {
                let $ = cheerio.load(response.text)
                //完整返回值
                let jsonRes = {}
                //下载地址信息
                let movies = []
                $('.down_part_name').each(function (i, elem) {
                    let movie = {}
                    //文件名称
                    movie['name'] = $('a', elem).text()
                    //下载地址
                    movie['download'] = $('a', elem).attr('href')
                    //文件大小
                    movie['file-size'] = $('em', $(elem).parent().next()).text()
                    movies.push(movie)
                })
                jsonRes['files'] = movies
                //剧照
                let photos = []
                $('img', '.endtext').each(function (i, elem) {
                    photos.push($(elem).attr('src'))
                })
                jsonRes['photos'] = photos
                res.json(jsonRes)
            }
        })
}