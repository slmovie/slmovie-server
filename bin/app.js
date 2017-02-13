let express = require('express');
let app = express();

let search = require('../routes/search.js')
let detail = require('../routes/detail.js')

app.use(express.static('public'));

app.use('/search', search)

app.use('/detail', detail)

app.listen(3000);