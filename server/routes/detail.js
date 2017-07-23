/**
 * Created by BaoJun on 2017/2/11.
 */
var express = require('express');
var router = express.Router();
let queryUtils = require('../mongodb/queryUtils.js')

const dyjy = require('../javascripts/targetWeb/dyjy/dyjyUtils.js')
const bttt = require('../javascripts/targetWeb/bttt.js')
const tiantangbt = require('../javascripts/targetWeb/tiantangbt.js')

router.get('/', function (req, res) {
    queryUtils.findOneByID(req.query.code, function (doc) {
        console.log(doc)
        let status = {}
        let callBack = {}
        status['code'] = 1
        callBack['status'] = status
        callBack['movies'] = doc
        res.json(callBack)
    })
})

router.get('/dyjy', function (req, res) {
    dyjy.detail(req, res)
});

router.get('/bttt', function (req, res) {
    bttt.detail(req, res)
});

router.get('/ttbt', function (req, res) {
    tiantangbt.detail(req, res)
})

module.exports = router;