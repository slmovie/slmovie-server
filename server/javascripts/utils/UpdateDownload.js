/**
 * Created by 包俊 on 2018/5/28.
 */
const xunlei = require("./XunLeiTransfer.js")
let dbConstans = require('../../mongodb/dbConstans.js')
let dbQuery = require('../../mongodb/queryUtils.js')

start()

function start() {
    let length = 0
    put(length, () => {
        console.log("finish")
    })
}

function put(id, callback) {
    setData(id, (doc) => {
        if (doc != 0)
            dbConstans.MovieModel.update({id: id}, {$set: doc}, function (err) {
                if (err) {
                    console.log(id + "更新失败")
                } else {
                    console.log(id + "更新成功")
                }
                put(id + 1, callback)
            })
        else
            put(id + 1, callback)
    })
}

function setData(id, callback) {
    dbQuery.findOneByID(id, function (doc) {
        if (doc != 0 && doc.files.length > 0) {
            console.log(id + "开始更新")
            for (let i = 0; i < doc.files.length; i++) {
                var data = doc.files[i].download
                if (data != "" && data != undefined)
                    xunlei.transfer(doc.files[i].download, (url) => {
                        doc.files[i].download = url
                        console.log(url)
                    })
            }
            callback(doc)
        } else {
            callback(0)
            console.log(id + "无数据")
        }
    })
}