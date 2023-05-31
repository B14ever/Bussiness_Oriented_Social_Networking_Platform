const Message = require("../../Models/MessageModel");
const PersonalAccount = require('../../Models/PersonalAccount')
const Chat = require("../../Models/ChatRoomModule");
const allMessages = async(req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "FirstName LastName profilePhoto _id")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};
const sendMessage = async(req, res) => {
    const { content, chatId, id } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "FirsName profilePhoto");
        message = await message.populate("chat");
        message = await PersonalAccount.populate(message, {
            path: "chat.PersonalAccount",
            select: "FirstName LastName profilePhoto _id",
        });

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

module.exports = { allMessages, sendMessage };