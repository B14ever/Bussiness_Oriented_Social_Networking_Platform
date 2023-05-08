//Models
const Users = require('../../Models/Users')
const Personal = require('../../Models/PersonalAccount')
const Company = require('../../Models/CompanyAccount')
const Admin = require('../../Models/Admin')
    //MiddleWare
const { CompaierPassword } = require('../../MIddleWare/Sharde/Bcrypt')
const DeleteAccount = async(req, res, next) => {
    const decodedToken = req.decodedToken
    const { id, role } = decodedToken
    const { Password } = req.body
    try {
        const check_user = await Users.findOne({ _id: `${id}` })
        const check_password = await CompaierPassword(Password, check_user.password)
        if (check_password) {
            if (role === 'personal') {
                const DeleteAccount = await Promise.all([Personal.deleteOne({ Email: `${check_user.Email}` }), Users.deleteOne({ _id: `${id}` })])
                if (!DeleteAccount) {
                    const error = new Error('AccontDeltionFaile');
                    error.status = 403; // set the status code to 409 (Conflict)
                    throw error;
                } else {
                    res.status(200).json({ msg: 'AccountDeleted' })
                }
            }
            if (role === 'company') {
                const DeleteAccount = await Promise.all([Company.deleteOne({ Email: `${check_user.Email}` }), Users.deleteOne({ _id: `${id}` })])
                if (!DeleteAccount) {
                    const error = new Error('AccontDeltionFaile');
                    error.status = 403; // set the status code to 409 (Conflict)
                    throw error;
                } else {
                    res.status(200).json({ msg: 'AccountDeleted' })
                }
            }
            if (role === 'admin') {
                const DeleteAccount = await Promise.all([Admin.deleteOne({ Email: `${check_user.Email}` }), Users.deleteOne({ _id: `${id}` })])
                if (!DeleteAccount) {
                    const error = new Error('AccontDeltionFailed');
                    error.status = 404; // set the status code to 409 (Conflict)
                    throw error;
                } else {
                    return res.status(200).json({ msg: 'AccountDeleted' })
                }
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
module.exports = { DeleteAccount }