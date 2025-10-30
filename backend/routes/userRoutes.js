const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const getUserById = require("../controllers/getUser");
const editProfile = require("../controllers/editUser");
const upload = require("../middlewares/upload");

// GET USER
router.get("/get-user", verifyToken, getUserById);

router.put("/edit-profile", upload.single("profileImage"),verifyToken, editProfile);

module.exports = router;
