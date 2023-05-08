//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const UpdateProfile = async(req, res) => {
    const { FirstName, LastName, Country, City, PhoneNumber, Email } = req.body
    try {
        const updateUser = await PersonalAccount.updateOne({ Email: `${Email}` }, { $set: { FirstName, LastName, Country, City, PhoneNumber } })
        if (!updateUser) {
            const error = new Error('Update failde try again');
            error.status = 409; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const user = await PersonalAccount.findOne({ Email: `${Email}` })
            res.status(200).json({ user })
        }
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { UpdateProfile }