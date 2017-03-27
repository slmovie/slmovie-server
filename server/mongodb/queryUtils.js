/**
 * Created by 包俊 on 2017/3/27.
 */
let mongoose = require('mongoose');    //引用mongoose模块
let db = mongoose.createConnection('localhost', 'movies'); //创建一个数据库连接
let dbConstans = require('./dbConstans.js')

//根据id查找电影
exports.findOneByID = function (id, send) {
    db.on('error', console.error.bind(console, '连接错误:'));
    db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });

    dbConstans.MovieModel.findOne({id: id}, function (error, doc) {
        if (error || doc == null) {
            send(0)
        } else {
            send(doc)
        }
        db.close()
    })
}

//根据电影名查找
// exports.findByName = function findByName(name) {
function findByName(name) {
    db.on('error', console.error.bind(console, '连接错误:'));
    db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });

    dbConstans.MovieModel.find({name: name}, function (error, docs) {
        if (error || docs == null) {
            console.log(error)
        } else {
            console.log(docs)
        }
        db.close()
    })
}

findByName(/场/)