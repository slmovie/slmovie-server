/**
 * Created by BaoJun on 2017/2/11.
 */
let superagent = require('superagent')
const charset = require('superagent-charset')
superagent = charset(superagent);
module.exports = function () {
    return superagent
}
