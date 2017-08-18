/**
 * Created by 包俊 on 2017/3/27.
 */
let mongoose = require('mongoose')    //引用mongoose模块
let Constans = require('./Constans.js')
let db = mongoose.createConnection(Constans.WebRoot() + "/" + 'movies') //创建一个数据库连接


let MovieSchema
let MovieModel

let movieFiles = new mongoose.Schema({
    name: String,
    download: String,
    fileSize: String,
})

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
    post: String,
    describe: String,
    detail: [String],
    details: details,
    files: [movieFiles],
    id: String,
})

MovieModel = db.model('Movie', MovieSchema)

exports.MovieModel = MovieModel