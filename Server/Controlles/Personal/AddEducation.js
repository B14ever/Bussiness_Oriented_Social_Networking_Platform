//Models
const PersonalAccount = require('../../Models/PersonalAccount')
const AddEducation = async(req, res) => {
    const { institution, fildeOfStudy, startedDate, endDate, Grade } = req.body.data
    const Email = req.body.Email
}
module.exports = { AddEducation }