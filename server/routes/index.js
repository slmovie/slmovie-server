/**
 * Created by BaoJun on 2017/3/6.
 */
var express = require("express");
var router = express.Router();

const readIndexMovies = require("../mongodb/indexMovies/readIndexMovies.js");

router.get("/hotMovies", function (req, res) {
  console.log("index open once");
  readIndexMovies.findHotMovies(function (docs) {
    res.json(docs);
  });
});

router.get("/newMovies", function (req, res) {
  console.log("newMovies open once");
  readIndexMovies.findNewMovies(req.query.index, (docs) => {
    res.json(docs);
  });
});

router.get("/newTVs", function (req, res) {
  console.log("newTVs open once");
  readIndexMovies.findNewTVs(req.query.index, (docs) => {
    res.json(docs);
  });
});

module.exports = router;