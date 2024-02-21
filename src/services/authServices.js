const { UserModel } = require("../models/UserModel");
const CustomError = require("../error/CustomError");
const { ErrorTypes } = require("../error/ErrorTypes");
const { createCookie } = require("../utils/jwtHelper");

const registerService = async ({ email, password }) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailRegex.test(email)) {
    throw new CustomError(ErrorTypes.INVALID_EMAIL);
  }

  if (await UserModel.findOne({ email }).select("email")) {
    throw new CustomError(ErrorTypes.EMAIL_ALREADY_REGISTERED);
  }

  const user = new UserModel({ email, password });
  const token = createCookie({ email: user.email, createdTime: Date.now() });

  await user.save();

  return { success: true, data: user, token };
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
