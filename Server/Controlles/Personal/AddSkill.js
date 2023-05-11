//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const AddSkill = async(req, res) => {
    const { skillName } = req.body.data
    const Email = req.body.Email
    try {
        const addNewSkill = await PersonalAccount.updateOne({ Email: Email }, { $push: { skill: { skillName } } }).exec();
        if (!addNewSkill) {
            const error = new Error('SkillNotAdd');
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
module.exports = { AddSkill }