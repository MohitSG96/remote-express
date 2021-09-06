const express = require("express");
const router = express.Router();
var path = require("path");

const userController = require("../controllers/user");

var app = express();

router.post("/signin", userController.signIn);

module.exports = router;
