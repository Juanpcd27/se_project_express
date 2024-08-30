const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateId } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser, validateId);

module.exports = router;
