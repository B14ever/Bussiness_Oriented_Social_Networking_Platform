//Models
const CompanyAccount = require('../../Models/CompanyAccount')
const PageUsers = async(req, res, next) => {
    try {
        const Pages = await CompanyAccount.find({}, { companyName: 1, logo: 1, _id: 1, City: 1, Country: 1 }).sort({ createdAt: -1 })
        if (!Pages) {
            const error = new Error();
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ Pages })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const PageUser = async(req, res, next) => {
    const { pagesId } = req.params
    const Pages = await CompanyAccount.find({ _id: pagesId }, { Email: 0, createdAt: 0, updatedAt: 0 }).populate("followers", "FirstName LastName _id profilePhoto")
    return res.status(200).json({ Pages })
}
module.exports = { PageUsers, PageUser }