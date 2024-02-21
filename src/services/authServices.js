const { UserModel } = "../models/UserModel";

const registerService = async ({ email, password }) => {};
const loginService = async ({ email, password }) => {
  return { success: true, data: { email, password } };
};
const getProfileService = async (email, password) => {};

module.exports = { registerService, loginService, getProfileService };
