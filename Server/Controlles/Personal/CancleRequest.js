//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const CancleFriendRequest = async(req, res, next) => {
    const { senderId, reciverId } = req.body
    const Sender = PersonalAccount.updateOne({ _id: senderId }, { $pull: { sentFriendRequest: reciverId } }).exec()
    const Reciver = PersonalAccount.updateOne({ _id: reciverId }, { $pull: { recivedFriendRequest: senderId } }).exec()
    try {
        const cancleRequest = await Promise.all([Sender, Reciver])
        if (!cancleRequest) {
            const error = new Error('request not cancled');
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
module.exports = { CancleFriendRequest }