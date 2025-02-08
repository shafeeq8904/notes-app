const express = require("express");
const router = express.Router();
const { getUserInfo } = require("../controllers/user.controller.js");
const { authenticateToken } = require('../utilities.js')

router.get("/get-users", authenticateToken, getUserInfo);

module.exports = router;