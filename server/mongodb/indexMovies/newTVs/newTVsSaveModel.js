/**
 * Created by 包俊 on 2017/7/20.
 */
let dbConstans = require('./newTVsCon.js')
let dyjy = require('../../../javascripts/targetWeb/dyjy/dyjyUtils.js')
let query = require('../../queryUtils.js')
let db;

exports.getNewTVs = function (callback) {
    getNewTVs(callback)
}

// getNewTVs(function () {

// })

function getNewTVs(next) {
    db = dbConstans.NewTVsDB();
    db.on('error', console.error.bind(console, '连接错误:'));
    dyjy.newTVs((doc) => {
        // console.log(doc)
        if (doc.status.code == 1) {
            saveAllData(dbConstans, doc.movies, function () {
                db.close()
                next()
            })
        } else {
            getNewTVs(next)
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
            let model = dbConstans.getModel(db, index)
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
                            }
                            if (i >= data.movies.movies.length - 1) {
                                console.log(data.type + '更新完成！');
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

