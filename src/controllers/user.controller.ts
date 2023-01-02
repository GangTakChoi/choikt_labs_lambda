import { NextFunction, Request, Response } from "express";
import TypedRequestBody from "../interfaces/request.model";
import User from "../interfaces/user.model";
import UserService from "../services/user.service";
const createError = require("http-errors");

const userService = new UserService();

exports.getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await userService.find();
  res.send(users);
};

exports.getUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const user = await userService.findOne(userId);

  if (!user) {
    next(createError(404));
    return;
  }

  res.send(user);
};

exports.createUser = async (
  req: TypedRequestBody<User>,
  res: Response,
  next: NextFunction
) => {
  const name = req.body.name;
  const age = req.body.age;
  const id = req.body.id;

  if (
    typeof age !== "number" ||
    typeof name !== "string" ||
    typeof id !== "string"
  ) {
    next(createError(400));
    return;
  }

  const user = {
    id,
    name,
    age,
  };

  const result = await userService.create(user);

  if (!result) {
    next(createError(500));
    return;
  }

  res.send("success");
};

exports.delete = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  const result = await userService.delete(userId);

  if (!result) {
    next(createError(500));
    return;
  }

  res.send("success");
};

exports.update = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const result = await userService.update(userId, "second user name", 100);

  res.send("success");
};
