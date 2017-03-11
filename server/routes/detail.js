/**
 * Created by BaoJun on 2017/2/11.
 */
var express = require('express');
var router = express.Router();

const dyjy = require('../javascripts/targetWeb/dyjy.js')
const bttt = require('../javascripts/targetWeb/bttt.js')
const tiantangbt = require('../javascripts/targetWeb/tiantangbt.js')

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