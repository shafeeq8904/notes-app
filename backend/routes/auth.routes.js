const express = require("express");
const router = express.Router();
const { createAccount, login } = require("../controllers/auth.controller.js");


router.post("/create-account", createAccount);
router.post("/login", login)

module.exports = router;