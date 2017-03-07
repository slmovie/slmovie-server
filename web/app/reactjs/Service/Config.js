/**
 * Created by BaoJun on 2017/2/23.
 */
import Constans from './Constans.js';

exports.WebRoot = function () {
    if (Constans.service == 'T') {
        return 'http://localhost:3000'
    } else if (Constans.service == 'P') {
        return 'http://45.32.41.169:3000'
    }
}

exports.Log = function (name, str) {
    if (Constans.log) {
        console.log(name + '>>>>>>' + str)
    }
}

exports.error = function (name, error) {
    if (Constans.error) {
        console.error(name + '>>>>>>' + error)
    }
}