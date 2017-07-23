/**
 * Created by BaoJun on 2017/2/11.
 * 電影家園
 */
const cheerio = require('cheerio')
const chinese2Gb2312 = require('../../utils/chinese2Gb2312.js')
const getSuperagent = require('../../utils/mySuperagent.js')
const DealError = require('../../res/error.js')
const newMovies = require('./newMovies.js')
const newTVs = require('./newTVs.js')
const hotMovies = require('./hotMovies.js')

//爬取标题图片等信息
exports.queryTitle = function (query, next) {
    let name = chinese2Gb2312(query)
    let callBack = {}
    let status = {}
    getSuperagent().get('http://s.imp4la.com/s.asp?w=' + name)
        .timeout(5000)
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
                $('.play-img').each(function (i, elem) {
                    let address = $(elem).attr('href')
                    let split = address.split('/')
                    address = split[split.length - 1].split('.')[0]
                    movies.push({
                        'name': $(elem).attr('title'),
                        //网页地址
                        'id': address,
                        //海报图片
                        'post': $('img', elem).attr('src'),
                        //豆瓣评分
                        'douban': '豆瓣：' + $('info', '.pRightBottom', elem).text(),
                        //上映日期
                        'year': $('info', '.pLeftTop', elem).text(),
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
            }
        })
}

//网页请求
exports.detail = function (req, res) {
    getDetail(req.query.code, function (data) {
        res.json(data)
    })
}

//直接爬取数据
exports.getData = function (code, send) {
    getDetail(code, function (data) {
        send(data)
    })
}

//最热电影
exports.hotMovies = function (callback) {
    hotMovies.hotMovies(callback)
}

//最新电影
exports.newMovies = function (callback) {
    newMovies.MyNewMovies(callback)
}

//最新电视剧
exports.newTVs = function (callback) {
    newTVs.MyNewTVs(callback)
}

//爬取细节及下载地址下载地址
function getDetail(code, send) {
    console.log("dyjy getDetail " + code)
    let website = 'http://www.idyjy.com/sub/' + code + '.html'
    getSuperagent().get(website)
        .charset('gb2312')
        .timeout(5000)
        .end(function (error, response) {
            console.log("dyjy getDetail end " + code)
            let status = {}
            let callBack = {}
            if (error || response.statusCode == 'undefined') {
                status['code'] = 0
                status['error'] = error
                callBack['status'] = status
                send(callBack)
                console.log("dyjy getDetail 无结果")
                return
            }
            if (response.statusCode == 200) {
                let $ = cheerio.load(response.text)
                //完整返回值
                let jsonRes = {}
                //下载地址信息
                let movies = []
                let detail = []
                $('.down_part_name').each(function (i, elem) {
                    let movie = {}
                    //文件名称
                    movie['name'] = $('a', elem).attr('title')
                    //下载地址
                    movie['download'] = $('a', elem).attr('href')
                    //文件大小
                    movie['fileSize'] = $('em', $(elem).parent().next()).text()
                    movies.push(movie)
                })
                jsonRes['files'] = movies
                //电影名称
                jsonRes['name'] = $('span', '.h1title').text()
                //简介
                jsonRes['describe'] = $('.endtext').text()
                //电影信息
                detail.push(' 片名： ' + jsonRes['name'])
                $('li', '.info').each(function (i, elem) {
                    detail.push($(elem).text())
                })
                jsonRes['detail'] = detail
                jsonRes['details'] = pieceDetail(detail)
                //剧照
                let photos = []
                $('img', '.endtext').each(function (i, elem) {
                    photos.push($(elem).attr('src'))
                })
                jsonRes['photos'] = photos
                jsonRes['post'] = $('img', '.pic').attr('src')
                status['code'] = 1
                callBack['status'] = status
                callBack['movies'] = jsonRes
                // console.log(callBack)
                send(callBack)
            } else {
                status['code'] = 0
                status['error'] = error
                callBack['status'] = status
                send(callBack)
                console.log("dyjy getDetail " + response.statusCode)
                return
            }
        })
}

//详细数据拼装
function pieceDetail(detail) {
    let details = {}
    details['name'] = ''
    details['year'] = ''
    details['location'] = ''
    details['type'] = ''
    details['actor'] = ''
    details['director'] = ''
    details['otherName'] = ''
    details['IMDB'] = ''
    details['status'] = ''
    details['TV'] = false
    for (let i = 0; i < detail.length; i++) {
        if (detail[i].indexOf('片名') != -1) {
            let name = detail[i]
            name = name.replace(/\s+/g, "");
            details['name'] = name.slice(3)
        } else if (detail[i].indexOf('上映年代') != -1) {
            let str = detail[i]
            str = str.replace(/\s+/g, "");
            details['year'] = str.slice(5, 9)
            details['location'] = str.slice(12)
        } else if (detail[i].indexOf('类型') != -1) {
            let type = detail[i].slice(3)
            type = type.replace(/^\s*/, '')
            type = type.replace(/(\s*$)/g, '')
            details['type'] = type.replace(/\s+/g, "、")
        } else if (detail[i].indexOf('导演') != -1) {
            let director = detail[i].slice(3)
            director = director.replace(/^\s*/, '')
            director = director.replace(/(\s*$)/g, '')
            details['director'] = director.replace(/\s+/g, " ")
        } else if (detail[i].indexOf('主演') != -1) {
            let actor = detail[i].slice(3)
            actor = actor.replace(/^\s*/, '')
            actor = actor.replace(/(\s*$)/g, '')
            details['actor'] = actor.replace(/\s+/g, " ")
        } else if (detail[i].indexOf('又名') != -1) {
            let otherName = detail[i].slice(3)
            details['otherName'] = otherName.replace(/\s+/g, "")
        } else if (detail[i].indexOf('IMDB') != -1) {
            let IMDB = detail[i].slice(5)
            details['IMDB'] = IMDB.replace(/\s+/g, "")
        } else if (detail[i].indexOf('更新状态') != -1) {
            let status = detail[i].slice(5);
            details['status'] = status.replace(/\s+/g, "")
            details['TV'] = true
        }
    }
    return details
}

//电影数量
exports.movieLength = function (send) {
    let number = 0
    hotMovies.hotMovies(function (data) {
        for (let i = 0; i < data.length; i++) {
            if (number < data[i].address)
                number = data[i].address;
        }
        newMovies.getLength(function (data) {
            if (number < data)
                number = data
            newTVs.getLength(function (data) {
                if (number < data)
                    number = data
                send(number)
            })
        })
    })
}
