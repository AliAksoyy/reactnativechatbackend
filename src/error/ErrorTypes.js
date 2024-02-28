const ErrorTypes = {
  PLAYER_NOT_LOGED_IN: {
    status: 401,
    message: "PLAYER_NOT_LOGED_IN",
  },
  SOMETHING_WENT_WRONG: {
    status: 500,
    message: "SOMETHING_WENT_WRONG",
  },
  INVALID_EMAIL: {
    status: 400,
    message: "INVALID_EMAIL",
  },
  EMAIL_ALREADY_REGISTERED: {
    status: 400,
    message: "EMAIL_ALREADY_REGISTERED",
  },
  USER_NOT_FOUND: {
    status: 401,
    message: "USER_NOT_FOUND",
  },
  PASSWORD_MISMATCH: {
    status: 401,
    message: "PASSWORD_MISMATCH",
  },
  UNAUTHORIZED: {
    status: 401,
    message: "UNAUTHORIZED",
  },
  USERNAME_ENTERED: {
    status: 400,
    message: "USERNAME_ENTERED",
  },
  USER_CANNOT_HAVE_MORE_FRIENDS: {
    status: 400,
    message: "USER_CANNOT_HAVE_MORE_FRIENDS",
  },
  USER_NOT_FOUND: { status: 404, message: "USER_NOT_FOUND" },
};

module.exports.ErrorTypes = ErrorTypes;
