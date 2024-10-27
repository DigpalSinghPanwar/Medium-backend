const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Please enter the email address"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    name: {
      type: String,
      require: true,
      min: 4,
      max: 20,
    },
    about: {
      type: String,
      require: true,
      min: 30,
      max: 100,
    },
    password: {
      type: String,
      min: 8,
      required: true,
      select: false,
    },
  },
  {
    toJSON: true,
    toObject: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  currentPassword,
  userPassword
) {
  return await bcrypt.compare(currentPassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
