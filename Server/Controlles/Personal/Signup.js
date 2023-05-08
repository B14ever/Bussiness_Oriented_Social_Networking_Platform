//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const Users = require('../../Models/Users')
    //middleWare
const { SendEmail } = require('../../MIddleWare/Sharde/SendEmail')
const { OTPGenerator } = require('../../MIddleWare/Sharde/OtpGenerator')
const { HashPasword } = require('../../MIddleWare/Sharde/Bcrypt')
const { createToken } = require('../../MIddleWare/Sharde/CreateToken')
const SignUP = async(req, res, next) => {
    const { FirstName, LastName, Country, City, Email, PhoneNumber, Password } = req.body
    const OTP = OTPGenerator()
    const password = await HashPasword(Password)
    const newUsers = { Email, password, role: 'personal', otp: OTP }
    const newPersonalAccount = { FirstName, LastName, Country, City, Email, PhoneNumber }
    try {
        const user = await Users.findOne({ Email: `${Email}` });
        if (user) {
            const error = new Error('User already exists');
            error.status = 409; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const newUser = await Promise.all([PersonalAccount.create(newPersonalAccount), Users.create(newUsers)])
            if (!newUser) {
                const error = new Error('User Not Created try again');
                error.status = 403; // set the status code to 409 (Conflict)
                throw error;
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