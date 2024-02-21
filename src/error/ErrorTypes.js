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
};

module.exports.ErrorTypes = ErrorTypes;
