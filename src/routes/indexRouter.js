const express = require("express");
const { authRouter } = require("./authRouter");
const { relationshipRouter } = require("./relationshipRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/relationship", relationshipRouter);

module.exports = router;
