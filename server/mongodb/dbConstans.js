/**
 * Created by 包俊 on 2017/3/27.
 */
let mongoose = require('mongoose');    //引用mongoose模块
let db = mongoose.createConnection('localhost', 'movies'); //创建一个数据库连接

let MovieSchema
let MovieModel

let movieFiles = new mongoose.Schema({
    name: String,
    download: String,
    fileSize: String,
})

MovieSchema = new mongoose.Schema({
    name: String,
    post: String,
    describe: String,
    detail: [String],
    files: [movieFiles],
    id: String,
})

MovieModel = db.model('Movie', MovieSchema)

exports.MovieModel = MovieModel