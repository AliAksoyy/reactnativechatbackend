const { UserModel } = require("../models/UserModel");
const CustomError = require("../error/CustomError");
const { ErrorTypes } = require("../error/ErrorTypes");

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
  return { success: true, data: { email, password } };
};
const getProfileService = async (email, password) => {};

module.exports = { registerService, loginService, getProfileService };
