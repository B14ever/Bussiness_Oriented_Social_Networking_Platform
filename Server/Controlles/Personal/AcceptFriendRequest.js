//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const AcceptFriendRequest = async(req, res, next) => {
    const { senderId, reciverId } = req.body
    const Sender = PersonalAccount.updateOne({ _id: senderId }, { $push: { friends: reciverId } }).exec()
    const Reciver = PersonalAccount.updateOne({ _id: reciverId }, { $push: { friends: senderId } }).exec()

    const Senders = PersonalAccount.updateOne({ _id: senderId }, { $pull: { sentFriendRequest: reciverId } }).exec()
    const pullReciver = PersonalAccount.updateOne({ _id: reciverId }, { $pull: { recivedFriendRequest: senderId } }).exec()
    try {
        const AcceptRequest = await Promise.all([Sender, Reciver.Senders, pullReciver])
        if (!AcceptRequest) {
            const error = new Error('request not Accepted');
            error.status = 403;
            throw error;
        } else {
            const user = await PersonalAccount.findOne({ _id: `${reciverId}` })
            return res.status(200).json({ user })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { AcceptFriendRequest }