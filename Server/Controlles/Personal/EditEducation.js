//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const EditEducation = async(req, res) => {
    const userEducation = req.body.userEducation
    const Email = req.body.Email
    try {
        const EditEducation = await PersonalAccount.updateOne({ Email: Email }, { $set: { education: userEducation } }).exec();
        if (!EditEducation) {
            const error = new Error('EducatinNotAdd');
            error.status = 403; // set the status code to 409 (Conflict)
            throw error;
        } else {
            const user = await PersonalAccount.findOne({ Email: `${Email}` })
            return res.status(200).json({ user })
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { EditEducation }