//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const Invitation = async(req, res, next) => {
    const { id } = req.body
    const PersonalAccounts = await PersonalAccount.find({ _id: id })
    const request = PersonalAccounts[0].recivedFriendRequest // arrays of users id
    try {
        const invitation = await PersonalAccount.find({ _id: { $in: request }, }, { createdAt: 0, updatedAt: 0, PhoneNumber: 0, Email: 0, recivedFriendReques: 0, sentFriendRequest: 0 })
        if (!invitation) {
            const error = new Error();
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ invitation })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { Invitation }