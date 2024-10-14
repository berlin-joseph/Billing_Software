const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_mobile: {
      type: String,
      required: true,
      unique: true,
    },
    user_email: {
      type: String,
      default: "",
      unique: true,
    },
    user_password: {
      type: String,
      default: "",
    },
    refresh_token: {
      type: String,
      required: true,
    },
    user_role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
