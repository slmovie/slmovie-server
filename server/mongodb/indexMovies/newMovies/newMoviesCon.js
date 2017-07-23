/**
 * Created by 包俊 on 2017/7/20.
 */
let mongoose = require('mongoose');    //引用mongoose模块
let Constans = require('../../Constans.js')
let db = mongoose.createConnection(Constans.WebRoot(), 'newMovies') //创建一个数据库连接
let MovieSchema
let NewMoviesModel, ActionMovieModel, ComedyModel, LoveMovieModel, ScienceMovieModel, HorrorMovieModel, DramaMovieModel,
    WarMovieModel
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
    details:details,
})

NewMoviesModel = db.model('newmovie', MovieSchema)
ActionMovieModel = db.model('actionmovie', MovieSchema)
ComedyModel = db.model('comedy', MovieSchema)
LoveMovieModel = db.model('lovemovie', MovieSchema)
ScienceMovieModel = db.model('sciencemovie', MovieSchema)
HorrorMovieModel = db.model('horrormovie', MovieSchema)
DramaMovieModel = db.model('dramamovie', MovieSchema)
WarMovieModel = db.model('warmovie', MovieSchema)

exports.NewMoviesModel = NewMoviesModel
exports.ActionMovieModel = ActionMovieModel
exports.ComedyModel = ComedyModel
exports.LoveMovieModel = LoveMovieModel
exports.ScienceMovieModel = ScienceMovieModel
exports.HorrorMovieModel = HorrorMovieModel
exports.DramaMovieModel = DramaMovieModel
exports.WarMovieModel = WarMovieModel
exports.db = db

//获取对应model
exports.getModel = (index) => {
    if (index == 0) {
        return NewMoviesModel
    } else if (index == 1) {
        return ActionMovieModel
    } else if (index == 2) {
        return ComedyModel
    } else if (index == 3) {
        return LoveMovieModel
    } else if (index == 4) {
        return ScienceMovieModel
    } else if (index == 5) {
        return HorrorMovieModel
    } else if (index == 6) {
        return DramaMovieModel
    } else if (index == 7) {
        return WarMovieModel
    }
}