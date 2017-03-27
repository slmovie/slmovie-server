/**
 * Created by 包俊 on 2017/3/25.
 */
let mongoose = require('mongoose');   //引用mongoose模块
let db = mongoose.createConnection('localhost', 'movies'); //创建一个数据库连接
let dyjy = require('../javascripts/targetWeb/dyjy.js')
let dbConstans=require('./dbConstans.js')

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {
    //一次打开记录
    console.log('opened')
});

dyjy.movieLength(function (data) {
    console.log(data)
    if (data != '0') {
        let length = new Number(data)
        get(length, 2)
    }
})

function get(length, id) {
    if (id <= length) {
        dyjy.getData(id + '', function (data) {
            console.log(id)
            if (data.status.code == 1) {
                let movie = {
                    name: data.movies.name,
                    post: data.movies.post,
                    describe: data.movies.describe,
                    detail: data.movies.detail,
                    files: data.movies.files,
                    id: id + '',
                }
                dbConstans.MovieModel.create(movie, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(id+'>>>saved OK!');
                        get(length, id + 1)
                    }
                })
            }
        })
    } else {
        // 关闭数据库链接
        db.close();
    }
}


