const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const {
    createNewPost,
    getAllPost,
    getAllPostByDate,
    getTestPost
} = require("./newspost.controller");
router.post("/", checkToken, createNewPost);
router.get("/all", checkToken, getAllPost);
router.get("/date/:date", getAllPostByDate);
router.get("/test/post", checkToken, getTestPost);

module.exports = router;