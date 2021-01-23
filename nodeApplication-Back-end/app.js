require("dotenv").config();
const express = require("express");
const app = express();
const defultRouter = require("./api/users/user.router");

app.use(express.json());
app.use("/api", defultRouter);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});