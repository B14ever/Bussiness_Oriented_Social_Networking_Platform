//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const Message = require("../../Models/MessageModel");
const Chat = require("../../Models/ChatRoomModule");
const GetPersonalAccounts = async(req, res, next) => {
    const { id } = req.body
    try {
        const PersonalAccounts = await PersonalAccount.find({ _id: { $ne: id }, $and: [{ recivedFriendRequest: { $nin: [id] } }, { sentFriendRequest: { $nin: [id] } }, { friends: { $nin: [id] } }] }, { createdAt: 0, updatedAt: 0, PhoneNumber: 0, exprience: 0, education: 0, skill: 0 })
        if (!PersonalAccounts) {
            const error = new Error();
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ PersonalAccounts })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const GetFirends = async(req, res, next) => {
    const { id } = req.body

    try {
        const Friends = await PersonalAccount.find({ _id: id }, { friends: 1 }).populate("friends", "FirstName LastName profilePhoto")
        if (!Friends) {
            const error = new Error();
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ Friends })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const GetPendingRequest = async(req, res, next) => {
    const { id } = req.body
    try {
        const PenddigRequest = await PersonalAccount.find({ _id: id }, { sentFriendRequest: 1 }).populate("sentFriendRequest", "FirstName LastName profilePhoto")
        if (!PenddigRequest) {
            const error = new Error();
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ PenddigRequest })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const DeleteConnection = async(req, res, next) => {
    const { userId, friendsId } = req.body
    const Sender = PersonalAccount.updateOne({ _id: userId }, { $pull: { friends: friendsId } }).exec()
    const Reciver = PersonalAccount.updateOne({ _id: friendsId }, { $pull: { friends: userId } }).exec()
    try {
        const cancleRequest = await Promise.all([Sender, Reciver])
        if (!cancleRequest) {
            const error = new Error('Connection not Deleted');
            error.status = 403;
            throw error;
        } else {
            const user = await PersonalAccount.findOne({ _id: `${userId}` })
            return res.status(200).json({ user })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { GetPersonalAccounts, GetFirends, GetPendingRequest, DeleteConnection }