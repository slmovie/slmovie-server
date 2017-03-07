/**
 * Created by BaoJun on 2017/3/6.
 */
var express = require('express');
var router = express.Router();

const dyjy = require('../app/javascripts/targetWeb/dyjy.js')

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
    dyjy.newTV(function (data) {
        res.movies['newTVs'] = (data)
        next()
    })
}, function (req, res, next) {
    res.json(res.movies)
})

module.exports = router;