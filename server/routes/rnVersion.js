/**
 * Created by 包俊 on 2017/8/15.
 */
let express = require('express');
let router = express.Router();

router.get('/detail', function (req, res) {
    let localVersion = require('../../rn/version/detail.js').Version
    if (localVersion == req.query.version) {
        res.json({version: false})
    } else {
        res.send({version: true})
    }

});

module.exports = router;