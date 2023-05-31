//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const UserInfo = async(req, res, next) => {
    const { id } = req.body
    try {
        const PersonalAccounts = await PersonalAccount.find({ _id: id }, {
            sentFriendRequest: 1,
            recivedFriendRequest: 1,
            friends: 1
        })
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
module.exports = { UserInfo }