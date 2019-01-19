/**
 * Created by 包俊 on 2017/3/27.
 */
let mongoose = require("mongoose");    //引用mongoose模块
let Constans = require("../../../server/mongodb/Constans");

const movieFiles = new mongoose.Schema({
  name: String,
  download: String,
  fileSize: String,
});

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
  average: String,
});

const MovieSchema = new mongoose.Schema({
  name: String,
  post: String,
  describe: String,
  detail: [String],
  details: details,
  files: [movieFiles],
  id: String,
  doubanID: String,
});

exports.MoviesDB = () => {
  return mongoose.createConnection(Constans.WebRoot() + "/movies", { useNewUrlParser: true });
};

exports.MovieModel = (db) => {
  return db.model("Movie", MovieSchema);
};