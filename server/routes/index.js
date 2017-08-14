/**
 * Created by BaoJun on 2017/3/6.
 */
var express = require('express');
var router = express.Router();

const dyjy = require('../javascripts/targetWeb/dyjy/dyjyUtils.js')
const readIndexMovies = require('../mongodb/indexMovies/readIndexMovies.js')

router.get('/recommend', function (req, res, next) {
    console.log("index open once")
    res.movies = {}
    dyjy.hotMovies(function (data) {
        res.movies['hotMovies'] = (data)
        next()
    })

}, function (req, res, next) {
    dyjy.newMovies(function (data) {
        res.movies['newMovies'] = (data)
        next()
    })
}, function (req, res, next) {
    dyjy.newTVs(function (data) {
        res.movies['newTVs'] = (data)
        next()
    })
}, function (req, res, next) {
    res.json(res.movies)
})

router.get('/hotMovies', function (req, res) {
    // let movies = {}
    // dyjy.hotMovies(function (data) {
    //     movies = (data)
    //     res.json(movies)
    // })
    console.log("index open once")
    readIndexMovies.findHotMovies(function (docs) {
        // console.error(docs)
        res.json(docs)
    })
})

router.get('/newMovies', function (req, res) {
    // let movies = {}
    // dyjy.newMovies(function (data) {
    //     movies = (data)
    //     res.json(movies)
    // })
    readIndexMovies.findNewMovies(req.query.index, (docs) => {
        // console.error(docs)
        res.json(docs)
    })
})

router.get('/newTVs', function (req, res) {
    // let movies = {}
    // dyjy.newTVs(function (data) {
    //     movies = (data)
    //     res.json(movies)
    // })
    readIndexMovies.findNewTVs(req.query.index, (docs) => {
        // console.error(docs)
        res.json(docs)
    })
})

module.exports = router;