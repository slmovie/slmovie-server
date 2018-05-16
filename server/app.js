let express = require('express');
let app = express();
let morgan = require('morgan');

let search = require('./routes/search.js')
let detail = require('./routes/detail.js')
let index = require('./routes/index.js')
let schedule = require('./mongodb/schedule.js')
let rnVersion = require('./routes/rnVersion.js')
let appVersion = require('./routes/appVersion.js')

app.all('*', function (req, res, next) {
    res.set({
        'Access-Control-Allow-origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Methods': 'GET'
    });
    next();
});

app.use(morgan('combined'));
app.use(express.static('web/public'));

app.use('/search', search)

app.use('/detail', detail)

app.use('/index', index)

app.use('/rnVersion', rnVersion)

app.use('/appVersion', appVersion)

app.listen(3000);