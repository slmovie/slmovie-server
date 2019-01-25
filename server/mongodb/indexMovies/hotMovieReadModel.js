/**
 * Created by 包俊 on 2017/7/20.
 */
let mongoose = require("mongoose");    //引用mongoose模块
let Constans = require("../Constans.js");
let callbackUtils = require("../../javascripts/res/callbackUtils.js");

exports.findHotMovies = (callback) => {
  findHotMovies(callback);
};

const details = new mongoose.Schema({
  name: String,
  year: String,
  location: String,
  type: String,
  actor: String,
  director: String,
  otherName: String,
  IMDB: String,
  status: String,
  TV: Boolean,
});

const MovieSchema = new mongoose.Schema({
  name: String,
  address: String,
  post: String,
  douban: String,
  year: String,
  details: details,
});

const findHotMovies = (callback) => {
  const db = mongoose.createConnection(Constans.WebRoot() + "/hotMovies", { useNewUrlParser: true });
  db.on("error", console.error.bind(console, "连接错误:"));
  db.model("hotmovie", MovieSchema).find({ name: { $exists: true }}, function (error, docs) {
    if (error || docs == null || docs.length < 1) {
      console.log(error);
      callback(callbackUtils.errorRes(error));
    } else {
      callback(callbackUtils.rightRes(docs));
    }
    db.close();
  });
};

// findHotMovies(doc => {
//   console.log(doc);
// });
