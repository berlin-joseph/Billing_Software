const User = require("../schema/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_SECRET = "your_jwt_secret";

// Create User
exports.createUser = async (req, res) => {
  try {
    const { user_name, user_mobile, user_email, user_password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ user_mobile }, { user_email }],
    });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User with this mobile or email already exists.",
      });
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
    res.status(201).json({
      status: true,
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
      error,
    });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { user_mobile, user_password } = req.body;

    const user = await User.findOne({ user_mobile });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      user_password,
      user.user_password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id, user_role: user.user_role },
      user.refresh_token
    );

    res.status(200).json({
      status: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
      error,
    });
  }
};

// Verify Token
exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.body;

    const decodedToken = jwt.decode(token);

    if (!decodedToken || !decodedToken.userId) {
      return res.status(400).json({
        status: false,
        message: "Invalid token",
      });
    }

    const findUser = await User.findById(decodedToken.userId);

    if (!findUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    jwt.verify(token, findUser.refresh_token, (err) => {
      if (err) {
        return res.status(401).json({
          status: false,
          message: "Token is not valid",
          error: err,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Token is valid",
      });
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
