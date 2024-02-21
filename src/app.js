const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const indexRouter = require("./routes/indexRouter");
const path = require("path");
const ErrorHandler = require("./error/ErrorHandler");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(indexRouter);

app.use(ErrorHandler);

module.exports = app;
