const expressAsyncHandler = require("express-async-handler");
const {
  registerService,
  loginService,
  getProfileService,
} = require("../services/authServices");

class AuthController {
  static register = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const response = await registerService({ email, password });
    res.json(response);
  });
  static login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const {} = await loginService({ email, password });
    res.json(response);
  });
  static getProfile = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const response = await getProfileService({ email, password });
    res.json(response);
  });
}
module.exports.AuthController = AuthController;
