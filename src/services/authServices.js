const { UserModel } = require("../models/UserModel");
const CustomError = require("../error/CustomError");
const { ErrorTypes } = require("../error/ErrorTypes");
const { createCookie } = require("../utils/jwtHelper");
const { generateUserId } = require("../utils/keyGenerator");

const registerService = async ({ user, email, password }) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!user) {
    throw new CustomError(ErrorTypes.USERNAME_ENTERED);
  }

  if (!emailRegex.test(email)) {
    throw new CustomError(ErrorTypes.INVALID_EMAIL);
  }

  if (await UserModel.findOne({ email }).select("email")) {
    throw new CustomError(ErrorTypes.EMAIL_ALREADY_REGISTERED);
  }

  const newUser = new UserModel({
    userId: generateUserId(),
    userName: user,
    email,
    password,
  });
  const token = createCookie({ email: newUser.email, createdTime: Date.now() });

  await newUser.save();

  return { success: true, data: newUser, token };
};
const loginService = async ({ email, password }) => {
  const user = await UserModel.findOne({ email }).select("email password");

  if (!user) {
    throw new CustomError(ErrorTypes.USER_NOT_FOUND);
  }
  if (!user.comparePassword(password)) {
    throw new CustomError(ErrorTypes.PASSWORD_MISMATCH);
  }

  const token = createCookie({ email: user.email, createdTime: Date.now() });

  await user.save();

  return { success: true, data: user, token };
};
const getProfileService = async (user) => {
  return { success: true, data: user };
};

module.exports = { registerService, loginService, getProfileService };
