const User = require("../schema/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_SECRET = "your_jwt_secret";

exports.createUser = async (req, res) => {
  try {
    const { user_name, user_mobile, user_email, user_password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ user_mobile }, { user_email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this mobile or email already exists." });
    }

    const hashedPassword = await bcrypt.hash(user_password, 10);

    const newUser = new User({
      user_name,
      user_mobile,
      user_email,
      user_password: hashedPassword,
      refresh_token: crypto.randomBytes(40).toString("hex"),
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { user_mobile, user_password } = req.body;

    const user = await User.findOne({ user_mobile });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      user_password,
      user.user_password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, user_role: user.user_role },
      user.refresh_token
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
