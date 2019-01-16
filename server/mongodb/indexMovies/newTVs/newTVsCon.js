/**
 * Created by 包俊 on 2017/7/20.
 */
let mongoose = require('mongoose');    //引用mongoose模块
let Constans = require('../../Constans.js')

const details = new mongoose.Schema({
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

const MovieSchema = new mongoose.Schema({
    name: String,
    address: String,
    post: String,
    douban: String,
    year: String,
    type: String,
    index: Number,
    details: details,
})

exports.NewTVsDB = () => {
    return mongoose.createConnection(Constans.WebRoot() + "/" + 'newtvs', { useNewUrlParser: true });
}

//获取对应model
exports.getModel = (db, index) => {
    if (index == 0) {
        return db.model('newtv', MovieSchema)
    } else if (index == 1) {
        return db.model('chinatv', MovieSchema)
    } else if (index == 2) {
        return db.model('hongtaitv', MovieSchema)
    } else if (index == 3) {
        return db.model('westentv', MovieSchema)
    } else if (index == 4) {
        return db.model('japankoreatv', MovieSchema)
    }
}