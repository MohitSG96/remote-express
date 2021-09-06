const express = require("express");
const router = express.Router();

const formController = require("../controllers/form");

router.post("/add", formController.addForm);
router.get("/list", formController.getUserForm);

module.exports = router;
