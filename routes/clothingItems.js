const router = require("express").Router();
// const {
//   validateId,
//   validateUser,
//   validateLogin,
//   validateUserItems,
// } = require("../middlewares/validation");

const {
  addItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { auth } = require("../middlewares/auth");

router.post("/", auth, addItem);

router.delete("/:itemId", auth, deleteItem);

router.put("/:itemId/likes", auth, likeItem);

router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
