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
    const { email } = req.user;
    const response = await getFriendsService({ email });

    res.json(response);
  });
  static removeFriend = expressAsyncHandler(async (req, res) => {
    const { email } = req.user;
    const { removedFriendEmail } = req.body;
    const response = await removeFriendService({ email, removedFriendEmail });

    res.json(response);
  });
  static getFriendsRequest = expressAsyncHandler(async (req, res) => {
    const { email } = req.user;
    const response = await getFriendsRequestService({ email });

    res.json(response);
  });
  static sendFriendRequest = expressAsyncHandler(async (req, res) => {
    const { email } = req.user;
    const { sendedEmail } = req.body;
    const response = await sendFriendRequestService({ email, sendedEmail });

    res.json(response);
  });
  static getSentFriendRequest = expressAsyncHandler(async (req, res) => {
    const { email } = req.user;
    const response = await getSentFriendRequestService({ email });

    res.json(response);
  });
  static acceptFriendRequest = expressAsyncHandler(async (req, res) => {
    const { email } = req.user;
    const { acceptEmail } = req.body;
    const response = await acceptFriendRequestService({ email, acceptEmail });

    res.json(response);
  });
  static rejectFriendRequest = expressAsyncHandler(async (req, res) => {
    const { email } = req.user;
    const { rejectedEmail } = req.body;
    const response = await rejectFriendRequestService({
      email,
      rejectedEmail,
    });

    res.json(response);
  });
}

module.exports.RelationshipController = RelationshipController;
