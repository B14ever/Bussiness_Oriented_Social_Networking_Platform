//Models
const CompanyAccount = require('../../Models/CompanyAccount')
const PersonalAccount = require('../../Models/PersonalAccount')
const Followers = async(req, res, next) => {
    const { pageId } = req.body
    try {
        const followees = CompanyAccount.find({ _id: pageId }, { followers: 1 })
            .populate('followers', 'FirstName LastName profilePhoto _id')
        if (!followees) {
            const error = new Error('Error try again');
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ followees })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const Follower = async(req, res, next) => {
    const { userId, pageId } = req.params
    try {
        const followees = CompanyAccount.find({
                $and: [
                    { _id: pageId },
                    {
                        "followers": {
                            $elemMatch: {
                                $and: [
                                    { "value": userId },
                                ]
                            }
                        }
                    }
                ]
            })
            .populate('followers', 'FirstName LastName profilePhoto _id')
        if (!followees) {
            const error = new Error('Error try again');
            error.status = 403;
            throw error;
        } else {
            return res.status(200).json({ followees })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
const DeleteFollower = async(req, res, next) => {
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
            const user = await CompanyAccount.findOne({ _id: `${pageId}` })
            return res.status(200).json({ user })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { Follower, Followers, DeleteFollower }