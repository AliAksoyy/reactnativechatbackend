const expressAsyncHandler = require("express-async-handler");
const {
  getFriendsService,
  removeFriendService,
  getFriendsRequestService,
  sendFriendRequestService,
  getSentFriendRequestService,
  acceptFriendRequestService,
  rejectFriendRequestService,
} = require("../services/relationshipServices");

class RelationshipController {
  static getFriends = expressAsyncHandler(async (req, res) => {
    const response = await getFriendsService();

    res.json(response);
  });
  static removeFriend = expressAsyncHandler(async (req, res) => {
    const response = await removeFriendService();

    res.json(response);
  });
  static getFriendsRequest = expressAsyncHandler(async (req, res) => {
    const response = await getFriendsRequestService();

    res.json(response);
  });
  static sendFriendRequest = expressAsyncHandler(async (req, res) => {
    const response = await sendFriendRequestService();

    res.json(response);
  });
  static getSentFriendRequest = expressAsyncHandler(async (req, res) => {
    const response = await getSentFriendRequestService();

    res.json(response);
  });
  static acceptFriendRequest = expressAsyncHandler(async (req, res) => {
    const response = await acceptFriendRequestService();

    res.json(response);
  });
  static rejectFriendRequest = expressAsyncHandler(async (req, res) => {
    const response = await rejectFriendRequestService();

    res.json(response);
  });
}

module.exports.RelationshipController = RelationshipController;
