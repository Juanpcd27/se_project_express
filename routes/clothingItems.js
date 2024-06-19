const router = require("express").Router();
const {
  addItem,
  getItems,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.post("/", addItem);

router.delete("/:itemId", (req, res) => {
  console.log("DELETE");
});

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
