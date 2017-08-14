/**
 * Created by BaoJun on 2017/2/11.
 */
let express = require('express');
let router = express.Router();

const dyjy = require('../javascripts/targetWeb/dyjy/dyjyUtils.js')
const tiantangbt = require('../javascripts/targetWeb/tiantangbt.js')
const timeText = require('../javascripts/utils/timeTest.js')
const dbQuery = require('../mongodb/queryUtils.js')

router.get('/all', function (req, res) {
    res.movies = {}
    res.movies['status'] = {'code': 0}
    res.movies['movies'] = []
    let qs = new RegExp(req.query.name);
    dbQuery.findAll(qs, function (data) {
        // console.log('dyjy back  ' + timeText.time())
        // console.log(data)
        res.movies['status'].code = 1
        res.movies['movies'] = data
        res.json(res.movies)
    })
});

router.get('/dyjy', function (req, res) {
    console.log("search>>>>>" + req.query.name)
    let qs = new RegExp(req.query.name);
    res.movies = {}
    res.movies['status'] = {'code': 0}
    res.movies['movies'] = []
    dbQuery.findAll(qs, function (data) {
        // console.log('dyjy back  ' + timeText.time())
        // console.log(data)
        res.movies['status'].code = 1
        res.movies['movies'] = data
        res.json(res.movies)
    })
});

router.get('/ttbt', function (req, res) {
    timeText.start()
    tiantangbt.queryTitle(req.query.name, function (data) {
        // console.log('ttbt query>>' + req.query.name)
        // console.log('ttbt time>>' + timeText.time())
        // console.log('ttbt data>>', data)
        res.json(data)
    })
})

module.exports = router;