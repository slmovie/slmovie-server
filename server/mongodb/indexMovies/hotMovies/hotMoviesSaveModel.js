/**
 * Created by 包俊 on 2017/7/20.
 */
let dbConstans = require('./hotMoviesCon.js')
let dyjy = require('../../../javascripts/targetWeb/dyjy/dyjyUtils.js')
let query = require('../../queryUtils.js')

exports.getHotMovies = function (callback) {
    getHotMovies(callback)
}

// getHotMovies(function () {

// })

function getHotMovies(next) {
    const db = dbConstans.HotMovieDB();
    db.on('error', console.error.bind(console, '连接错误:'));
    dyjy.hotMovies((doc) => {
        //     console.log(doc)
        // console.log('code>>>>>>' + doc.status.code)
        if (doc.status.code == 1) {
            dbConstans.HotMoviesModel(db).remove({}, function (err) {
                console.log('HotMovies collection removed')
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
                        movies['details'] = result.details
                        dbConstans.HotMoviesModel(db).create(movies, function (error) {
                            if (error) {
                                console.log(error);
                            }
                            if (i >= doc.movies.length - 1) {
                                console.log('热门电影更新完成！');
                                db.close()
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