/**
 * Created by 包俊 on 2017/3/27.
 */
let mongoose = require('mongoose');    //引用mongoose模块
let Constans = require('./Constans.js')
let db = mongoose.createConnection(Constans.WebRoot() + "/" + 'movies')
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

exports.findByName = (name, callback) => {
    findByName(name, callback)
}

//根据电影名查找
// exports.findByName = function findByName(name, callback) {
function findByName(name, callback) {
    let movies = {}
    db.on('error', console.error.bind(console, '连接错误:'));
    db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });

    dbConstans.MovieModel.find({$or: [{name: name}, {'details.otherName': name}]}, null, {sort: {'_id': -1}}, function (error, docs) {
        if (error || docs == null) {
            console.log(error)
        } else {
            movies = docs
            callback(movies)
        }
        db.close()
    })
}

exports.findAll = function (name, callback) {
    findAll(name, callback)
}

//全局搜索
// exports.findAll = function findAll(name, callback) {
function findAll(name, callback) {
    db.on('error', console.error.bind(console, '连接错误:'));
    db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });

    // dbConstans.MovieModel.find({$or: [{name: name}, {'details.otherName': name}]}, null, {sort: {'_id': -1}}, function (error, docs) {
    dbConstans.MovieModel.find({detail: name}, null, {sort: {'_id': -1}}, function (error, docs) {
        if (error || docs == null) {
            console.log(error)
        } else {
            console.log(docs.length)
            callback(docs)
        }
        db.close()
    })
}

// function find(name) {
//     var qs = new RegExp(name);
//     findByName(qs, function (data) {
//         console.log(data)
//     })
// }
//
// find('我')
