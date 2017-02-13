/**
 * Created by BaoJun on 2017/2/13.
 */
let time = Date.now()
exports.time = function () {
    return Date.now() - time
}

exports.start = function () {
    time = Date.now()
}