//Models
const CompanyAccount = require('../../Models/CompanyAccount')
const nottification = async(req, res, next) => {
    const { id } = req.params
    try {
        const notification = await CompanyAccount.find({ _id: id }, { nottification: 1, })
        if (!notification) {
            const error = new Error();
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ notification })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { nottification }