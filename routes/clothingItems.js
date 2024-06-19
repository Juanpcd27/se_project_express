const router = require("express").Router();
const { addItem, getItems } = require("../controllers/clothingItems");

router.get("/", getItems);

router.post("/", addItem);

router.delete("/:itemId", (req, res) => {
  console.log("DELETE");
});

module.exports = router;
