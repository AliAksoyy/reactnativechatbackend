const expressAsyncHandler = require("express-async-handler");
const {
  registerService,
  loginService,
  getProfileService,
} = require("../services/authServices");

class AuthController {
  static register = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { token, ...response } = await registerService({ email, password });

    res
      .cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 30 })
      .json({ ...response, token });
  });
  static login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { token, ...response } = await loginService({ email, password });

    res
      .cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 30 })
      .json({ ...response, token });
  });
  static logout = expressAsyncHandler(async (req, res) => {
    res
      .clearCookie("token")
      .json({ success: true, data: "LOGOUT_SUCCESSFULLY" });
  });
  static getProfile = expressAsyncHandler(async (req, res) => {
    const user = req.user;

    const response = await getProfileService(user);
    res.json(response);
  });
}
module.exports.AuthController = AuthController;
