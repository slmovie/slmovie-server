/**
 * Created by 包俊 on 2017/7/7.
 */
let dbConstans = require('./indexDBConstans')
let dyjy = require('../../javascripts/targetWeb/dyjy.js')

exports.updateIndex = function () {
    getAll()
}

// getAll()

function getAll() {
    getHotMovies(function () {
        getNewMovies(function () {
            getNewTVs(function () {
                console.log('index update finish')
            })
        })
    })
}

function getHotMovies(next) {
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
                    dbConstans.HotMoviesModel.create(movies, function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(movies.name + '>>>saved OK!');
                        }
                    })
                }
                next()
            });
        } else {
            getHotMovies(next)
        }
    })
}

function getNewMovies(next) {
    dbConstans.db.on('error', console.error.bind(console, '连接错误:'));
    dbConstans.db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });
    dyjy.newMovies((doc) => {
        console.log(doc)
        console.log('code>>>>>>' + doc.status.code)
        if (doc.status.code == 1) {
            dbConstans.NewMoviesModel.remove({}, function (err) {
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
                    dbConstans.NewMoviesModel.create(movies, function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(movies.name + '>>>saved OK!');
                        }
                    })
                }
                next()
            });
        } else {
            getHotMovies(next)
        }
    })
}

function getNewTVs(next) {
    dbConstans.db.on('error', console.error.bind(console, '连接错误:'));
    dbConstans.db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });
    dyjy.newMovies((doc) => {
        console.log(doc)
        console.log('code>>>>>>' + doc.status.code)
        if (doc.status.code == 1) {
            dbConstans.NewTVsModel.remove({}, function (err) {
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
                    dbConstans.NewTVsModel.create(movies, function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(movies.name + '>>>saved OK!');
                        }
                        dbConstans.db.close()
                    })
                }
                next()
            });
        } else {
            getHotMovies(next)
        }
    })
}
