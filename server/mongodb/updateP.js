/**
 * Created by 包俊 on 2017/7/9.
 */
let AllMovies = require('./updateAllMovies.js')
let Index = require('./indexMovies/getIndexMovies.js')
let mongoose = require('mongoose');    //引用mongoose模块
let Constans = require('./Constans.js')
let db = mongoose.createConnection(Constans.WebRoot(), 'movies') //创建一个数据库连接

updateMovies(function () {
    Index.updateIndex()
})

function updateMovies(callback) {
    AllMovies.updateSchedule(function (res) {
        if (res == 1) {
            callback()
        } else {
            updateMovies(callback)
        }
    })
}
