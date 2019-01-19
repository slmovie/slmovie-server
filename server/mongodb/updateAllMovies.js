/**
 * Created by 包俊 on 2017/3/27.
 */
let dyjy = require("../javascripts/targetWeb/dyjy/dyjyUtils.js");
let dbConstans = require("../../spider/dyjy/detail/detailCon.js");
let dbQuery = require("./queryUtils.js");
const db = dbConstans.MoviesDB();

exports.update = function (length, callback) {
  update(length, callback);
};

//type:0全量更新 1部分更新
const update = (type, callback) => {
  db.on("error", console.error.bind(console, "连接错误:"));
  dyjy.movieLength((length) => {
    console.log("总量" + length);
    if (length != 0) {
      let number = 0;
      if (type == 0) {
        number = 1;
      } else {
        // number = 21617
        number = length - 2000;
      }
      get(length, number, function () {
        callback(1);
      });
    } else {
      callback(0);
      db.close();
    }
  });
};

const get = (length, id, callback) => {
  if (id <= length) {
    dyjy.getData(String(id), true, function (data) {
      if (data.status.code === 1) {
        let movie = {
          name: data.movies.name,
          post: data.movies.post,
          describe: data.movies.describe,
          detail: data.movies.detail,
          details: data.movies.details,
          files: data.movies.files,
          id: String(id),
        };
        //查询数据库数据
        dbQuery.findOneByID(id, function (doc) {
          if (doc == 0) {
            //数据库不存在该数据，插入新数据
            dbConstans.MovieModel(db).create(movie, function (error) {
              if (error) {
                console.log(error);
              } else {
                console.log(id + " " + data.movies.name + ">>>saved OK!");
              }
              get(length, id + 1, callback);
            });
          } else {
            //数据库存在该电影，对比是否有更新
            let update = false;
            if (doc.files.length == data.movies.files.length) {
              for (let i = 0; i < doc.files.length; i++) {
                if (doc.files[i].download != data.movies.files[i].download) {
                  update = true;
                }
              }
            } else {
              update = true;
            }

            if (update) {
              dbConstans.MovieModel(db).update({ id: id }, { $set: movie }, function (err) {
                if (err) {
                  // console.log(id + ' ' + data.movies.name + '>>>更新失败')
                } else {
                  console.log(id + " " + data.movies.name + ">>>更新成功");
                }
                get(length, id + 1, callback);
              });
            } else {
              console.log(id + " " + data.movies.name + ">>>没有更新");
              get(length, id + 1, callback);
            }
            movie = null;
          }
        });
      } else {
        console.log(id + ">>>爬取失败，重试");
        get(length, id + 1, callback);
      }
    });
  } else {
    // 关闭数据库链接
    db.close();
    callback();
  }
};

const get2 = (length, id, callback) => {
  if (id <= length) {
    //查询数据库数据
    dbQuery.findOneByID(id, function (doc) {
      let doubanData = false;
      if (doc !== 0) {
        var doubanID = doc.doubanID;
        if (doubanID !== undefined && doubanID !== "" && doubanID !== "0") {
          doubanData = true;
        }
      }
      //爬取数据
      dyjy.getData(String(id), doubanData, function (data) {
        if (data.status.code === 1) {
          let movie = {
            name: data.movies.name,
            post: data.movies.post,
            describe: data.movies.describe,
            detail: data.movies.detail,
            details: data.movies.details,
            files: data.movies.files,
            id: String(id),
          };
          if (doubanData) {
            console.log(data.movies.name + ">>已有id>>" + doubanID);
            movie["doubanID"] = doubanID;
          } else {
            console.log(data.movies.name + ">>没有id");
            movie["doubanID"] = data.movies.doubanID;
          }
          if (doc == 0) {
            //数据库不存在该数据，插入新数据
            dbConstans.MovieModel(db).create(movie, function (error) {
              if (error) {
                console.log(error);
              } else {
                console.log(id + " " + data.movies.name + ">>>saved OK!");
              }
              startNext2(doubanData, length, id + 1, callback);
            });
          } else {
            let update = false;
            if (doc.files.length == data.movies.files.length) {
              for (let i = 0; i < doc.files.length; i++) {
                if (doc.files[i].download != data.movies.files[i].download) {
                  update = true;
                }
              }
            } else {
              update = true;
            }
            if (!doubanData) { update = true; }
            if (doc.describe == undefined || doc.describe == "") {
              update = true;
              console.log("更新简介");
            }
            if (update) {
              dbConstans.MovieModel(db).update({ id: id }, { $set: movie }, function (err) {
                if (err) {
                  // console.log(id + ' ' + data.movies.name + '>>>更新失败')
                } else {
                  console.log(id + " " + data.movies.name + ">>>更新成功" + data.movies.doubanID);
                }
                if (data.movies.doubanID === "0") {
                  console.log(id + " " + data.movies.name + ">>>豆瓣请求失败");
                  startNext2(true, length, id + 1, callback);
                } else {
                  startNext2(false, length, id + 1, callback);
                }

              });
            } else {
              console.log(id + " " + data.movies.name + ">>>没有更新");
              startNext2(doubanData, length, id + 1, callback);
            }
            movie = null;
          }
        } else {
          console.log(id + ">>>爬取失败");
          startNext2(true, length, id + 1, callback);
        }
      });
    });
  } else {
    // 关闭数据库链接
    db.close();
    callback();
  }
};

//由于豆瓣有请求限制，限速
const startNext2 = (doubanData, length, id, callback) => {
  if (doubanData) { time = 0; }
  setTimeout(() => {
    get2(length, id, callback);
  }, 0);
};
