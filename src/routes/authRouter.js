const express = require("express");
const { AuthController } = require("../controllers/AuthController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const authRouter = express.Router();

authRouter.route("/register").post(AuthController.register);
authRouter.route("/login").post(AuthController.login);
authRouter
  .route("/getProfile")
  .all(authMiddleware)
  .get(AuthController.getProfile);

module.exports.authRouter = authRouter;
