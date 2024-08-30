const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { duplicateError, successReq } = require("../utils/errors");
const { BadRequestError } = require("../middlewares/BadRequestError");
const { UnauthorizedError } = require("../middlewares/UnauthorizedError");
const { NotFoundError } = require("../middlewares/NotFoundError");
const { ConflictError } = require("../middlewares/ConflictError");

const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(successReq).send(userObj);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      }
      if (err.code === duplicateError) {
        next(new ConflictError("Email already exists"));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Document not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      }

      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Document not found"));
      }

      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.log(err);
      if (err.message === "Incorrect password or email") {
        next(new UnauthorizedError("Incorrect password ot email"));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
