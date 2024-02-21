const expressAsyncHandler = require("express-async-handler");
const { registerService, loginService } = require("../services/authServices");

class AuthController {
  static register = expressAsyncHandler(async (req, res) => {
    const response = await registerService();
    res.json(response);
  });
  static login = expressAsyncHandler(async (req, res) => {
    const response = await loginService();
    res.json(response);
  });
}
module.exports.AuthController = AuthController;
