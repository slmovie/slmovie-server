/**
 * Created by 包俊 on 2017/7/20.
 */
let mongoose = require('mongoose');    //引用mongoose模块
let Constans = require('../../Constans.js')
let db = mongoose.createConnection(Constans.WebRoot() + '/' + 'newtvs') //创建一个数据库连接
let MovieSchema
let NewTVsModel, ChinaTVModel, HongTaiTVModel, WestenTVModel, JapanKoreaTVModel

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
    type: String,
    index: Number,
    details: details,
})

NewTVsModel = db.model('newtv', MovieSchema)
ChinaTVModel = db.model('chinatv', MovieSchema)
HongTaiTVModel = db.model('hongtaitv', MovieSchema)
WestenTVModel = db.model('westentv', MovieSchema)
JapanKoreaTVModel = db.model('japankoreatv', MovieSchema)

exports.NewTVsModel = NewTVsModel
exports.ChinaTVModel = ChinaTVModel
exports.HongTaiTVModel = HongTaiTVModel
exports.WestenTVModel = WestenTVModel
exports.JapanKoreaTVModel = JapanKoreaTVModel
exports.db = db

//获取对应model
exports.getModel = (index) => {
    if (index == 0) {
        return NewTVsModel
    } else if (index == 1) {
        return ChinaTVModel
    } else if (index == 2) {
        return HongTaiTVModel
    } else if (index == 3) {
        return WestenTVModel
    } else if (index == 4) {
        return JapanKoreaTVModel
    }
}