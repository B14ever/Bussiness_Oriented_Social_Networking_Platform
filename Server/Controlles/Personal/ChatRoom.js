const Chat = require("../../Models/ChatRoomModule");
const PersonalAccount = require('../../Models/PersonalAccount')
const accessChat = async(req, res) => {
    const { ownerId, userId } = req.body;
    var isChat = await Chat.find({
            users: { $elemMatch: { $eq: ownerId } },
            $and: [
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
        .populate("users", )
        .populate("latestMessage");
    isChat = await PersonalAccount.populate(isChat, {
        path: "latestMessage.sender",
        select: "FirsName profilePhoto _id",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [ownerId, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users", [
                    "-exprience",
                    "-skill",
                ]
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
};
const fetchChats = async(req, res) => {
    const { id } = req.body
    try {
        Chat.find({ users: { $elemMatch: { $eq: id } } })
            .populate("users", "FirstName LastName profilePhoto _id")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async(results) => {
                results = await PersonalAccount.populate(results, {
                    path: "latestMessage.sender",
                    select: "FirstName profilePhoto _id",
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

module.exports = { accessChat, fetchChats };