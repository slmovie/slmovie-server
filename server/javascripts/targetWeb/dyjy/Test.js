/**
 * Created by 包俊 on 2018/1/20.
 */
let dyjy = require('./dyjyUtils.js')

test1()

function test() {
    dyjy.movieTwiceSpide('/down/24705-0-0.html', (url) => {
        console.log(url)
    })
}

function test1() {
    dyjy.getData('14240', (doc) => {
        console.log(doc.movies.files)
    })
}