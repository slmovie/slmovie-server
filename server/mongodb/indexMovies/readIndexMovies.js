/**
 * Created by 包俊 on 2017/7/20.
 */
exports.findHotMovies = (callback) => {
  let hotMovieReadModel = require("./hotMovieReadModel");
  hotMovieReadModel.findHotMovies(callback);
};

exports.findNewMovies = (index, callback) => {
  let newMoviesReadModel = require("./newMoviesReadModel");
  newMoviesReadModel.findNewMovies(index, callback);
};

exports.findNewTVs = (index, callback) => {
  let newTVsReadModel = require("./newTVsReadModel");
  newTVsReadModel.findNewTVs(index, callback);
};
