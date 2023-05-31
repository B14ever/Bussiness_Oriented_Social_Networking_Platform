const express = require("express");
const {
    allMessages,
    sendMessage,
} = require("../../Controlles/Personal/Messag");
const router = express.Router();
router.route("/:chatId").get(allMessages);
router.route("/").post(sendMessage);
module.exports = router;