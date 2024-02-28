const { RelationshipModel } = require("../models/RelationshipModel");
const { UserModel } = require("../models/UserModel");

const getFriendsService = async ({ email }) => {
  const { friends } = await RelationshipModel.findOneAndUpdate(
    { email },
    {},
    { new: true, upsert: true }
  ).populate("friends");

  return { success: true, data: friends };
};
const removeFriendService = async ({ email, removedFriendEmail }) => {
  const { friends } = await RelationshipModel.findOneAndUpdate(
    { email },
    {
      $pull: {
        friendList: removedFriendEmail,
      },
    },
    { new: true, upsert: true }
  ).populate("friends");

  await RelationshipModel.findOneAndUpdate(
    { email: removedFriendEmail },
    {
      $pull: {
        friendList: email,
      },
    },
    { new: true, upsert: true }
  );

  return { success: true, data: friends };
};
const getFriendsRequestService = async ({ email }) => {
  const { friendRequests } = await RelationshipModel.findOneAndUpdate(
    { email },
    {},
    { new: true, upsert: true }
  ).populate("friendRequests");

  return { success: true, data: friendRequests };
};
const sendFriendRequestService = async ({ email, sendedEmail }) => {
  const user = await RelationshipModel.findOneAndUpdate(
    { email },
    {
      $push: { sentFriendRequestList: sendedEmail },
    },
    { new: true, upsert: true }
  );

  await RelationshipModel.findOneAndUpdate(
    { email: sendedEmail },
    {
      $push: { friendRequestList: email },
    },
    { new: true, upsert: true }
  ).populate("friendRequests");

  return { success: true, data: user.sentFriendRequestList };
};
const getSentFriendRequestService = async ({ email }) => {
  const { sentFriendRequests } = await RelationshipModel.findOneAndUpdate(
    { email },
    {},
    { new: true, upsert: true }
  ).populate("sentFriendRequests");

  return { success: true, data: sentFriendRequests };
};
const acceptFriendRequestService = async ({ email, acceptEmail }) => {
  const user = await RelationshipModel.findOneAndUpdate(
    { email },
    {
      $push: {
        friendList: acceptEmail,
      },
      $pull: {
        friendRequestList: acceptEmail,
      },
    },
    { new: true, upsert: true }
  );
  await RelationshipModel.findOneAndUpdate(
    { email: acceptEmail },
    {
      $pull: {
        sentFriendRequestList: email,
      },
      $push: {
        friendList: email,
      },
    },
    { new: true, upsert: true }
  ).populate("sentFriendRequests");

  return { success: true, data: user };
};
const rejectFriendRequestService = async ({ email, rejectedEmail }) => {
  const user = await RelationshipModel.findOneAndUpdate(
    { email },
    {
      $pull: { friendRequestList: rejectedEmail },
    },
    { new: true, upsert: true }
  );

  await RelationshipModel.findOneAndUpdate(
    { email: rejectedEmail },
    { $pull: { sentFriendRequestList: email } },
    { new: true, upsert: true }
  ).populate("sentFriendRequestList");

  return { success: true, data: user };
};

module.exports = {
  getFriendsService,
  removeFriendService,
  getFriendsRequestService,
  sendFriendRequestService,
  getSentFriendRequestService,
  acceptFriendRequestService,
  rejectFriendRequestService,
};
