const router = require("express").Router();

const {
  validatecreateItems,
  validateId,
} = require("../middlewares/validation");

const {
  addItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { auth } = require("../middlewares/auth");

router.post("/", auth, validatecreateItems, addItem);

router.delete("/:itemId", auth, validateId, deleteItem);

router.put("/:itemId/likes", auth, validateId, likeItem);

router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;
