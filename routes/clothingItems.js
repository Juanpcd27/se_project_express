const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("GET ITEMS");
});

router.post("/", (req, res) => {
  console.log("POST");
});

router.delete("/:itemId", (req, res) => {
  console.log("DELETE");
});

module.exports = router;
