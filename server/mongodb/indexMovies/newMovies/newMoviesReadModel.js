/**
 * Created by 包俊 on 2017/7/20.
 */
let dbConstans = require('./newMoviesCon.js')
let callbackUtils = require('../../../javascripts/res/callbackUtils.js')

exports.findNewMovies = (index, callback) => {
    findNewMovies(index, callback)
}

// findNewMovies(0, (doc) => {
//     console.log(doc)
// })

function findNewMovies(index, callback) {
    const db = dbConstans.NewMovieDB();
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