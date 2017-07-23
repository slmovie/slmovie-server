/**
 * Created by 包俊 on 2017/7/20.
 */
let mongoose = require('mongoose');
let Constans = require('../../Constans.js')
let dbConstans = require('./newTVsCon.js')
let callbackUtils = require('../../../javascripts/res/callbackUtils.js')

exports.findNewTVs = (index, callback) => {
    findNewTVs(index, callback)
}

findNewTVs(1, (doc) => {
    console.log(doc)
})

function findNewTVs(index, callback) {
    dbConstans.db = mongoose.createConnection(Constans.WebRoot(), 'newtvs')
    dbConstans.db.on('error', console.error.bind(console, '连接错误:'));
    dbConstans.db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });
    dbConstans.getModel(index).find({name: {$exists: true}}, function (error, docs) {
        if (error || docs == null || docs.length < 1) {
            console.log(error)
            callback(callbackUtils.errorRes(error))
        } else {
            callback(callbackUtils.rightRes(docs))
        }
        dbConstans.db.close()
    })

}