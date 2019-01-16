/**
 * Created by 包俊 on 2017/7/20.
 */
let dbConstans = require('./newTVsCon.js')
let callbackUtils = require('../../../javascripts/res/callbackUtils.js')

exports.findNewTVs = (index, callback) => {
    findNewTVs(index, callback)
}

// findNewTVs(1, (doc) => {
//     console.log(doc)
// })

function findNewTVs(index, callback) {
    const db = dbConstans.NewTVsDB();
    db.on('error', console.error.bind(console, '连接错误:'));
    dbConstans.getModel(db, index).find({ name: { $exists: true } }, function (error, docs) {
        if (error || docs == null || docs.length < 1) {
            console.log(error)
            callback(callbackUtils.errorRes(error))
        } else {
            callback(callbackUtils.rightRes(docs))
        }
        db.close()
    })

}