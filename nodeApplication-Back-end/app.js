require("dotenv").config();
const express = require("express");
var path = require('path');
const app = express();
const userRouter = require("./api/users/user.router");
const newspostRouter = require("./api/newspost/newspost.router");

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,Accept,x-client-key,x-client-token,x-client-secret,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use("/api/users", userRouter);
app.use("/api/news", newspostRouter);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server up and running on PORT :", port);
});