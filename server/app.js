let express = require("express");
let app = express();
let morgan = require("morgan");
let compression = require("compression")

let search = require("./routes/search.js");
let detail = require("./routes/detail.js");
let index = require("./routes/index.js");
let rnVersion = require("./routes/rnVersion.js");
let appVersion = require("./routes/appVersion.js");
let path = require("path");

app.all("*", function (req, res, next) {
  res.set({
    "Access-Control-Allow-origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
    "Access-Control-Allow-Methods": "GET"
  });
  next();
});

app.use(morgan("combined"));
app.use(compression())
app.use(express.static("build/build"));
app.use(express.static("web/public"));

app.use("/search", search);

app.use("/detail", detail);

app.use("/index", index);

app.use("/rnVersion", rnVersion);

app.use("/appVersion", appVersion);

app.use("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../build/build/index.html"));
});

app.listen(3000);