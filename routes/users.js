const router = require("express").Router();
const { getUsers, createUser } = require("../controllers/users");

router.get("/", getUsers);

router.get("/:userId", (req, res) => {
  console.log("GET 2");
});

router.post("/", createUser);

module.exports = router;
