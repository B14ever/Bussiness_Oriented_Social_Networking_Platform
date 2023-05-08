const Users = require('../../Models/Users')
    //MidlWare
const { HashPasword, CompaierPassword } = require('../../MIddleWare/Sharde/Bcrypt')

const ChangePassword = async(req, res, next) => {

    const decodedToken = req.decodedToken
    const userId = decodedToken.id
    const { Password, newPassword } = req.body
    try {
        const check_user = await Users.findOne({ _id: `${userId}` })
        const check_password = await CompaierPassword(Password, check_user.password)
        if (check_password) {
            const new_Password = await HashPasword(newPassword)
            const change_user_password = await Users.updateOne({ _id: `${userId}` }, { $set: { password: `${new_Password}` } })
            if (!change_user_password) {
                const error = new Error('ChangingPasswordFailde')
                error.status = 409
                throw error
            } else {
                return res.status(200).json({ msg: "PasswordChanged" })
            }
        } else {
            const error = new Error('IncorectOldPassword')
            error.status = 403
            throw error
        }
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { ChangePassword }