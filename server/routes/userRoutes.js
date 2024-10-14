const express = require("express");
const { createUser, loginUser } = require("../controller/userController");
const router = express.Router();

router.post("/users/create", createUser);
router.post("/users/login", loginUser);

module.exports = router;
