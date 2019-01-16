/**
 * Created by 包俊 on 2017/7/20.
 */
const getSuperagent = require('../../utils/mySuperagent.js')
const cheerio = require('cheerio')

//热门电影
exports.hotMovies = function (next) {
    let callBack = {}
    let status = {}
    getSuperagent().get('http://www.idyjy.com')
        .charset('gb2312')
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
                //基本信息
                let movies = []
                $('.play-img', '.moxhotcoment').each(function (i, elem) {
                    let address = $(elem).attr('href')
                    let split = address.split('/')
                    address = split[split.length - 1].split('.')[0]
                    movies.push({
                        'name': $(elem).attr('title'),
                        //网页地址
                        'address': address,
                        //海报图片
                        'post': $('img', elem).attr('original'),
                        //豆瓣评分
                        'douban': $('info', '.pRightBottom', elem).text(),
                        //上映日期
                        'year': $('info', $('.pLeftTop', elem)[0]).text(),
                        'from': 'dyjy',
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
            } else {
                console.log('hotmovie get  error ' + response.statusCode)
            }
        })
}