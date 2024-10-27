const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  console.log("user id", id);

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createToken = async (user, statusCode, res) => {
  const token = await signToken(user._id);
  user.password = undefined;

  res.status(statusCode).json({
    status: "Success",
    token,
    data: { user },
  });
};

exports.signup = async (req, res) => {
  try {
    const { email, password, name, about } = req.body;
    if (!email || !password || !name || !about) {
    }
    const user = await User.create(req.body);
    createToken(user, 201, res);
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Provide Email and Password",
      });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid Email and Password",
      });
    }

    createToken(user, 200, res);
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: "failed",
      message: "Invalid Email and Password",
    });
  }
};
