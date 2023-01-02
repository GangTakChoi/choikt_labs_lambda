import express, { NextFunction, Request, Response } from "express";
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

// define the home page route
userRouter.get("/", userController.getUsers);
userRouter.get("/:userId", userController.getUser);
userRouter.post("/", userController.createUser);
userRouter.delete("/:userId", userController.delete);
userRouter.put("/:userId", userController.update);
export default userRouter;
