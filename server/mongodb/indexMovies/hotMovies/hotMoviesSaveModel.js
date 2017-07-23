/**
 * Created by 包俊 on 2017/7/20.
 */
let dbConstans = require('./hotMoviesCon.js')
let dyjy = require('../../../javascripts/targetWeb/dyjy/dyjyUtils.js')
let mongoose = require('mongoose');
let Constans = require('../../Constans.js')
let query = require('../../queryUtils.js')

exports.getHotMovies = function (callback) {
    getHotMovies(callback)
}

function getHotMovies(next) {
    dbConstans.db = mongoose.createConnection(Constans.WebRoot(), 'hotMovies')
    dbConstans.db.on('error', console.error.bind(console, '连接错误:'));
    dbConstans.db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });
    dyjy.hotMovies((doc) => {
        console.log(doc)
        console.log('code>>>>>>' + doc.status.code)
        if (doc.status.code == 1) {
            dbConstans.HotMoviesModel.remove({}, function (err) {
                console.log('collection removed')
                for (let i = 0; i < doc.movies.length; i++) {
                    let movie = doc.movies[i]
                    let movies = {
                        name: movie.name,
                        address: movie.address,
                        post: movie.post,
                        douban: movie.douban,
                        year: movie.year
                    }
                    query.findOneByID(movie.address, (result) => {
                        movies['details']=result.details
                        dbConstans.HotMoviesModel.create(movies, function (error) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(movies.name + '>>>saved OK!');
                            }
                            if (i >= doc.movies.length - 1) {
                                dbConstans.db.close()
                            }
                        })
                    })
                }
                next()
            });
        } else {
            getHotMovies(next)
        }
    })
}