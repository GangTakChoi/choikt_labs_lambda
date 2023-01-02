import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/user.router";
import indexRouter from "./routes/index.router";
const createError = require("http-errors");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", userRouter);

console.log("choikt labs lambda");

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
//   res.status(err.status || 500).json({ errorMessage: err.message });
// });

module.exports = app;
