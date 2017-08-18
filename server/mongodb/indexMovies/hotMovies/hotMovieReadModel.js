/**
 * Created by 包俊 on 2017/7/20.
 */
let mongoose = require('mongoose');
let Constans = require('../../Constans.js')
let dbConstans = require('./hotMoviesCon.js')
let callbackUtils = require('../../../javascripts/res/callbackUtils.js')

exports.findHotMovies = (callback) => {
    findHotMovies(callback)
}

function findHotMovies(callback) {
    dbConstans.db = mongoose.createConnection(Constans.WebRoot() + "/" + 'hotMovies')
    dbConstans.db.on('error', console.error.bind(console, '连接错误:'));
    dbConstans.db.once('open', function () {
        //一次打开记录
        // console.log('opened')
    });
    dbConstans.HotMoviesModel.find({name: {$exists: true}}, function (error, docs) {
        if (error || docs == null || docs.length < 1) {
            console.log(error)
            callback(callbackUtils.errorRes(error))
        } else {
            callback(callbackUtils.rightRes(docs))
        }
        dbConstans.db.close()
    })

}