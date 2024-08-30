const router = require("express").Router();
const {
  validateId,
  validateUser,
  validateLogin,
  validateUserItems,
} = require("../middlewares/validation");

const {
  addItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { auth } = require("../middlewares/auth");

router.post("/", auth, addItem, validateId);

router.delete("/:itemId", auth, deleteItem, validateUserItems, validateUser);

router.put("/:itemId/likes", auth, likeItem, validateUser);

router.delete("/:itemId/likes", auth, dislikeItem, validateLogin);

module.exports = router;
