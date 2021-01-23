
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const {
    createUser,
    login,
    updateUsers
  } = require("./user.controller");
router.post("/users/", createUser);
router.post("/users/login/", login);
router.patch("/users/", checkToken, updateUsers);

module.exports = router;