//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const EditExprience = async(req, res) => {
    const userExprience = req.body.userExprience
    const Email = req.body.Email
    try {
        const EditExprience = await PersonalAccount.updateOne({ Email: Email }, { $set: { exprience: userExprience } }).exec();
        if (!EditExprience) {
            const error = new Error('ExprienceNotEdited');
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
module.exports = { EditExprience }