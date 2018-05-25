/**
 * Created by 包俊 on 2017/8/15.
 */
let express = require('express');
let router = express.Router();
let app = require('../../rn/version/detail.js')

router.get('/detail', function (req, res) {
    let localVersion = app.APPVersion
    if (localVersion == req.query.version) {
        res.json({status: {code: "1"}, movies: {version: false}})
    } else {
        res.send({status: {code: "1"}, movies: {version: true, info: app.APPUpdateInfo}})
    }

});

module.exports = router;