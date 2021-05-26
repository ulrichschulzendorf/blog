var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var blogRouter = require("./routes/blog");
const { setCors } = require("./middleware/security");
var app = express();
const adapter = new FileSync("data/db.json");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const db = low(adapter);

db.defaults({
  post: [],
}).write();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  next();
});

// error handling
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.use(setCors);

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
