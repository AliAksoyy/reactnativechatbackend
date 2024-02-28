const CustomError = require("../error/CustomError");
const { ErrorTypes } = require("../error/ErrorTypes");
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
  if (email == sendedEmail) {
    throw new CustomError(ErrorTypes.USER_CANNOT_HAVE_MORE_FRIENDS);
  }

  if (!(await UserModel.exists({ email: sendedEmail }))) {
    throw new CustomError(ErrorTypes.USER_NOT_FOUND);
  }

  await RelationshipModel.findOneAndUpdate(
    { email: sendedEmail },
    {
      $addToSet: { friendRequestList: email },
    },
    { new: true, upsert: true }
  ).lean();

  await RelationshipModel.findOneAndUpdate(
    { email },
    {
      $addToSet: { sentFriendRequestList: sendedEmail },
    },
    { new: true, upsert: true }
  ).lean();

  return { success: true, data: "FRIEND_REQUEST_SENDED_TO_" + sendedEmail };
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
  const { friends } = await RelationshipModel.findOneAndUpdate(
    { email },
    {
      $addToSet: {
        friendList: acceptEmail,
      },
      $pull: {
        friendRequestList: acceptEmail,
      },
    },
    { new: true, upsert: true }
  ).populate("friends");

  await RelationshipModel.findOneAndUpdate(
    { email: acceptEmail },
    {
      $addToSet: {
        friendList: email,
      },
      $pull: {
        sentFriendRequestList: email,
      },
    },
    { new: true, upsert: true }
  );

  return { success: true, data: friends };
};
const rejectFriendRequestService = async ({ email, rejectedEmail }) => {
  const { friendRequests } = await RelationshipModel.findOneAndUpdate(
    { email },
    {
      $pull: { friendRequestList: rejectedEmail },
    },
    { new: true, upsert: true }
  ).populate("friendRequests");

  await RelationshipModel.findOneAndUpdate(
    { email: rejectedEmail },
    { $pull: { sentFriendRequestList: email } },
    { new: true, upsert: true }
  );

  return { success: true, data: friendRequests };
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
