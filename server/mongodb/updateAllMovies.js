/**
 * Created by 包俊 on 2017/3/27.
 */
let mongoose = require('mongoose');    //引用mongoose模块
let Constans = require('./Constans.js')
let db = mongoose.createConnection(Constans.WebRoot() + "/" + "movies") //创建一个数据库连接
let dyjy = require('../javascripts/targetWeb/dyjy/dyjyUtils.js')
let dbConstans = require('./dbConstans.js')
let dbQuery = require('./queryUtils.js')

exports.update = function (length, callback) {
    update(length, callback)
}

//type:0全量更新 1部分更新
function update(type, callback) {
    db.on('error', console.error.bind(console, '连接错误:'));
    db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });
    dyjy.movieLength((length) => {
        console.log('总量' + length)
        if (length != 0) {
            let number = 0
            if (type == 0) {
                number = 1
            } else {
                // number = 0
                // number = length - 2000
                number = 10000
            }
            get2(length, number, function () {
                callback(1)
            })
        } else {
            callback(0)
            db.close()
        }
    })
}

function get(length, id, callback) {
    if (id <= length) {
        dyjy.getData(id + '', true, function (data) {
            if (data.status.code == 1) {
                let movie = {
                    name: data.movies.name,
                    post: data.movies.post,
                    describe: data.movies.describe,
                    detail: data.movies.detail,
                    details: data.movies.details,
                    files: data.movies.files,
                    id: id + '',
                }
                //查询数据库数据
                dbQuery.findOneByID(id, function (doc) {
                    if (doc == 0) {
                        //数据库不存在该数据，插入新数据
                        dbConstans.MovieModel.create(movie, function (error) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(id + ' ' + data.movies.name + '>>>saved OK!');
                            }
                            get(length, id + 1, callback)
                        })
                    } else {
                        //数据库存在该电影，对比是否有更新
                        let update = false
                        if (doc.files.length == data.movies.files.length) {
                            for (let i = 0; i < doc.files.length; i++) {
                                if (doc.files[i].download != data.movies.files[i].download) {
                                    update = true
                                }
                            }
                        } else {
                            update = true
                        }

                        if (update) {
                            dbConstans.MovieModel.update({id: id}, {$set: movie}, function (err) {
                                if (err) {
                                    // console.log(id + ' ' + data.movies.name + '>>>更新失败')
                                } else {
                                    console.log(id + ' ' + data.movies.name + '>>>更新成功')
                                }
                                get(length, id + 1, callback)
                            })
                        } else {
                            console.log(id + ' ' + data.movies.name + '>>>没有更新')
                            get(length, id + 1, callback)
                        }
                        movie = null;
                    }
                })
            } else {
                console.log(id + '>>>爬取失败，重试')
                get(length, id + 1, callback)
            }
        })
    } else {
        // 关闭数据库链接
        db.close();
        callback()
    }
}

//由于豆瓣有请求限制，限速
function startNext(length, id, callback) {
    get(length, id, callback)
}

function get2(length, id, callback) {
    if (id <= length) {
        //查询数据库数据
        dbQuery.findOneByID(id, function (doc) {
            let doubanData = false
            if (doc != 0) {
                var doubanID = doc.doubanID
                if (doubanID != undefined && doubanID != '' && doubanID != '0') {
                    doubanData = true
                }
            }
            //爬取数据
            dyjy.getData(id + '', doubanData, function (data) {
                if (data.status.code == 1) {
                    let movie = {
                        name: data.movies.name,
                        post: data.movies.post,
                        describe: data.movies.describe,
                        detail: data.movies.detail,
                        details: data.movies.details,
                        files: data.movies.files,
                        id: id + '',
                    }
                    if (doubanData) {
                        console.log(data.movies.name + ">>已有id>>" + doubanID)
                        movie['doubanID'] = doubanID
                    } else {
                        console.log(data.movies.name + ">>没有id")
                        movie['doubanID'] = data.movies.doubanID
                    }
                    if (doc == 0) {
                        //数据库不存在该数据，插入新数据
                        dbConstans.MovieModel.create(movie, function (error) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(id + ' ' + data.movies.name + '>>>saved OK!');
                            }
                            startNext2(doubanData, length, id + 1, callback)
                        })
                    } else {
                        let update = false
                        if (doc.files.length == data.movies.files.length) {
                            for (let i = 0; i < doc.files.length; i++) {
                                if (doc.files[i].download != data.movies.files[i].download) {
                                    update = true
                                }
                            }
                        } else {
                            update = true
                        }
                        if (!doubanData)
                            update = true
                        if (doc.describe == undefined || doc.describe == '') {
                            update = true
                            console.log('更新简介')
                        }
                        if (update) {
                            dbConstans.MovieModel.update({id: id}, {$set: movie}, function (err) {
                                if (err) {
                                    // console.log(id + ' ' + data.movies.name + '>>>更新失败')
                                } else {
                                    console.log(id + ' ' + data.movies.name + '>>>更新成功')
                                }
                                if (data.movies.doubanID == '0') {
                                    console.log(id + ' ' + data.movies.name + '>>>豆瓣请求失败')
                                    startNext2(true, length, id + 1, callback)
                                } else {
                                    startNext2(false, length, id + 1, callback)
                                }

                            })
                        } else {
                            console.log(id + ' ' + data.movies.name + '>>>没有更新')
                            startNext2(doubanData, length, id + 1, callback)
                        }
                        movie = null;
                    }
                } else {
                    console.log(id + '>>>爬取失败')
                    startNext2(true, length, id + 1, callback)
                }
            })
        })
    } else {
        // 关闭数据库链接
        db.close();
        callback()
    }
}

//由于豆瓣有请求限制，限速
function startNext2(doubanData, length, id, callback) {
    let time = 3000;
    if (doubanData)
        time = 0
    setTimeout(() => {
        get2(length, id, callback)
    }, 0)
}

function movieLength(send) {
    let number = 0
    dyjy.hotMovies(function (data) {
        if (data.status.code == 1) {
            for (let i = 0; i < data.movies.length; i++) {
                if (number < new Number(data.movies[i].address))
                    number = new Number(data.movies[i].address)
            }
            dyjy.newMovies(function (data) {
                if (data.status.code == 1) {
                    for (let i = 0; i < data.movies.length; i++) {
                        if (number < new Number(data.movies[i].address))
                            number = new Number(data.movies[i].address)
                    }
                    dyjy.newTVs(function (data) {
                        if (data.status.code == 1) {
                            for (let i = 0; i < data.movies.length; i++) {
                                if (number < new Number(data.movies[i].address))
                                    number = new Number(data.movies[i].address)
                            }
                            send(number)
                        } else {
                            send(0)
                        }
                    })
                } else {
                    send(0)
                }
            })
        } else {
            send(0)
        }
    })
}