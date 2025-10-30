const uploadToCloudinary = require("../config/cloudinary");
const User = require("../models/users");

const editProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    // 🔹 Step 1: Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    // 🔹 Step 2: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 🔹 Step 3: Find user by ID
    const user = await User.findById(userId).populate("expenses").populate("incomes");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔹 Step 4: Check for duplicate email (excluding current user)
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ message: "Email already in use by another account" });
    }

    // 🔹 Step 5: Handle image upload (optional)
    let imageUrl = user.profileImage;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }


    // 🔹 Step 7: Update fields
    user.name = name;
    user.email = email;
    user.profileImage = imageUrl;

    await user.save();

    // 🔹 Step 8: Response
    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = editProfile;
