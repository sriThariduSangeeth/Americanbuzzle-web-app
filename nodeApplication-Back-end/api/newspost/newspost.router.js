const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const {
    createNewPost,
    getAllPost,
    getAllPostByDate
    } = require("./newspost.controller");
  router.post("/",createNewPost);
  router.get("/all", getAllPost);
  router.get("/date/:date", getAllPostByDate)

  module.exports = router;