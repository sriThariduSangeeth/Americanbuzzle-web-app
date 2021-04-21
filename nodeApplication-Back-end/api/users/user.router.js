const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const {
  createUser,
  login,
  updateUsers
} = require("./user.controller");
router.post("/", checkToken, createUser);
router.post("/login/", login);
router.patch("/", checkToken, updateUsers);

module.exports = router;