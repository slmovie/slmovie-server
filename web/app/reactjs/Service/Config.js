/**
 * Created by BaoJun on 2017/2/23.
 */
import Constans from './Constans.js';

exports.WebRoot = function () {
    if (Constans.service == 'T') {
        return 'http://localhost:3000'
    } else if (Constans.service == 'P') {
        return ''
    }
}