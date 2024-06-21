const router = require("express").Router();

const userRouter = require("./users");

const itemsRouter = require("./clothingItems");

router.use("/users", userRouter);

router.use("/items", itemsRouter);

router.use((req, res) => {
  res.status(notFound).send("Router not found");
});

module.exports = router;
