const User = require("../models/user");
const {
  invalid400,
  documentNotFound,
  defaultError,
  authError,
} = require("../utils/errors");

const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");
const bcrypt = require("bcryptjs");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(409).send({ message: "User exists" });
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(invalid400).send({ message: "Invalid data" });
      }

      if (err.name === "InvalidEmailError") {
        return res.status(invalid400).send({ message: "Invalid email" });
      }
      return res
        .status(defaultError)
        .send({ message: "An error has occurred on the server." });
    });
};

const getCurrentUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(documentNotFound)
          .send({ message: "Document not found" });
      }
      if (err.name === "CastError") {
        return res.status(invalid400).send({ message: "Invalid data" });
      }
      return res
        .status(defaultError)
        .send({ message: "An error has occurred on the server." });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const { userId } = req.params;
  User.findByIdAndUpdate(userId, { name, avatar })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(documentNotFound)
          .send({ message: "Document not found" });
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return res.status(invalid400).send({ message: "Invalid data" });
      }
      return res
        .status(defaultError)
        .send({ message: "An error has occurred on the server." });
    });
};

const login = (req, res) => {
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
      if (err.name === "Incorrect password or email") {
        return res.status(invalid400).send({ message: "Invalid data" });
      }

      return res.status(authError).send({ message: "Invalid authentication" });
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
