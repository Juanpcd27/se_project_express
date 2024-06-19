const router = require("express").Router();

const userRouter = require("./users");

const itemsRouter = require("./clothingItems");

router.use("/users", userRouter);

router.use("/clothingItems", itemsRouter);

module.exports = router;
