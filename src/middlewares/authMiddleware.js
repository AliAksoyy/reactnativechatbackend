const { ErrorTypes } = require("../error/ErrorTypes");
const CustomError = require("../error/CustomError");
const expressAsyncHandler = require("express-async-handler");
const { decodeToken } = require("../utils/jwtHelper");
const { UserModel } = require("../models/UserModel");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token && !req.headers.token) {
    throw new CustomError(ErrorTypes.UNAUTHORIZED);
  }

  try {
    const { email } = decodeToken(token ? token : req.headers.token);

    if (!email) {
      throw new CustomError(ErrorTypes.UNAUTHORIZED);
    }
    req.user = await UserModel.findOne({ email });
  } catch (err) {
    throw new CustomError(ErrorTypes.UNAUTHORIZED);
  }

  next();
});

module.exports.authMiddleware = authMiddleware;
