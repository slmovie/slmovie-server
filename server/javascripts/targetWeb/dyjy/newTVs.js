/**
 * Created by 包俊 on 2017/7/20.
 */
const getSuperagent = require("../../utils/mySuperagent.js");
const cheerio = require("cheerio");

//获取所有更新电视剧
exports.MyNewTVs = function (callback) {
  MyNewTVs(callback);
};
//获取更新电视剧中最大的address
exports.getLength = function (callback) {
  newTVsLength(callback);
};

function newTVsLength(callback) {
  getLength(0, 0, function (length) {
    console.log(length);
    callback(length);
  });
}

function getLength(index, length, next) {
  newTVs(index, function (doc, number) {
    if (index < 5) {
      if (number > length) { length = number; }
      console.log("newtvs index=" + index + " most=" + number);
      getLength(index + 1, length, next);
    } else {
      next(length);
    }
  });
}

function MyNewTVs(callback) {
  let allNewMovies = {};
  allNewMovies["movies"] = [];
  getAllNewTVs(allNewMovies, 0, function () {
    // console.log(allNewMovies)
    callback(allNewMovies);
  });
}

//拼装所有数据
function getAllNewTVs(allNewMovies, index, next) {
  let callback = {};
  let status = {};
  newTVs(index, function (doc) {
    if (doc.status.code == 1) {
      status["code"] = 1;
      allNewMovies["status"] = status;
      callback["movies"] = doc;
      callback["type"] = newTVsType(index);
      callback["index"] = index;
      if (index < 5) {
        allNewMovies["movies"].push(callback);
        getAllNewTVs(allNewMovies, index + 1, next);
      } else {
        next();
      }
    } else {
      allNewMovies = {};
      next();
    }
  });
}

//最新电视剧
function newTVs(index, next) {
  let callBack = {};
  let status = {};
  let number = 0;
  getSuperagent().get("http://www.idyjy.com")
    .charset("gb2312")
    .end(function (error, response) {
      if (error || response.statusCode == "undefined") {
        status["code"] = 0;
        status["error"] = error;
        callBack["status"] = status;
        next(callBack, number);
        return;
      }
      if (response.statusCode == 200) {
        let $ = cheerio.load(response.text);
        //基本信息
        let movies = [];
        $(".play-img", $(".img-list", $(".box")[1])[index]).each(function (i, elem) {
          let address = $(elem).attr("href");
          let split = address.split("/");
          address = split[split.length - 1].split(".")[0];
          movies.push({
            "name": $(elem).attr("title"),
            //网页地址
            "address": address,
            //海报图片
            "post": $("img", elem).attr("original"),
            //豆瓣评分
            "douban": $("info", ".pRightBottom", elem).text(),
            //上映日期
            "year": $("info", $(".pLeftTop", elem)[0]).text(),
            "from": "dyjy",
          });
          if (number < address) { number = address; }
        });
        if (movies.length == 0) {
          status = DealError.SEARCHNONERES;
          callBack["status"] = status;
        } else {
          status["code"] = 1;
          callBack["status"] = status;
          callBack["movies"] = movies;
        }
        next(callBack, number);
      }
    });
}

function newTVsType(index) {
  if (index == 0) {
    return "最近更新";
  } else if (index == 1) {
    return "国产剧";
  } else if (index == 2) {
    return "港台剧";
  } else if (index == 3) {
    return "欧美剧";
  } else if (index == 4) {
    return "日韩剧";
  }
}