/**
 * Created by 包俊 on 2017/7/20.
 */
let mongoose = require('mongoose');    //引用mongoose模块
let Constans = require('../../Constans.js')
let db = mongoose.createConnection(Constans.WebRoot(), 'hotMovies') //创建一个数据库连接
let MovieSchema
let HotMoviesModel

let details = new mongoose.Schema({
    name: String,
    year: String,
    location: String,
    type: String,
    actor: String,
    director: String,
    otherName: String,
    IMDB: String,
    status: String,
    TV: Boolean,
})

MovieSchema = new mongoose.Schema({
    name: String,
    address: String,
    post: String,
    douban: String,
    year: String,
    details: details,
})

HotMoviesModel = db.model('hotmovie', MovieSchema)

exports.HotMoviesModel = HotMoviesModel
exports.db = db