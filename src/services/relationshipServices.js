const { RelationshipModel } = require("../models/RelationshipModel");

const getFriendsService = async ({ email }) => {
  const { friends } = await RelationshipModel.findOneAndUpdate(
    { email },
    {},
    { new: true, upsert: true }
  ).populate("friends");

  return { success: true, data: friends };
};
const removeFriendService = async () => {};
const getFriendsRequestService = async ({ email }) => {
  const { friendRequests } = await RelationshipModel.findOneAndUpdate(
    { email },
    {},
    { new: true, upsert: true }
  ).populate("friendRequests");

  return { success: true, data: friendRequests };

};
const sendFriendRequestService = async () => {};
const getSentFriendRequestService = async ({ email }) => {
  const { sentFriendRequests } = await RelationshipModel.findOneAndUpdate(
    { email },
    {},
    { new: true, upsert: true }
  ).populate("sentFriendRequests");

  return { success: true, data: sentFriendRequests };
};
const acceptFriendRequestService = async () => {};
const rejectFriendRequestService = async () => {};

module.exports = {
  getFriendsService,
  removeFriendService,
  getFriendsRequestService,
  sendFriendRequestService,
  getSentFriendRequestService,
  acceptFriendRequestService,
  rejectFriendRequestService,
};
