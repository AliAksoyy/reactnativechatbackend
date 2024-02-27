const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { RelationshipController } = require("../controllers/RelationshipController");

const relationshipRouter = express.Router();

relationshipRouter
  .route("/friends")
  .all(authMiddleware)
  .get(RelationshipController.getFriends);

module.exports.relationshipRouter = relationshipRouter;
