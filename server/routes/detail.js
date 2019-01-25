/**
 * Created by BaoJun on 2017/2/11.
 */
var express = require('express');
var router = express.Router();
let queryUtils = require('../mongodb/queryUtils.js')

router.get('/', function (req, res) {
  console.log("open detail >>>>>>>" + req.query.code)
  queryUtils.findOneByID(req.query.code, function (doc) {
    // console.log(doc)
    let status = {}
    let callBack = {}
    status['code'] = 1
    callBack['status'] = status
    callBack['movies'] = doc
    console.log("open detail >>>>>>>" + doc.name)
    res.json(callBack)
  })
})

module.exports = router;