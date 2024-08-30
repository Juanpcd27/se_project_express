const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;

const cors = require("cors");
require("dotenv").config();
const mainRouter = require("./routes/index");
const { login, createUser } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");
const { errorHandler } = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { validateUser, validateLogin } = require("./middlewares/validation");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.get("/items", getItems);
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.post("/signin", login, validateLogin);
app.post("/signup", createUser, validateUser);

app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
