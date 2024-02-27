const mongoose = require("mongoose");

const RelationshipSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  friendList: {
    type: [{ type: String }],
  },
  friendRequestList: [{ type: String }],
  sentFriendRequestList: [{ type: String }],
});

RelationshipSchema.virtual("friends", {
  ref: "UserModel",
  localField: "friendList",
  foreignField: "userId",
});

RelationshipSchema.virtual("friendRequests", {
  ref: "UserModel",
  localField: "friendRequestList",
  foreignField: "userId",
});

RelationshipSchema.virtual("sentFriendRequests", {
  ref: "UserModel",
  localField: "sentFriendRequestList",
  foreignField: "userId",
});

module.exports.RelationshipModel = mongoose.model(
  "RelationshipModel",
  RelationshipSchema
);
