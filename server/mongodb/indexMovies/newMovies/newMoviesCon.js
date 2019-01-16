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

exports.NewMovieDB = () => {
    return mongoose.createConnection(Constans.WebRoot() + "/" + 'newMovies', { useNewUrlParser: true });
}

//获取对应model
exports.getModel = (db, index) => {
    if (index == 0) {
        return db.model('newmovie', MovieSchema)
    } else if (index == 1) {
        return db.model('actionmovie', MovieSchema)
    } else if (index == 2) {
        return db.model('comedy', MovieSchema)
    } else if (index == 3) {
        return db.model('lovemovie', MovieSchema)
    } else if (index == 4) {
        return db.model('sciencemovie', MovieSchema)
    } else if (index == 5) {
        return db.model('horrormovie', MovieSchema)
    } else if (index == 6) {
        return db.model('dramamovie', MovieSchema)
    } else if (index == 7) {
        return db.model('warmovie', MovieSchema)
    }
}