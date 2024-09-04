const router = require("express").Router();
const userRouter = require("./users");
const itemsRouter = require("./clothingItems");
const { documentNotFound } = require("../utils/errors");
const { NotFoundError } = require("../middlewares/NotFoundError");

router.use("/users", userRouter);

router.use("/items", itemsRouter);

router.use((req, res) => {
  throw new NotFoundError("Router not found");
});

module.exports = router;
