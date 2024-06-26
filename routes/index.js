const router = require("express").Router();

const userRouter = require("./users");

const itemsRouter = require("./clothingItems");

const { documentNotFound } = require("../utils/errors");
// const { login, createUser, getCurrentUser } = require("../controllers/users");

router.use("/users", userRouter);

router.use("/items", itemsRouter);

router.use((req, res) => {
  res.status(documentNotFound).send({ message: "Router not found" });
});

module.exports = router;
