const express = require("express");
const {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
} = require("../controllers/post");
const { createNewCommentPost } = require("../controllers/comment");

const postRouter = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
postRouter.post("/", authentication, authorization("CREATE_POST"), createPost);
postRouter.get("/get", getAllPost);
postRouter.put("/update/:id", authentication, updatePost);
postRouter.delete("/delete/:id", authentication, deletePost);
postRouter.post("/:id/comments/", authentication, createNewCommentPost);

module.exports = postRouter;
