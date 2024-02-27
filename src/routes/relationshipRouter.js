const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  RelationshipController,
} = require("../controllers/RelationshipController");

const relationshipRouter = express.Router();

relationshipRouter
  .route("/friends")
  .all(authMiddleware)
  .get(RelationshipController.getFriends);

relationshipRouter
  .route("/removeFriend")
  .all(authMiddleware)
  .post(RelationshipController.removeFriend);

relationshipRouter
  .route("/friendRequest")
  .all(authMiddleware)
  .get(RelationshipController.getFriendsRequest)
  .post(RelationshipController.sendFriendRequest);

relationshipRouter
  .route("/sentFriendRequest")
  .all(authMiddleware)
  .get(RelationshipController.getSentFriendRequest);

relationshipRouter
  .route("/acceptFriendRequest")
  .all(authMiddleware)
  .post(RelationshipController.acceptFriendRequest);

relationshipRouter
  .route("/rejectFriendRequest")
  .all(authMiddleware)
  .post(RelationshipController.rejectFriendRequest);

module.exports.relationshipRouter = relationshipRouter;
