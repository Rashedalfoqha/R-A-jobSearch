const commentModel = require("..//models/comment");
const jobModel = require("../models/jobSchema");
const postModel = require("../models/post");
const createNewComment = (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const commenter = req.token.commenter;
  const newComment = new commentModel({
    comment,
    commenter,
  });
  newComment
    .save()
    .then((result) => {
      jobModel
        .findByIdAndUpdate(
          { _id: id },
          { $push: { comment: result._id } },
          { new: true }
        )

        .then((result) => {
          res.status(201).json({
            success: true,
            message: result,
          });
        });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: err.message,
      });
    });
};
const createNewCommentPost = (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const commenter = req.token.commenter;
  const newComment = new commentModel({
    comment,
    commenter,
  });
  newComment
    .save()
    .then((result) => {
      postModel
        .findByIdAndUpdate(
          { _id: id },
          { $push: { comment: result._id  } },
          { new: true }
        )

        .then((result) => {
          res.status(201).json({
            success: true,
            message: result,
          });
        });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: err.message,
      });
    });
};
module.exports = {
  createNewComment,
  createNewCommentPost,
};
