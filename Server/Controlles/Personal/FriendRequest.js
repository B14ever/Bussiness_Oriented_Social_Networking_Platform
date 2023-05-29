//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const FriendRequest = async(req, res, next) => {
    const { senderId, reciverId } = req.body
    const Sender = PersonalAccount.updateOne({ _id: senderId }, { $push: { sentFriendRequest: reciverId } }).exec()
    const Reciver = PersonalAccount.updateOne({ _id: reciverId }, { $push: { recivedFriendRequest: senderId } }).exec()
    try {
        const newRequest = await Promise.all([Sender, Reciver])
        if (!newRequest) {
            const error = new Error('request not sent');
            error.status = 403;
            throw error;
        } else {
            const user = await PersonalAccount.findOne({ _id: `${senderId}` })
            return res.status(200).json({ user })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { FriendRequest }