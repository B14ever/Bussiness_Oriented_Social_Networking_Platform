//Models
const AdminAccount = require('../../Models/Admin')
const Users = require('../../Models/Users')
    //middleWare
const { SendEmail } = require('../../MIddleWare/Sharde/SendEmail')
const { OTPGenerator } = require('../../MIddleWare/Sharde/OtpGenerator')
const { HashPasword } = require('../../MIddleWare/Sharde/Bcrypt')
const AddAdmin = async(req, res, next) => {
    const { FirstName, LastName, Email, Password } = req.body
    const OTP = OTPGenerator()
    const password = await HashPasword(Password)
    const newUsers = { Email, password, role: 'admin', otp: OTP }
    const newAdminAccount = { FirstName, LastName, Email, }
    try {
        const user = await Users.findOne({ Email: `${Email}` })
        if (user) {
            throw new Error('User already Exists')
        } else {
            const newUser = await Promise.all([AdminAccount.create(newAdminAccount), Users.create(newUsers)])
            if (!newUser) {
                throw new Error('User Not Created')
            } else {
                const sendEmail = SendEmail(req, res, next, OTP.code)
                if (sendEmail) {
                    return res.status(200).json({ message: 'Account Created' })
                } else {
                    throw new Error('Sending Email Failed')
                }
            }
        }
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
module.exports = { AddAdmin }