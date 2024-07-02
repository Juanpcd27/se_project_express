const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { auth } = require("./middlewares/auth");
const cors = require("cors");
const router = require("express").Router();
const { login, createUser, getCurrentUser } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");
const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(cors());
app.use(express.json());

app.get("/items", getItems);
app.post("/signin", login);
app.post("/signup", createUser);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
