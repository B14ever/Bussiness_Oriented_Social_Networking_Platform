//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const AddExprience = async(req, res) => {
    const { title, employmentType, companyName, startedDate, endDate } = req.body.data
    const Exprience = { title, employmentType, companyName, startedDate, endDate }
    const Email = req.body.Email
    try {
        const addNewExprience = await PersonalAccount.updateOne({ Email: Email }, { $push: { exprience: Exprience } }).exec();
        if (!addNewExprience) {
            const error = new Error('ExprienceinNotAdd');
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
module.exports = { AddExprience }