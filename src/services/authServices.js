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
  await user.save();

  return { success: true, data: user };
};
const loginService = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new CustomError(ErrorTypes.USER_NOT_FOUND);
  }

  const cookie = createCookie({ email: user.email, createdTime: Date.now() });

  await user.save();

  return { success: true, data: cookie, user };
};
const getProfileService = async (email, password) => {};

module.exports = { registerService, loginService, getProfileService };
