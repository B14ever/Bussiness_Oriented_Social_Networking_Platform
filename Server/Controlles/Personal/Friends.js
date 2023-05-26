//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const GetPersonalAccounts = async(req, res, next) => {
    const { id } = req.body
    try {
        const PersonalAccounts = await PersonalAccount.find({ _id: { $ne: id, }, $and: [{ recivedFriendRequest: { $nin: [id] } }, { sentFriendRequest: { $nin: [id] } }, { friends: { $nin: [id] } }] }, { createdAt: 0, updatedAt: 0, PhoneNumber: 0, exprience: 0, education: 0, skill: 0 })
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
module.exports = { GetPersonalAccounts }