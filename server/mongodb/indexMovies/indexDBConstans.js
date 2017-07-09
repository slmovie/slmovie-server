/**
 * Created by 包俊 on 2017/7/7.
 */
let mongoose = require('mongoose');    //引用mongoose模块
let Constans = require('../Constans.js')
let db = mongoose.createConnection(Constans.WebRoot(), 'movies') //创建一个数据库连接
let MovieSchema
let HotMoviesModel, NewTVsModel, NewMoviesModel

MovieSchema = new mongoose.Schema({
    name: String,
    address: String,
    post: String,
    douban: String,
    year: String,
})

HotMoviesModel = db.model('hotmovie', MovieSchema)
NewTVsModel = db.model('newtv', MovieSchema)
NewMoviesModel = db.model('newmovie', MovieSchema)

exports.HotMoviesModel = HotMoviesModel
exports.NewTVsModel = NewTVsModel
exports.NewMoviesModel = NewMoviesModel
exports.db = db