const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const getUserById = require("../controllers/getUser");
const editProfile = require("../controllers/editUser");
const upload = require("../middlewares/upload");
const getAISuggestion = require("../controllers/aiController");

// GET USER
router.get("/get-user", verifyToken, getUserById);

router.put("/edit-profile", upload.single("profileImage"),verifyToken, editProfile); 

// Protected route for AI suggestion
router.post("/get-ai-suggestion", verifyToken, getAISuggestion);

module.exports = router;
