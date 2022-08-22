const express = require("express");
const { HandleSignIn, HandleLogin } = require("../controllers/authController");

const router = express.Router();

router.post("/login", HandleLogin);
router.post("/register", HandleSignIn);

module.exports = router;
