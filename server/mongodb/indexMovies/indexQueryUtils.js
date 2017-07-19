/**
 * Created by 包俊 on 2017/7/9.
 */
let dbConstans = require('./indexDBConstans')
let mongoose = require('mongoose');
let callbackUtils = require('../../javascripts/res/callbackUtils.js')

function findHotMovies(callback) {
    dbConstans.db.on('error', console.error.bind(console, '连接错误:'));
    dbConstans.db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });
    dbConstans.HotMoviesModel.find({name: {$exists: true}}, function (error, docs) {
        if (error || docs == null || docs.length < 1) {
            console.log(error)
            callback(callbackUtils.errorRes(error))
        } else {
            callback(callbackUtils.rightRes(docs))
        }
    })

}

function findNewMovies(callback) {
    dbConstans.db.on('error', console.error.bind(console, '连接错误:'));
    dbConstans.db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });
    dbConstans.NewMoviesModel.find({name: {$exists: true}}, function (error, docs) {
        if (error || docs == null || docs.length < 1) {
            console.log(error)
            callback(callbackUtils.errorRes(error))
        } else {
            callback(callbackUtils.rightRes(docs))
        }
    })
}

function findNewTVs(callback) {
    dbConstans.db.on('error', console.error.bind(console, '连接错误:'));
    dbConstans.db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });
    dbConstans.NewTVsModel.find({name: {$exists: true}}, function (error, docs) {
        if (error || docs == null || docs.length < 1) {
            console.log(error)
            callback(callbackUtils.errorRes(error))
        } else {
            callback(callbackUtils.rightRes(docs))
        }
    })
}

exports.findHotMovies = function (callback) {
    findHotMovies(callback)
}

exports.findNewMovies = function (callback) {
    findNewMovies(callback)
}

exports.findNewTVs = function (callback) {
    findNewTVs(callback)
}