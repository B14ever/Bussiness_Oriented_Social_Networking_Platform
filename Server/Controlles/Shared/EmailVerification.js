//Models
const Users = require('../../Models/Users')
const Admin = require('../../Models/Admin')
const Personal = require('../../Models/PersonalAccount')
const Company = require('../../Models/CompanyAccount')
const EmailVerification = async(req, res, next) => {
    const { Code } = req.body
    const decodedToken = req.decodedToken;
    const userId = decodedToken.id;
    try {
        const getUser = await Users.findOne({ _id: `${userId}` }, { otp: 1 })
        if (!getUser) {
            throw new Error('You have not signed up yet');
        } else {
            const currentTime = new Date().getTime();
            if (currentTime > getUser.otp.ValidUntil + 10) {
                throw new Error('Code has expired. Please request a new code');
            } else {
                if (getUser.otp.attempts < 3) {
                    if (parseInt(Code) === getUser.otp.code) {
                        const verifiyUser = await Users.updateOne({ _id: `${userId}` }, { $set: { isVerified: true } })
                        if (!verifiyUser) {
                            throw new Error('user verification failde , try again')
                        } else {
                            const USER = await Users.findOne({ _id: `${userId}` })
                            if (USER.role === 'personal') {
                                const user = await Personal.findOne(({ Email: `${USER.Email}` }))
                                res.status(200).json({ user })
                            }
                            if (USER.role === 'company') {
                                const user = await Company.findOne(({ Email: `${USER.Email}` }))
                                res.status(200).json({ user })
                            }
                            if (USER.role === 'admin') {
                                const user = await Admin.findOne(({ Email: `${USER.Email}` }))
                                res.status(200).json({ user })
                            }
                        }
                    } else {
                        const result = await Users.updateOne({ _id: `${userId}` }, { $inc: { 'otp.attempts': 1 } });
                        if (result.modifiedCount === 0) {
                            throw new Error('User not found.');
                        } else {
                            throw new Error('Invalid OTP. Please try again.');
                        }
                    }
                } else {
                    throw new Error('You have exceeded the maximum number of attempts. Please request a new code.');
                }
            }
        }
    } catch (err) {
        res.status(400).json({ err: err.message })
    }

}
module.exports = { EmailVerification }