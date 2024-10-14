const express = require("express");
const {
  createUser,
  loginUser,
  verifyToken,
} = require("../controller/userController");
const router = express.Router();

router.post("/users/create", createUser);
router.post("/users/login", loginUser);
router.post("/users/verify", verifyToken);

module.exports = router;
