/**
 * Created by 包俊 on 2017/7/9.
 */
exports.rightRes = function (docs) {
    let callBack = {}
    let status = {}
    status['code'] = 1
    callBack['status'] = status
    callBack['movies'] = docs
    return callBack
}

exports.errorRes = function (error) {
    let callBack = {}
    let status = {}
    status['code'] = 0
    status['error'] = error
    callBack['status'] = status
    return callBack
}