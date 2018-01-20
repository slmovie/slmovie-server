/**
 * Created by 包俊 on 2017/7/19.
 */
const getSuperagent = require('../../utils/mySuperagent.js')
const cheerio = require('cheerio')
const chinese2Gb2312 = require('../../utils/chinese2Gb2312.js')
const Error = require('../../res/error.js')

//获取所有更新电影
exports.MyNewMovies = function (callback) {
    MyNewMovies(callback)
}
//获取更新电影中最大的address
exports.getLength = function (callback) {
    newMoviesLength(callback)
}

function newMoviesLength(callback) {
    getLength(0, 0, function (length) {
        console.log(length)
        callback(length)
    })
}

function getLength(index, length, next) {
    newMovies(index, function (doc, number) {
        if (index < 8) {
            if (number > length)
                length = number
            console.log("newmovies index=" + index + " most=" + number)
            getLength(index + 1, length, next)
        } else {
            next(length)
        }
    })
}

function MyNewMovies(callback) {
    let allNewMovies = {}
    allNewMovies['movies'] = []
    getAllNewMovies(allNewMovies, 0, function () {
        // console.log(allNewMovies)
        callback(allNewMovies)
    })
}

//拼装所有新电影数据
function getAllNewMovies(allNewMovies, index, next) {
    let callback = {}
    let status = {}
    newMovies(index, function (doc) {
        if (doc.status.code == 1) {
            status['code'] = 1
            allNewMovies['status'] = status
            callback['movies'] = doc
            callback['type'] = newMoviesType(index)
            callback['index'] = index
            if (index < 8) {
                allNewMovies['movies'].push(callback)
                getAllNewMovies(allNewMovies, index + 1, next)
            } else {
                next()
            }
        } else {
            allNewMovies = {}
            next()
        }
    })
}

//最新电影
function newMovies(index, next) {
    let callBack = {}
    let status = {}
    let number = 0
    getSuperagent().get('http://www.idyjy.com')
        .charset('gb2312')
        .end(function (error, response) {
            if (error || response.statusCode == 'undefined') {
                status['code'] = 0
                status['error'] = error
                callBack['status'] = status
                next(callBack, number)
                return
            }
            if (response.statusCode == 200) {
                let $ = cheerio.load(response.text)
                //基本信息
                let movies = []
                $('.play-img', $('.img-list', $('.box')[0])[index]).each(function (i, elem) {
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
                    if (number < address)
                        number = address;
                })
                if (movies.length == 0) {
                    status = Error.SEARCHNONERES
                    callBack['status'] = status
                } else {
                    status['code'] = 1
                    callBack['status'] = status
                    callBack['movies'] = movies
                }
                next(callBack, number)
            }
        })
}

function newMoviesType(index) {
    if (index == 0) {
        return '最近更新'
    } else if (index == 1) {
        return '动作片'
    } else if (index == 2) {
        return '喜剧片'
    } else if (index == 3) {
        return '爱情片'
    } else if (index == 4) {
        return '科幻片'
    } else if (index == 5) {
        return '恐怖片'
    } else if (index == 6) {
        return '剧情片'
    } else if (index == 7) {
        return '战争片'
    }
}