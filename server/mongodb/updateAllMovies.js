/**
 * Created by 包俊 on 2017/3/27.
 */
let mongoose = require('mongoose');    //引用mongoose模块
let db = mongoose.createConnection('localhost', 'movies'); //创建一个数据库连接
let dyjy = require('../javascripts/targetWeb/dyjy.js')
let dbConstans = require('./dbConstans.js')
let dbQuery = require('./queryUtils.js')

function update() {
    db.on('error', console.error.bind(console, '连接错误:'));
    db.once('open', function () {
        //一次打开记录
        console.log('opened')
    });

    dyjy.movieLength(function (data) {
        console.log('总量' + data)
        if (data != '0') {
            let length = new Number(data)
            get(length, 2)
        } else {
            db.close()
        }
    })
}

function get(length, id) {
    if (id <= length) {
        dyjy.getData(id + '', function (data) {
            if (data.status.code == 1) {
                let movie = {
                    name: data.movies.name,
                    post: data.movies.post,
                    describe: data.movies.describe,
                    detail: data.movies.detail,
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
                            get(length, id + 1)
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
                                    console.log(id + ' ' + data.movies.name + '>>>更新失败')
                                } else {
                                    console.log(id + ' ' + data.movies.name + '>>>更新成功')
                                }
                                get(length, id + 1)
                            })
                        } else {
                            console.log(id + ' ' + data.movies.name + '>>>没有更新')
                            get(length, id + 1)
                        }
                    }
                })
            }
        })
    } else {
        // 关闭数据库链接
        db.close();
    }
}

update()