//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const AddBadge = async(req, res) => {
    const { skillName, Email } = req.body
    try {
        const find_user = await PersonalAccount.find({ Email: Email })
        const check_skill = find_user[0].skill.some(obj => obj.skillName === skillName)
        if (check_skill) {
            const addBadge = await PersonalAccount.updateOne({ Email: Email }, { $set: { 'skill.$[elemX].badge': true } }, { arrayFilters: [{ 'elemX.skillName': skillName }] })
            if (!addBadge) {
                const error = new Error('BadgeNotAdd');
                error.status = 403;
                throw error;
            } else {

                const user = await PersonalAccount.findOne({ Email: `${Email}` })
                return res.status(200).json({ user })
            }
        } else {
            const addBadge = await PersonalAccount.updateOne({ Email: Email }, { $push: { skill: { skillName: skillName, badge: true } } }).exec();
            if (!addBadge) {
                const error = new Error('SkillNotAdd');
                error.status = 403; // set the status code to 409 (Conflict)
                throw error;
            } else {
                const user = await PersonalAccount.findOne({ Email: `${Email}` })
                return res.status(200).json({ user })
            }
        }

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}
module.exports = { AddBadge }