/**
 * Created by BaoJun on 2017/2/12.
 */
const cheerio = require('cheerio')
const getSuperagent = require('../utils/mySuperagent.js')

exports.queryTitle = function (req, res) {
    let url = 'http://www.bttt.la/s.php?q=' + req.query.name + '&sitesearch=www.bttt.la&domains=bttt.la&hl=zh-CN&ie=UTF-8&oe=UTF-8'
    getSuperagent()(encodeURI(url))
        .end(function (error, response) {
            if (error) {
                res.send(error)
            }
            if (response.statusCode == 200) {
                let $ = cheerio.load(response.text)
                let jsonRes = {}
                //基本信息
                let movies = []
                $('.title').each(function (i, elem) {
                    movies.push({
                        //电影名称
                        'name': $('b', elem).text(),
                        //网页地址
                        'address': $('a', elem).attr('href'),
                        //海报图片
                        'post': $('img', $(elem).next()).attr('src'),
                        //豆瓣评分
                        'db': $('strong', elem).text(),
                        //上映日期
                        'year': $('font', 'b', elem).text()
                    })
                })
                jsonRes['bttt'] = movies
                res.json(jsonRes)
            }
        })
}

//爬取细节及下载地址下载地址
exports.detail = function (req, res) {
    let website = 'http://www.bttt.la/subject/26006.html'
    getSuperagent().get(website)
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
                $('.tinfo').each(function (i, elem) {
                    let movie = {}
                    //文件名称
                    movie['name'] = $('a', elem).text()
                    //下载地址
                    movie['download'] = $('a', elem).attr('href')
                    //文件大小
                    movie['file-size'] = ''
                    movies.push(movie)
                })
                jsonRes['files'] = movies
                //剧照
                let photos = []
                jsonRes['photos'] = photos
                res.json(jsonRes)
            }
        })
}