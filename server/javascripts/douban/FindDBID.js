/**
 * Created by 包俊 on 2018/5/5.
 */
var request = require('superagent');
require('superagent-proxy')(request);
const chinese2Gb2312 = require('../utils/chinese2Gb2312.js')
let IPPool = require('../utils/IPPool/IPPools.js')

let MyProxy = '-1'

//查找豆瓣id
exports.findDBID = function (imdb, next) {
    if (imdb == '' || imdb == undefined) {
        next('0')
        // console.log('no imdb')
    } else {
        startFindID(imdb, next)
    }
}

// startFindID('tt0284235', data => {
//     console.log(data)
// })

function startFindID(imdb, next) {
    try {
        if (MyProxy == '-1') {
            IPPool.getSinglePoxy((ip => {
                if (ip == '0') {
                    startFindID(imdb, next)
                } else {
                    MyProxy = ip
                    findDBID(imdb, MyProxy, next)
                }
            }))
        } else {
            findDBID(imdb, MyProxy, next)
        }
    } catch (error) {
        console.log('catch startFindID error>>>' + error)
        startFindID(imdb, next)
    }
}

// findDBID('tt0284235', '', data => {
//     console.log(data)
// })

function findDBID(imdb, proxy, next) {
    // let name = chinese2Gb2312(imdb)
    request.get('http://api.douban.com/v2/movie/search?q=' + imdb)
        .accept('application/json')
        .proxy(proxy)
        .timeout(5000)
        .on('error', (error) => {
            console.log('findDBID on error' + error)
        })
        .end(function (error, response) {
            try {
                if (error || response.statusCode == 'undefined' || response.statusCode != 200) {
                    var contents = JSON.parse(response.text)
                    if (contents.code == '112') {
                        MyProxy = '-1'
                        startFindID(imdb, next)
                    } else {
                        next("0")
                    }
                    return
                }
                if (response.statusCode == 200) {
                    // console.log(response.text)
                    var contents = JSON.parse(response.text).subjects
                    if (contents.length == 0) {
                        next("0")
                    } else {
                        findMovie(contents[0].id, imdb, next)
                        // next(contents[0])
                    }
                }
            } catch (ex) {
                if (error.code == 'ECONNRESET') {
                    console.log(error)
                    MyProxy = '-1'
                    startFindID(imdb, next)
                } else {
                    MyProxy = '-1'
                    console.log(error)
                    startFindID(imdb, next)
                }
            }
        })
}

function wait(imdb, proxy, next) {
    setTimeout(() => {
        MyProxy = '-1'
        startFindID(imdb, next)
    }, 3000)
}

function findMovie(id, imdb, next) {
    let name = chinese2Gb2312(id)
    request.get('http://api.douban.com/v2/movie/subject/' + name)
        .charset('gb2312')
        .accept('application/json')
        .on('error', (error) => {
            console.log('findDBID on error' + error)
        })
        .end(function (error, response) {
            try {
                if (error || response.statusCode == 'undefined') {
                    var contents = JSON.parse(response.text)
                    if (contents.code == '112') {
                        MyProxy = '-1'
                        startFindID(imdb, next)
                    } else {
                        next("0")
                    }
                    return
                }
                if (response.statusCode == 200) {
                    var contents = JSON.parse(response.text)
                    if (contents.length == 0) {
                        next("0")
                    } else {
                        next(contents)
                    }
                }
            } catch (ex) {
                MyProxy = '-1'
                startFindID(imdb, next)
                console.log(error)
            }
        })
}

// findDBID("张艺谋", (id => {
//     console.log(id)
// }))