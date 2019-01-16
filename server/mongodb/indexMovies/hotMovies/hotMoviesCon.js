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
    details: details,
})

exports.HotMovieDB = () => {
    return mongoose.createConnection(Constans.WebRoot() + "/" + 'hotMovies', { useNewUrlParser: true });
}

exports.HotMoviesModel = (db) => {
    return db.model('hotmovie', MovieSchema);
}
