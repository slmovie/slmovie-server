/**
 * Created by 包俊 on 2017/7/9.
 */

let service = "P";

exports.WebRoot = function() {
  if (service === "T") {
    return "mongodb://baojunMovies:sadsdagds45+6412gds@localhost:14369";
  } else if (service === "P") {
    return "mongodb://read:qwc123cadf23412casdsd@localhost:14369";
  }
};
