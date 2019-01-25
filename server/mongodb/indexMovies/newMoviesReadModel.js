/**
 * Created by 包俊 on 2017/7/20.
 */
let mongoose = require("mongoose");    //引用mongoose模块
let Constans = require("../Constans.js");
let callbackUtils = require("../../javascripts/res/callbackUtils.js");

exports.findNewMovies = (index, callback) => {
  findNewMovies(index, callback);
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
  type: String,
  index: Number,
  details: details,
});

const getModel = (index) => {
  if (index === "0") {
    return "newmovie";
  } else if (index === "1") {
    return "actionmovie";
  } else if (index === "2") {
    return "comedy";
  } else if (index === "3") {
    return "lovemovie";
  } else if (index === "4") {
    return "sciencemovie";
  } else if (index === "5") {
    return "horrormovie";
  } else if (index === "6") {
    return "dramamovie";
  } else if (index === "7") {
    return "warmovie";
  }
};

const findNewMovies = (index, callback) => {
  const db = mongoose.createConnection(Constans.WebRoot() + "/newMovies", { useNewUrlParser: true });
  db.on("error", console.error.bind(console, "连接错误:"));
  db.on("open", console.log.bind(console, "opened"));
  db.model(getModel(index), MovieSchema).find({ name: { $exists: true } }, (error, docs) => {
    if (error || docs == null || docs.length < 1) {
      console.log(error);
      callback(callbackUtils.errorRes(error));
    } else {
      callback(callbackUtils.rightRes(docs));
    }
    db.close();
  });
};
