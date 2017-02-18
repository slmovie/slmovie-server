/**
 * Created by BaoJun on 2017/2/11.
 */
let express = require('express');
let router = express.Router();

const dyjy = require('../app/javascripts/targetWeb/dyjy.js')
const bttt = require('../app/javascripts/targetWeb/bttt.js')
const btttla = require('../app/javascripts/targetWeb/btttla.js')
const timeText = require('../app/javascripts/utils/timeTest.js')

router.get('/all', function (req, res, next) {
    timeText.start()
    console.log('all into  ' + timeText.time())
    res.movies = {}
    dyjy.queryTitle(req.query.name, function (data) {
        console.log('dyjy back  ' + timeText.time())
        res.movies['dyjy'] = (data)
        next()
    })
    // res.json('{"dyjy":{"status":{"code":1},"movies":[{"name":"港囧","address":"http://www.imp4la.com/sub/13167.html","post":"http://pic.imp4la.com/pic/uploadimg/2016-6/13167.jpg","db":"5.8分","year":"2015"},{"name":"人再囧途之泰囧","address":"http://www.imp4la.com/sub/2240.html","post":"http://pic.imp4la.com/pic/uploadimg/2016-6/2240.jpg","db":"7.5分","year":"2012"}]},"bttt":{"status":{"code":1},"movies":[{"name":"港囧.2015","address":"http://www.bttt99.com/v/20310/","post":"http://pic.bttt99.com:8080/vpic/16Nov2015235709.jpg","db":"6.1","year":"2015"},{"name":"人再囧途之泰囧.2012","address":"http://www.bttt99.com/v/11657/","post":"http://pic.bttt99.com:8080/vpic/20Dec2012200503.jpg","db":"8.4","year":"2012"}]}}')
}, function (req, res, next) {
    bttt.queryTitle(req.query.name, function (data) {
        console.log('bttt back  ' + timeText.time())
        res.movies['bttt'] = (data)
        next()
    })
}, function (req, res, next) {
    res.json(JSON.stringify(res.movies))
});

router.get('/dyjy', function (req, res) {
    timeText.start()
    dyjy.queryTitle(req.query.name, function (data) {
        console.log('dyjy query>>' + req.query.name)
        console.log('dyjy time>>' + timeText.time())
        console.log('dyjy data>>', data)
        res.json(data)
    })
});

router.get('/bttt', function (req, res) {
    timeText.start()
    bttt.queryTitle(req.query.name, function (data) {
        console.log('bttt query>>' + req.query.name)
        console.log('bttt time>>' + timeText.time())
        console.log('bttt data>>', data)
        res.json(data)
    })
});

router.get('/btttla', function (req, res) {
    btttla.queryTitle(req, res)
});

module.exports = router;