const router = require("express").Router();
const userRouter = require("./users");
const itemsRouter = require("./clothingItems");
const { NotFoundError } = require("../middlewares/NotFoundError");

router.use("/users", userRouter);

router.use("/items", itemsRouter);

router.use(() => {
  throw new NotFoundError("Router not found");
});

module.exports = router;
