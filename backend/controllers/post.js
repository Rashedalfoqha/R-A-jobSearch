const Post = require("../models/post");
const createPost = (req, res) => {
  const userId = req.token.userId;
  console.log(userId);
  const { description, photo } = req.body;
  const newPost = new Post({
    description,
    photo,
    userId,
  });
  newPost
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `post Created Successfully`,
        post: result,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: err,
      });
    });
};
const getAllPost = (req, res) => {
  Post.find()
    .populate("comment")
    .populate("userId")
    .exec()
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json({
          success: false,
          message: "No posts found",
        });
      } else {
        res.status(200).json({
          message: "All the posts",
          posts: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};
const updatePost = (req, res) => {
  const { id } = req.params;
  const userId = req.token.userId;

  const { description, photo } = req.body;
  const update = { description, photo };
  Post.findByIdAndUpdate({ _id: id }, update, { new: true })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: `post with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: "updated post",
        result: result,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: `Server Error`, err: err.message });
    });
};
const deletePost = (req, res) => {
  const { id } = req.params;
  const userId = req.token.userId;

  Post.findByIdAndDelete({ _id: id })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: `post with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `post deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
module.exports = { createPost, getAllPost, updatePost, deletePost };
