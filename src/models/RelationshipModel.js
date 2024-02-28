const mongoose = require("mongoose");

const RelationshipSchema = new mongoose.Schema({
  email: {
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
  foreignField: "email",
});

RelationshipSchema.virtual("friendRequests", {
  ref: "UserModel",
  localField: "friendRequestList",
  foreignField: "email",
});

RelationshipSchema.virtual("sentFriendRequests", {
  ref: "UserModel",
  localField: "sentFriendRequestList",
  foreignField: "email",
});

module.exports.RelationshipModel = mongoose.model(
  "RelationshipModel",
  RelationshipSchema
);
