//Models
const CompanyAccount = require('../../Models/CompanyAccount')
const PersonalAccount = require('../../Models/PersonalAccount')
const Getpages = async(req, res, next) => {
    const { id } = req.body
    const PersonalAccounts = await PersonalAccount.find({ _id: id })
    const pages = PersonalAccounts[0].pages
    try {
        const Pages = await CompanyAccount.find({ _id: { $nin: pages } }, { companyName: 1, logo: 1, _id: 1, City: 1, Country: 1 }).sort({ createdAt: -1 })
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
const Getpage = async(req, res, next) => {
    const { pagesId } = req.params
    const Pages = await CompanyAccount.find({ _id: pagesId }, { Email: 0, createdAt: 0, updatedAt: 0 })
    return res.status(200).json({ Pages })
}
const Follow = async(req, res, next) => {
    const { userId, pageId } = req.body
    const personalAccount = PersonalAccount.updateOne({ _id: userId }, { $push: { pages: pageId } }).exec()
    const companyAccount = CompanyAccount.updateOne({ _id: pageId }, { $push: { followers: userId } }).exec()
    try {
        const newRequest = await Promise.all([personalAccount, companyAccount])
        if (!newRequest) {
            const error = new Error('Error try again');
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
const UnFollow = async(req, res, next) => {
    const { userId, pageId } = req.body
    const personalAccount = PersonalAccount.updateOne({ _id: userId }, { $pull: { pages: pageId } }).exec()
    const companyAccount = CompanyAccount.updateOne({ _id: pageId }, { $pull: { followers: userId } }).exec()
    try {
        const newRequest = await Promise.all([personalAccount, companyAccount])
        if (!newRequest) {
            const error = new Error('Error try again');
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
module.exports = { Getpages, Getpage, Follow, UnFollow }