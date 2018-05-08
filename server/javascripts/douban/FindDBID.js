/**
 * Created by 包俊 on 2018/5/5.
 */
const getSuperagent = require('../utils/mySuperagent.js')
const chinese2Gb2312 = require('../utils/chinese2Gb2312.js')
const cheerio = require('cheerio')

//查找豆瓣id
exports.findDBID = function (imdb, next) {
    findDBID(imdb, next)
}

// findDBID('tt0284235', (data) => {
//     console.log(data)
// })

function findDBID(imdb, next) {
    let name = chinese2Gb2312(imdb)
    getSuperagent().get('http://api.douban.com/v2/movie/search?q=' + name)
        .charset('gb2312')
        .accept('application/json')
        .end(function (error, response) {
            if (error || response.statusCode == 'undefined') {
                next("0")
                return
            }
            if (response.statusCode == 200) {
                var contents = JSON.parse(response.text).subjects
                if (contents.length == 0) {
                    next("0")
                    console.log(error)
                } else {
                    next(contents[0])
                    // findMovie(contents[0].id, (data) => {
                    //     next(data)
                    // })
                }
            }
        })
}

function findMovie(id, next) {
    let name = chinese2Gb2312(id)
    getSuperagent().get('http://api.douban.com/v2/movie/subject/' + name)
        .charset('gb2312')
        .accept('application/json')
        .end(function (error, response) {
            if (error || response.statusCode == 'undefined') {
                next("0")
                console.log(error)
                return
            }
            if (response.statusCode == 200) {
                // console.log(response.text)
                var contents = JSON.parse(response.text)
                if (contents.length == 0) {
                    next("0")
                } else {
                    next(contents)
                }
            }
        })
}

// findDBID("张艺谋", (id => {
//     console.log(id)
// }))