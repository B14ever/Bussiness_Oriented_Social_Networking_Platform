//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const PersonalAccountsDetail = async(req, res, next) => {
    const { id } = req.params
    try {
        const PersonalAccounts = await PersonalAccount.find({ _id: id }, { createdAt: 0, updatedAt: 0, PhoneNumber: 0, Email: 0, })
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
module.exports = { PersonalAccountsDetail }