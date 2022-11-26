const { User } = require("../models/user.model");
const { Conflict, Unauthorized, NotFound } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const sendRegisterEmail = require("../services/send.register.email");

const { JWT_SECRET } = process.env;

async function verifyEmail(req, res, next) {
  const { verificationToken } = req.params;

  const user = await User.findOne({
    verificationToken,
  });

  // no user
  if (!user) {
    throw new NotFound("User not found");
  }

  // user exists, not verified
  if (!user.verify) {
    await User.findByIdAndUpdate(user._id, {
      verify: true,
    });
    return res.status(200).json({
      message: "Verification successful",
    });
  }

  // user exists, verified
  if (user.verify) {
    return res.status(400).json({
      message: "Verification has already been passed",
    });
  }
}

async function signup(req, res, next) {
  const { email, password, subscription } = req.body;
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email, { s: "100", r: "x", d: "retro" }, true);
  const user = new User({
    email,
    password,
    verificationToken,
    subscription,
    avatarURL,
  });

  try {
    await user.save();
    await sendRegisterEmail({ email, token: verificationToken });
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      throw new Conflict("Email in use");
    }

    throw error;
  }

  return res.status(201).json({
    user: {
      email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const userVerify = user.verify;
  if (!user) {
    throw new Unauthorized("User does not exists");
  }
  const isPasswordTheSame = await bcrypt.compare(password, user.password);

  if (!isPasswordTheSame) {
    throw new Unauthorized("Email or password is wrong");
  }

  if (!userVerify) {
    throw new Unauthorized("Your Email isn't verified");
  }
  const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: "55m",
  });
  user.token = token;
  await User.findByIdAndUpdate(user._id, user);

  return res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
}

async function ResendingVerifyEmail(req, res, next) {
  const { email } = req.body;

  const user = await User.findOne({ email });

  const verificationToken = nanoid();
  const updateUser = await User.findByIdAndUpdate(
    user.id,
    { verificationToken: verificationToken },
    {
      new: true,
    }
  );
  const userVerify = user.verify;

  if (!user) {
    throw new Unauthorized("User does not exists");
  }
  if (!userVerify) {
    try {
      await sendRegisterEmail({ email, token: verificationToken });
    } catch (error) {
      throw error;
    }
  }

  return res.json({
    user: {
      email,
    },
  });
}

async function logout(req, res, next) {
  const { user } = req;
  user.token = null;
  await User.findByIdAndUpdate(user.id, user);

  return res.json({});
}

module.exports = {
  signup,
  login,
  logout,
  verifyEmail,
  ResendingVerifyEmail,
};
