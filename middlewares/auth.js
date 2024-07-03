const jwt = require("jsonwebtoken");
const { authError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(authError).send({ message: "Authorization Required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res.status(authError).send({
      message: "Authorization Required",
    });
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
