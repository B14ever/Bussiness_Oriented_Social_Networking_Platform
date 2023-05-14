//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const DeleteSkill = async(req, res) => {
    const skills = req.body.userSkill
    const Email = req.body.Email
    try {
        const DeleteSkill = await PersonalAccount.updateOne({ Email: Email }, { $set: { skill: skills } }).exec();
        if (!DeleteSkill) {
            const error = new Error('SkillNoDeleted');
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
module.exports = { DeleteSkill }