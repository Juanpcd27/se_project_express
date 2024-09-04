const jwt = require("jsonwebtoken");
const { authError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("./UnauthorizedError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization Required");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    throw new UnauthorizedError("Authorization Required");
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
