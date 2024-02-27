const expressAsyncHandler = require("express-async-handler");
const { getFriendsService } = require("../services/relationshipServices");

class RelationshipController {
  static getFriends = expressAsyncHandler(async (req, res) => {
    const response = await getFriendsService();

    res.json(response);
  });
}

module.exports.RelationshipController = RelationshipController;
