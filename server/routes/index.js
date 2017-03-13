/**
 * Created by BaoJun on 2017/3/6.
 */
var express = require('express');
var router = express.Router();

const dyjy = require('../javascripts/targetWeb/dyjy.js')

router.get('/recommend', function (req, res, next) {
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
    let movies = {}
    dyjy.hotMovies(function (data) {
        movies = (data)
        res.json(movies)
    })
})

router.get('/newMovies', function (req, res) {
    let movies = {}
    dyjy.newMovies(function (data) {
        movies = (data)
        res.json(movies)
    })
})

router.get('/newTVs', function (req, res) {
    let movies = {}
    dyjy.newTVs(function (data) {
        movies = (data)
        res.json(movies)
    })
})

module.exports = router;