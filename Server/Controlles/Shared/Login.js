//Models
const Users = require('../../Models/Users')
const Admin = require('../../Models/Admin')
const Personal = require('../../Models/PersonalAccount')
const Company = require('../../Models/CompanyAccount')
    //Midleware
const { CompaierPassword } = require('../../MIddleWare/Sharde/Bcrypt')
const { createToken } = require('../../MIddleWare/Sharde/CreateToken')
const Login = async(req, res, next) => {
    const { Email, Password } = req.body
    try {
        const check_user = await Users.findOne({ Email: `${Email}` })
        if (!check_user) {
            const error = new Error('Invalid Email or Password');
            error.status = 409; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const check_password = await CompaierPassword(Password, check_user.password)
            if (check_password) {
                const id = check_user._id
                const userId = id.toString()
                const token = createToken(userId, check_user.role)
                res.cookie('token', token, { httpOnly: true });
                if (check_user.role === 'personal') {
                    const user = await Personal.findOne({ Email: `${Email}` })
                    res.status(200).json({ token, user })
                }
                if (check_user.role === 'company') {
                    const user = await Company.findOne(({ Email: `${Email}` }))
                    res.status(200).json({ token, user })
                }
                if (check_user.role === 'admin') {
                    const user = await Admin.findOne(({ Email: `${Email}` }))
                    res.status(200).json({ token, user })
                }
            } else {
                const error = new Error('Invalid Email or Password');
                error.status = 409; // set the status code to 409 (Conflict)
                throw error;
            }
        }
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { Login }