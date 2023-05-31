const express = require("express");
const {
    accessChat,
    fetchChats,
} = require("../../Controlles/Personal/ChatRoom");

const router = express.Router();

router.route("/").post(accessChat);
router.route("/fetchChats").post(fetchChats);
module.exports = router;