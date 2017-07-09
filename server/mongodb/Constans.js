/**
 * Created by 包俊 on 2017/7/9.
 */

let service = 'T'

exports.WebRoot = function () {
    if (service == 'T') {
        return 'localhost'
    } else if (service == 'P') {
        return '45.32.41.169'
    }
}