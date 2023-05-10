//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const AddEducation = async(req, res) => {
    const { institution, fildeOfStudy, startedDate, endDate, Grade } = req.body.data
    const Education = { institution, fildeOfStudy, startedDate, endDate, Grade }
    const Email = req.body.Email
    try {
        const addNewEducation = await PersonalAccount.updateOne({ Email: Email }, { $push: { education: Education } }).exec();
        if (!addNewEducation) {
            console.log('in here')
            const error = new Error('EducatioinNotAdd');
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
module.exports = { AddEducation }