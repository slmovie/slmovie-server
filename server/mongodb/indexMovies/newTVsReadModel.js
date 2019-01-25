/**
 * Created by 包俊 on 2017/7/20.
 */
let callbackUtils = require("../../javascripts/res/callbackUtils.js");
let mongoose = require("mongoose");    //引用mongoose模块
let Constans = require("../Constans.js");

exports.findNewTVs = (index, callback) => {
  findNewTVs(index, callback);
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
    return "newtv";
  } else if (index === "1") {
    return "chinatv";
  } else if (index === "2") {
    return "hongtaitv";
  } else if (index === "3") {
    return "westentv";
  } else if (index === "4") {
    return "japankoreatv";
  }
};

const findNewTVs = (index, callback) => {
  const db = mongoose.createConnection(Constans.WebRoot() + "/newtvs", { useNewUrlParser: true });
  db.on("error", console.error.bind(console, "连接错误:"));
  db.model(getModel(index), MovieSchema).find({ name: { $exists: true } }, function (error, docs) {
    if (error || docs == null || docs.length < 1) {
      console.log(error);
      callback(callbackUtils.errorRes(error));
    } else {
      callback(callbackUtils.rightRes(docs));
    }
    db.close();
  });
};

// findNewTVs("1", (doc) => {
//   console.log(doc);
// });