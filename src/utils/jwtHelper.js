const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const privateKey = fs.readFileSync(
  path.join(__dirname, "..", "config", "Secret.key"),
  "utf-8"
);

const createCookie = (data) => {
  const token = jwt.sign({ ...data }, privateKey);
  return token;
};
const decodeToken = () => {};

module.exports = { createCookie, decodeToken };
