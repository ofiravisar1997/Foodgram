const express = require("express");
const { getProfile } = require("../controllers/userController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/profile/:id", auth.requireAuth, getProfile);

module.exports = router;
