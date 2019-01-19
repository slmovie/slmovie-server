/**
 * Created by 包俊 on 2017/3/27.
 */
let dbConstans = require("../../spider/dyjy/detail/detailCon.js");

//根据id查找电影
exports.findOneByID = function (id, send) {
  const db = dbConstans.MoviesDB();
  db.on("error", console.error.bind(console, "连接错误:"));

  dbConstans.MovieModel(db).findOne({ id: id }, function (error, doc) {
    if (error || doc == null) {
      send(0);
    } else {
      send(doc);
    }
    db.close();
  });
};

exports.findOneByDoubanID = function (id, send) {
  const db = dbConstans.MoviesDB();
  db.on("error", console.error.bind(console, "连接错误:"));

  dbConstans.MovieModel(db).findOne({ doubanID: id }, function (error, doc) {
    if (error || doc == null) {
      send(0);
    } else {
      send(doc);
    }
    db.close();
  });
};

exports.findByName = (name, callback) => {
  findByName(name, callback);
};

//根据电影名查找
// exports.findByName = function findByName(name, callback) {
const findByName = (name, callback) => {
  const db = dbConstans.MoviesDB();
  let movies = {};
  db.on("error", console.error.bind(console, "连接错误:"));

  dbConstans.MovieModel(db).find({ $or: [{ name: name }, { "details.otherName": name }] }, null, { sort: { "_id": -1 }}, function (error, docs) {
    if (error || docs == null) {
      console.log(error);
    } else {
      movies = docs;
      callback(movies);
    }
    db.close();
  });
};

exports.findAll = function (name, callback) {
  findAll(name, callback);
};

//全局搜索
// exports.findAll = function findAll(name, callback) {
const findAll = (name, callback) => {
  const db = dbConstans.MoviesDB();
  db.on("error", console.error.bind(console, "连接错误:"));

  // dbConstans.MovieModel.find({$or: [{name: name}, {'details.otherName': name}]}, null, {sort: {'_id': -1}}, function (error, docs) {
  dbConstans.MovieModel(db).find({ detail: name }, null, { sort: { "_id": -1 }}, function (error, docs) {
    if (error || docs == null) {
      console.log(error);
    } else {
      console.log(docs.length);
      callback(docs);
    }
    db.close();
  });
};

// function find(name) {
//     var qs = new RegExp(name);
//     findByName(qs, function (data) {
//         console.log(data)
//     })
// }

// find('我')
