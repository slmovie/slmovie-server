let express = require('express');
let app = express();

let search = require('../routes/search.js')
let detail = require('../routes/detail.js')
let index = require('../routes/index.js')

app.all('*', function (req, res, next) {
    res.set({
        'Access-Control-Allow-origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Methods': 'GET'
    });
    next();
});

app.use(express.static('web/app'));

app.use('/search', search)

app.use('/detail', detail)

app.use('/index', index)

app.listen(3000);