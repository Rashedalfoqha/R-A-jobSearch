const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = (req, res) => {
  const {
    FirstName,
    lastName,
    Email,
    password,
    phoneNumber,
    Experience,
    Skills,
    role,
    photo,
  } = req.body;
  const newUser = new usersModel({
    FirstName,
    lastName,
    Email,
    password,
    phoneNumber,
    Experience,
    Skills,
    role: "65997cde0c22c72b02ed5d26",
    photo:
      "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Picture.png",
  });
  newUser
    .save()

    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        account: result,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: `The email already exists`,
      });
    });
};
const login = (req, res) => {
  const { Email, password } = req.body;
  usersModel
    .findOne({ Email })
    .populate("role")
    .exec()
    .then((result) => {
      if (!result) {
        res.status(403).json({
          success: false,
          message:
            "The email doesn't exist or The password you’ve entered is incorrect`",
        });
      } else {
        console.log(result);
        // console.log(result);
        bcrypt.compare(password, result.password).then((info) => {
          if (!info) {
            return res.status(403).json({
              success: false,
              message:
                "The email doesn't exist or The password you’ve entered is incorrect`",
            });
          } else {
            const payload = {
              userId: result._id,
              FirstName: result.FirstName,
              role: result.role,
            };
            console.log(payload);
            const options = {
              expiresIn: "7d",
            };
            const token = jwt.sign(payload, process.env.SECRET, options);
            res.status(200).json({
              success: true,
              message: `Valid login credentials`,
              token: token,
              userId: result._id,
              user: result,
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};
const getUserById = (req, res) => {
  const id = req.params.id;
  usersModel
    .findById({ _id: id })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        message: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    });
};
const getUsers = (req, res) => {
  const Id = req.token.Id;
  usersModel
    .find({ Id })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        message: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    });
};
const updateUser = (req, res) => {
  const { id } = req.params;
  const userId = req.token.userId;
  const { FirstName, lastName, Email, phoneNumber, Experience, Skills, photo } =
    req.body;
  const update = {
    FirstName,
    lastName,
    Email,
    phoneNumber,
    Experience,
    Skills,
    photo,
  };
  if (userId !== id) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }
  usersModel
    .findOneAndUpdate({ _id: id }, update, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(202).json({
        success: true,
        message: "Updated user successfully",
        result: result,
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

module.exports = {
  register,
  login,
  getUserById,
  getUsers,
  updateUser,
};
