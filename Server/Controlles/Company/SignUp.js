//Models
const CompanyAccount = require('../../Models/CompanyAccount')
const Users = require('../../Models/Users')
    //middleWare
const { SendEmail } = require('../../MIddleWare/Sharde/SendEmail')
const { OTPGenerator } = require('../../MIddleWare/Sharde/OtpGenerator')
const { HashPasword } = require('../../MIddleWare/Sharde/Bcrypt')
const { createToken } = require('../../MIddleWare/Sharde/CreateToken')
const SignUP = async(req, res, next) => {
    const { companyName, organizationSize, organizationType, industry, tagline, Email, PhoneNumber, Country, City, Password } = req.body
    const OTP = OTPGenerator()
    const password = await HashPasword(Password)
    const newUsers = { Email, password, role: 'company', otp: OTP }
    const newCompanyAccount = { companyName, Country, City, Email, PhoneNumber, organizationSize, organizationType, industry, tagline }
    try {
        const user = await Users.findOne({ Email: `${Email}` })
        if (user) {
            const error = new Error('User already exists');
            error.status = 409; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const newUser = await Promise.all([CompanyAccount.create(newCompanyAccount), Users.create(newUsers)])
            if (!newUser) {
                throw new Error('User Not Created')
            } else {
                const id = newUser[1]._id
                const ID = id.toString()
                const token = createToken(ID, newUser[1].role)
                SendEmail(req, res, next, OTP.code, Email, token)
            }
        }
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { SignUP }