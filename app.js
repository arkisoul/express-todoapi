const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { todosRouter, usersRouter, authRouter } = require("./routes");

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = process.env.MONGO_DB;
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(MONGO_URI, { dbName: MONGO_DB })
  .then((_) =>
    console.log(`successfully connected to mongodb database ${MONGO_DB}`)
  ).catch((error) => console.error(`Error connecting to mongodb database ${error.message}`));

app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin, Access-Control-Allow-Methods, Content-type, Authorization, Access-Control-Allow-Credentials"
  );
  if(req.method === 'OPTIONS') {
    return res.status(200).send('Ok');
  }
  return next();
});
app.use("/users", usersRouter);
app.use("/todos", todosRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
