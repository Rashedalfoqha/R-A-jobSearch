const express = require("express");
const {
  register,
  login,
  getUserById,
  getUsers,
  updateUser,
} = require("../controllers/users");
const userRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
userRouter.post("/", register);
userRouter.post("/login", login);
userRouter.get("/user/:id", authentication, getUserById);
userRouter.get("/users", authentication, getUsers);
userRouter.put("/update/:id", authentication, updateUser);

module.exports = userRouter;
