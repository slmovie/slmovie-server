/**
 * Created by BaoJun on 2017/2/11.
 */
let express = require('express');
let router = express.Router();

const dbQuery = require('../mongodb/queryUtils.js')

router.get('/all', function (req, res) {
    res.movies = {}
    res.movies['status'] = { 'code': 0 }
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

router.get('/douban', function (req, res) {
    let qs = new RegExp(req.query.name);
    res.movies = {}
    res.movies['status'] = { 'code': 0 }
    res.movies['movies'] = []
    dbQuery.findOneByDoubanID(qs, function (data) {
        res.movies['status'].code = 1
        res.movies['movies'] = data
        res.json(res.movies)
    })
})

router.get('/dyjy', function (req, res) {
    console.log("search>>>>>" + req.query.name)
    let qs = new RegExp(req.query.name);
    res.movies = {}
    res.movies['status'] = { 'code': 0 }
    res.movies['movies'] = []
    dbQuery.findAll(qs, function (data) {
        // console.log('dyjy back  ' + timeText.time())
        // console.log(data)
        res.movies['status'].code = 1
        res.movies['movies'] = data
        res.json(res.movies)
    })
});

module.exports = router;