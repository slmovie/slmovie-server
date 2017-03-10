/**
 * Created by BaoJun on 2017/2/11.
 */
var express = require('express');
var router = express.Router();

const dyjy = require('../javascripts/targetWeb/dyjy.js')
const bttt = require('../javascripts/targetWeb/bttt.js')
const btttla = require('../javascripts/targetWeb/btttla.js')

router.get('/dyjy', function (req, res) {
    dyjy.detail(req, res)
});

router.get('/bttt', function (req, res) {
    bttt.detail(req, res)
});

router.get('/btttla', function (req, res) {
    btttla.detail(req, res)
});

module.exports = router;