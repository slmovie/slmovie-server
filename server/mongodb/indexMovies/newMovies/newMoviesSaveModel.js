/**
 * Created by 包俊 on 2017/7/20.
 */

let dbConstans = require('./newMoviesCon.js')
let dyjy = require('../../../javascripts/targetWeb/dyjy/dyjyUtils.js')
let mongoose = require('mongoose');
let Constans = require('../../Constans.js')
let query = require('../../queryUtils.js')

exports.getNewMovies = function (callback) {
    getNewMovies(callback)
}

function getNewMovies(next) {
    dbConstans.db = mongoose.createConnection(Constans.WebRoot(), 'newMovies')
    dbConstans.db.on('error', console.error.bind(console, '连接错误:'));
    dbConstans.db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });
    dyjy.newMovies((doc) => {
        if (doc.status.code == 1) {
            saveAllData(dbConstans, doc.movies, function () {
                dbConstans.db.close()
                next()
            })
        } else {
            getNewMovies(next)
        }
    })
}

function saveAllData(dbConstans, doc, callback) {
    save(dbConstans, 0, doc, callback)
}

function save(dbConstans, index, doc, next) {
    if (index < doc.length) {
        let data = doc[index]
        if (data.movies.status.code == 1) {
            let model = dbConstans.getModel(index)
            model.remove({}, function (err) {
                // console.log('collection removed')
                for (let i = 0; i < data.movies.movies.length; i++) {
                    let movie = data.movies.movies[i]
                    let movies = {
                        name: movie.name,
                        address: movie.address,
                        post: movie.post,
                        douban: movie.douban,
                        year: movie.year,
                        type: doc.type,
                        index: doc.index,
                    }
                    query.findOneByID(movie.address, (result) => {
                        movies['details'] = result.details
                        model.create(movies, function (error) {
                            if (error) {
                                console.log(error);
                            } else {
                                // console.log(movies.name + '>>>saved OK!');
                            }
                            if (i >= data.movies.movies.length - 1) {
                                save(dbConstans, index + 1, doc, next)
                            }
                        })
                    })
                }
            });
        }
    } else {
        next()
    }
}

