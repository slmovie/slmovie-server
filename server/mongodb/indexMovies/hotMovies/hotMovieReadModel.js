/**
 * Created by 包俊 on 2017/7/20.
 */
let dbConstans = require("../../../../spider/dyjy/home/homeCon.js");
let callbackUtils = require("../../../javascripts/res/callbackUtils.js");

exports.findHotMovies = (callback) => {
  findHotMovies(callback);
};

// findHotMovies((doc => {
//     console.log(doc)
// }))

function findHotMovies(callback) {
  const db = dbConstans.HotMovieDB();
  db.on("error", console.error.bind(console, "连接错误:"));
  dbConstans.HotMoviesModel(db).find({ name: { $exists: true }}, function (error, docs) {
    if (error || docs == null || docs.length < 1) {
      console.log(error);
      callback(callbackUtils.errorRes(error));
    } else {
      callback(callbackUtils.rightRes(docs));
    }
    db.close();
  });

}